import { useReducer } from 'react';
import "../App.css"
import DigitButton from '../components/DigitButton';
import OperationButton from '../components/OperationButton';
import { reducer, ACTIONS } from '../Functions';

function GeneralMode(props) {
  const [{ expressionString, resultValue, expressionClass, resultClass }, dispatch] = useReducer(reducer, {});
  const { currentMode, modeName } = props;

  if (currentMode !== modeName) return null;
  
  return (
    <div className='calculator-container'>
        <div className='output'>
            <div className={ `active-expression ${expressionClass}` }>{expressionString || '0'}</div>
            <div className={ `result ${resultClass}` }>= {resultValue || '0'}</div>
        </div>
        <div className='calculator-grid'>
          <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
          <button onClick={() => dispatch({ type: ACTIONS.PERCENT })}>%</button>
          <OperationButton operation="÷" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton operation="*" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton operation="+" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton operation="-" dispatch={dispatch} />      
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button className='span-two' onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
        </div>
    </div>
  )
}

export default GeneralMode;