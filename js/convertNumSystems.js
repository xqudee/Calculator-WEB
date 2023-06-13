class Calculator {

    constructor() {
        this.number = '';
        this.result = 0;

        $("#result_area").text('0');
        $("#expression_string").text('');
    }

    appendNumber(number) {
        this.number += number.toString();
        $("#result_area").text(this.number);

        if ($("#result_area").text().length > 13) {
            $("#result_area").css("font-size", '80%')
        }
        else $("#result_area").css("font-size", '100%')
    }

    appendDelete() {
        this.number = this.number.toString();
        let newNum = '';
        if (this.number.length == 1) newNum = '0';
        else newNum = this.number.substring(0, this.number.length - 1);

        $("#result_area").text(newNum);

        if (newNum != '') this.number = newNum;
    }

    clear() {
        $("#result_area").text('0');
        $("#result_area").css("font-size", '30px')
        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
        
        this.result = 0;
        this.number = "";
    }

}

let calculator = new Calculator();

function hex() {
    let num = parseInt($('#result_area').text());
    console.log(num);
    let hex = num.toString(16);
    $(".hex-convert_result").text(hex);
}

function dec() {
    let num = parseInt($('#result_area').text());
    let dec = parseInt(num, 16);

    $(".dec-convert_result").text(dec);
}

function bin() {
    let num = parseInt($('#result_area').text());
    let bin = num.toString(2);

    $(".bin-convert_result").text(bin);
}

$('.number, .funcs').on("click", function() {
    hex();
    dec();
    bin();
})
