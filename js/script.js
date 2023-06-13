class Calculator {
    operatorsArr = ['+', '-', '*', '/', '^'];

    constructor() {
        this.string = '0';
        this.expression = [0];
        this.result = 0;
        this.toClear = false;
        this.memory = 0;

        this.buttonM = document.getElementById('btnM');
        this.buttonMR = document.getElementById('btnMR');

        this.menuOpen = false;

        $("#result_area").text('0');
        $("#expression_string").text('');
    }

    appendNumber(number) {
        if (this.toClear) {
            this.clear(); //очищение после предыдущего результата и вводом нового выражения
            this.expression = [];
        }
        this.toClear = false;
        console.log(this.expression);

        if (this.expression.length == 1 && (this.expression[0] == '0')) this.expression.pop();

        if (this.expression.length > 0 && !this.operatorsArr.includes(this.expression[this.expression.length - 1])) {
            number = this.expression[this.expression.length - 1].toString() + number.toString();
            this.expression.pop();
        }

        this.expression.push(number.toString());

        this.expressionToString()
    }

    appendOperation(operator) {
        this.toClear = false;
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) { //если оператор уже введен
            this.expression.pop();
            this.string = this.string.substring(0, this.string.length - 2);
        }

        this.expression.push(operator);
        this.expressionToString()
    }

    appendPoint() {
        if (this.toClear) this.clear(); //очищение после предыдущего результата и вводом нового выражения
        this.toClear = false;
        
        if (this.expression.length == 0) this.expression.push(this.result.toString())
        if (this.expression[this.expression.length - 1].toString().includes('.')) return;

        let number = '';
        if (this.expression.length > 0 && !this.operatorsArr.includes(this.expression[this.expression.length - 1])) {
            number = this.expression[this.expression.length - 1].toString() + '.';
            this.expression.pop();
        }

        $("#result_area").text(this.string);
        //document.getElementById("result_area").innerText = this.string;
        this.expression.push(number.toString());
        this.expressionToString();
    }

    appendPercent() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        let num = this.expression[this.expression.length - 1];
        let res = num / 100;

        this.expression.pop();
        this.expression.push(res);
        this.expressionToString();

        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
        //document.getElementById("result_div").scrollTop = document.getElementById("result_div").scrollHeight;
    }

    appendSign() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;
        
        if (this.expression.length == 1) {
            if (this.expression[0] == 0) return;
            let num = parseFloat(this.expression[0]);
            if (num < 0) {
                num *= -1;
                this.expression[0] = num.toString();
            }
            else {
                let temp = this.expression[0];
                this.expression.pop();
                this.expression.push('0');
                this.expression.push('-')
                this.expression.push(temp.toString());
            }
        }
        else if (this.expression[this.expression.length - 2] == '-') {
            this.expression[this.expression.length - 2] = '+'
        }
        else if (this.expression[this.expression.length - 2] == '+') {
            this.expression[this.expression.length - 2] = '-'
        }
        else {
            let num = parseFloat(this.expression[this.expression.length - 1]);
            num *= -1;
            this.expression[this.expression.length - 1] = num.toString();
        }

        this.expressionToString();
    }

    appendEqual() {
        console.log(this.expression);
        
        if (this.expression.length < 3) return; //проверка выражения на одно число

        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;
        
        if (this.expression[this.expression.length - 2] == '/') //деление на ноль
            if (this.expression[this.expression.length - 1] == 0) {
                return;
            }

        $("#expression_string").text(this.string + "=");
        this.updateResult();
        $("#result_area").text(this.result);

        if ($("#expression_string").text().length > 13) $("#expression_string").css("font-size", '80%')
        else $("#expression_string").css("font-size", '100%')

        this.toClear = true;

        if ($("#result_area").text().length > 13) {
            $("#result_area").css("font-size", '20px')
        }
        else $("#result_area").css("font-size", '30px')

        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
    }

    appendDelete() {
        console.log(this.expression);
        if (this.expression.length == 1) {
            if (this.expression[0] == '0') return;
            else if (this.expression[0].length == 1) {
                this.expression[0] = '0';
                this.expressionToString();
                return;
            }
        }

        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) {
            this.expression.pop();
        }
        else {
            let lastNum = this.expression[this.expression.length - 1];
            let newNum = lastNum.toString().substring(0, lastNum.length - 1);

            this.expression.pop();
            if (newNum != '') this.expression.push(newNum.toString());
        }

        this.expressionToString();
    }

    clear() {
        $("#result_area").text('0');

        if (this.string == "0") $("#expression_string").text(''); //очищение истории
        else if (this.result != 0) $("#expression_string").text($("#expression_string").text() + ' ' + this.result);
        
        $("#result_area").css("font-size", '30px');
        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
         
        this.result = 0;
        this.string = "0";
        this.numberStr = "0"
        this.expression = [];
        this.expression.push('0');

        $(".hex-convert_result").text('');
        $(".dec-convert_result").text('');
        $(".bin-convert_result").text('');
    }

    updateResult() {
        if (!(this.expression.includes('+') || this.expression.includes('-')
            || this.expression.includes('*') || this.expression.includes('/')
            || this.expression.includes('^'))) return;
        
        let array = this.expression;
        let tempRes = parseFloat(array[0]);

        console.log(this.expression);

        while (this.expression.length != 1) {
            let indDiv = this.expression.indexOf("/");
            let indMult = this.expression.indexOf("*");

            if (this.expression.indexOf("^") != -1) {
                this.calculate("^");
                console.log(this.expression);
            }

            if ((indDiv < indMult && indDiv != -1) || (indDiv != -1 && indMult == -1)) {
                this.calculate("/");
                console.log(this.expression);
                continue;
            }

            if ((indMult < indDiv && indMult != -1) || (indMult != -1 && indDiv == -1)) {
                this.calculate("*");
                console.log(this.expression);
                continue;
            }

            let indPlus = this.expression.indexOf("+");
            let indMin = this.expression.indexOf("-");

            if ((indPlus < indMin && indPlus != -1) || (indPlus != -1 && indMin == -1)) {
                this.calculate("+");
                console.log(this.expression);
                continue;
            }

            if ((indMin < indPlus && indMin != -1) || (indMin != -1 && indPlus == -1)) {
                this.calculate("-");
                console.log(this.expression);
                continue;
            }
        }

        tempRes = this.expression[0];

        this.result = tempRes;
        this.string = tempRes.toString();
        this.expression = [];
        this.numberStr = "";
        this.expression.push(tempRes.toString());
    }

    calculate(operator) {

        let startInd = this.expression.indexOf(operator) - 1;
        let endInd = this.expression.indexOf(operator) + 1;
        let res;
        
        switch (operator) {
            case ("+"): 
                res = parseFloat(this.expression[startInd]) + parseFloat(this.expression[endInd]);
                break;
            case ("-"): 
                res = parseFloat(this.expression[startInd]) - parseFloat(this.expression[endInd]);
                break;
            case ("*"): 
                res = parseFloat(this.expression[startInd]) * parseFloat(this.expression[endInd]);
                break;
            case ("/"): 
                res = parseFloat(this.expression[startInd]) / parseFloat(this.expression[endInd]);
                break;
            case ("^"):
                res = parseFloat(this.expression[startInd]) ** parseFloat(this.expression[endInd]);
                break;
        }
        this.expression.splice(startInd, endInd - startInd + 1, res);
    }

    expressionToString() {
        this.string = '';
        for (let i = 0; i < this.expression.length; i++) {
            const element = this.expression[i].toString();
            this.string += element;
        }
        $("#result_area").text(this.string);

        if (this.string.length > 13) $("#result_area").css("font-size", '20px');
        else $("#result_area").css("font-size", '30px');
        
        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
    }

    showMessage(message) {
        $("#result_area").text(message);
    }

    //////////////CREATIVE

    factorial() {
        if (this.expression[this.expression.length - 1] < 0
            || this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;
        
        let res = 1;
        let num = parseFloat(this.expression[this.expression.length - 1]);

        if (Math.floor(num) - num != 0) {
            showMessage("Number must be integer!");
            return;
        }

        for (let i = 1; i <= num; i++) {
            res *= i;
        }
        
        this.expression.pop();
        this.expression.push(res.toString());

        this.expressionToString();
    }


    squareRoot() {
        if (this.expression[this.expression.length - 1] <= 0
            || this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        let res = Math.sqrt(this.expression[this.expression.length - 1]);

        this.expression.pop();
        this.expression.push(res.toString());
        
        this.expressionToString();
    }

    exponentiation() {
        this.expression.push("^");
        this.expressionToString();
        this.toClear = false;
    }

    exponentiation2() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        let res = this.expression[this.expression.length - 1] ** 2;
        this.expression.pop();
        this.expression.push(res.toString());
        this.expressionToString();
        this.toClear = false;
    }

    lg() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        if (this.expression[this.expression.length - 1] <= 0) {
            showMessage("Number must be positive!");
            return;
        }

        let res = Math.log10(this.expression[this.expression.length - 1]);

        this.expression.pop();
        this.expression.push(res.toString());
        
        this.expressionToString();
    }

    ln() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        if (this.expression[this.expression.length - 1] <= 0) {
            showMessage("Number must be positive!");
            return;
        }

        let res = Math.log(this.expression[this.expression.length - 1]);

        this.expression.pop();
        this.expression.push(res.toString());
        
        this.expressionToString();
    }

    ///////MEMORY   
    
    plusM() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        this.buttonM.disabled = false;
        this.buttonMR.disabled = false;

        this.memory += parseFloat(this.expression[this.expression.length - 1]);
        $("#memory_area").text(this.memory);

        if (this.memory.toString().length > 13) $("#memory_area").css("font-size", '20px');
        else $("#memory_area").css("font-size", '25px');
    }

    minusM() {
        if (this.operatorsArr.includes(this.expression[this.expression.length - 1])) return;

        this.buttonM.disabled = false;
        this.buttonMR.disabled = false;

        this.memory -= parseFloat(this.expression[this.expression.length - 1]);
        $("#memory_area").text(this.memory);

        if (this.memory.toString().length > 13) $("#memory_area").css("font-size", '20px');
        else $("#memory_area").css("font-size", '25px');
    }

    MC() {
        this.memory = 0;
        $("#memory_area").text(this.memory);
        $("#memory_area").css("font-size", '25px');
    }

    MR() {
        if (this.memory == '0') return;

        let memoryVal = this.memory;

        if (!this.operatorsArr.includes(this.expression[this.expression.length - 1])) this.expression.pop();
        
        if (parseFloat(memoryVal) < 0) {
            if (this.expression.length == 0) this.expression.push('0');
            this.expression.push('-');
            memoryVal *= -1;
        }

        this.expression.push(memoryVal);
        this.expressionToString();
    }

}

let calculator = new Calculator();
