export const OPERATORS_ARRAY = ['+', '-', '*', '÷', '^'];

export const ALL_MEASURES = {
  milimeters: 'milimeters',
  santimeters: 'santimeters',
  meters: 'meters',
  kilometers: 'kilometers',
  milligrams: 'milligrams',
  grams: 'grams',
  kilograms: 'kilograms',
  squareMilimeters: 'squareMilimeters',
  squareSantimeters: 'squareSantimeters',
  squareMeters: 'squareMeters',
  squareKilometers: 'squareKilometers',
}

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPEARATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
  PERCENT: 'percent'
}

const CLASSES_STATE = {
  ACTIVE_RESULT: 'active-result',
  ACTIVE_EXPRESSION: 'active-expression',
  RESULT: 'result',
  EXPRESSION: 'expression'
}  

export function reducer(state, { type, payload }) {
    switch (type) {
  
      case ACTIONS.ADD_DIGIT:
        if (state.resultClass == CLASSES_STATE.ACTIVE_RESULT) {
          state.resultClass = CLASSES_STATE.RESULT;
          state.expressionClass = CLASSES_STATE.ACTIVE_EXPRESSION;
          state.expressionString = '';
          state.currentOperand = null;
        }
        if (payload.digit === "0" && state.expressionString === "0") {
          return state;
        }
        if (payload.digit === "." && state.currentOperand == null) {
            payload.digit = '0.'
        }
        if (payload.digit === "." && state.currentOperand.toString().includes(".")) {
          return state;
        } 
        state.expressionString = `${state.expressionString || ""}${payload.digit}`;
        return {
          ...state,
          currentOperand: `${state.currentOperand || ""}${payload.digit}`,
          resultValue: evaluate(state)
        }
  
      case ACTIONS.CHOOSE_OPEARATION:
        if (state.resultClass == CLASSES_STATE.ACTIVE_RESULT) {
          state.resultClass = CLASSES_STATE.RESULT;
          state.expressionClass = CLASSES_STATE.ACTIVE_EXPRESSION;
          state.expressionString = state.resultValue.toString();
          state.currentOperand = state.resultValue.toString();
        }
        if (state.expressionString == null) {
          return {
            ...state,
            expressionString: `0 ${payload.operation} `,
            resultValue: '0',
            currentOperand: '0'
          }
        }
        if (state.currentOperand == null) {
          return {
            ...state,
            expressionString: `${state.expressionString.substring(0, state.expressionString.length - 3)} ${payload.operation} `,
          }
        }
        return {
          ...state,
          currentOperand: null,
          expressionString: `${state.expressionString} ${payload.operation} `,
          resultValue: evaluate(state)
        }
  
      case ACTIONS.DELETE_DIGIT:
        if (state.expressionString == null || state.resultClass == CLASSES_STATE.ACTIVE_RESULT) {
          return state;
        }
        let countDel = 1;
        if (state.expressionString[state.expressionString.length - 1] == ' ') countDel = 2;
        state.expressionString = state.expressionString.substring(0, state.expressionString.length - countDel);
        if (state.expressionString == ''){
          return {
            ...state,
            expressionString: null,
            resultValue: '0'
          }
        }
        return {
          ...state,
          resultValue: evaluate(state)
        }
      
      case ACTIONS.PERCENT:
        if (state.currentOperand == null) {
          return {
            ...state
          }
        }
        console.log(state.expressionString);
        if (state.resultClass != CLASSES_STATE.ACTIVE_RESULT) {
          state.currentOperand /= 100;
          if (!state.expressionString.toString().includes(' ')) {
            state.expressionString = state.currentOperand;
          }
          else {
            while (!OPERATORS_ARRAY.includes(state.expressionString[state.expressionString.length - 2])) {
              state.expressionString = `${state.expressionString.substring(0, state.expressionString.length - 1)}`;
            } 
            state.expressionString = `${state.expressionString} ${state.currentOperand}`;
            state.resultValue /= 100;
          }
          return {
            expressionString: `${state.expressionString}`,
            currentOperand: state.currentOperand,
            resultValue: evaluate(state),
            expressionClass: CLASSES_STATE.ACTIVE_EXPRESSION,
            resultClass: CLASSES_STATE.RESULT
          };
        }
        else {
          return {
            ...state,
            resultValue: state.resultValue / 100
          }
        }
          
  
      case ACTIONS.EVALUATE:
        return {
          expressionString: `${state.expressionString}`,
          resultValue: evaluate(state),
          currentOperand: state.resultValue,
          expressionClass: CLASSES_STATE.EXPRESSION,
          resultClass: CLASSES_STATE.ACTIVE_RESULT
        }
  
      case ACTIONS.CLEAR:
        return {};
    }
}
  
export function evaluate({ expressionString }) {
    if (expressionString == null) return;

    if (OPERATORS_ARRAY.includes(expressionString[expressionString.length - 2])) {
        expressionString = expressionString.substring(0, expressionString.length - 2).split()
    }

    let expressionArray = expressionString.toString().split(' ').filter(item => item != '');
    console.log(expressionArray)

    while (expressionArray.length != 1) {
        let indDiv = expressionArray.indexOf("÷");
        let indMult = expressionArray.indexOf("*");

        if (expressionArray.indexOf("^") != -1) {
        expressionArray = calculate("^", expressionArray);
        }

        if ((indDiv < indMult && indDiv != -1) || (indDiv != -1 && indMult == -1)) {
        expressionArray = calculate("÷", expressionArray);
        continue;
        }

        if ((indMult < indDiv && indMult != -1) || (indMult != -1 && indDiv == -1)) {
        expressionArray = calculate("*", expressionArray);
        continue;
        }

        let indPlus = expressionArray.indexOf("+");
        let indMin = expressionArray.indexOf("-");

        if ((indPlus < indMin && indPlus != -1) || (indPlus != -1 && indMin == -1)) {
        expressionArray = calculate("+", expressionArray);
        continue;
        }

        if ((indMin < indPlus && indMin != -1) || (indMin != -1 && indPlus == -1)) {
        expressionArray = calculate("-", expressionArray);
        continue;
        }
    }

    let result = expressionArray[0];
    return result;
}
  
function calculate(operator, expression) {
  
    let startInd = expression.indexOf(operator) - 1;
    let endInd = expression.indexOf(operator) + 1;
    let res;
  
    switch (operator) {
        case ("+"): 
            res = parseFloat(expression[startInd]) + parseFloat(expression[endInd]);
            break;
        case ("-"): 
            res = parseFloat(expression[startInd]) - parseFloat(expression[endInd]);
            break;
        case ("*"): 
            res = parseFloat(expression[startInd]) * parseFloat(expression[endInd]);
            break;
        case ("÷"): 
            res = parseFloat(expression[startInd]) / parseFloat(expression[endInd]);
            break;
        case ("^"):
            res = parseFloat(expression[startInd]) ** parseFloat(expression[endInd]);
            break;
    }
    expression.splice(startInd, endInd - startInd + 1, res);
    return expression;
}
  
export function findKeyByValue(object, value) {
  for (let key in object) {
    if (object[key] === value) {
      return key;
    }
  }
  
  return null;
}