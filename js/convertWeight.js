class Calculator {
    operatorsArr = ['+', '-', '*', '/', '^'];

    constructor() {
        this.string = '0';
        this.number = '';
        this.result = 0;
        this.toClear = false;
        this.memory = 0;

        this.menuOpen = false;

        $("#result_area").text('0');
        $("#expression_string").text('');
    }

    appendNumber(number) {
        if (this.toClear) {
            this.clear();
        }
        this.toClear = false;

        this.number += number.toString();
        $("#result_area").text(this.number);

        if ($("#result_area").text().length > 13) {
            $("#result_area").css("font-size", '80%')
        }
        else $("#result_area").css("font-size", '100%')

    }

    appendEqual() {
        let str = 'g';
        if ($(".select.first").text() == 'milligrams') str = 'mg';
        else if ($(".select.first").text() == 'kilograms') str = 'kg';

        let str1 = 'g';
        if ($(".select.second").text() == 'milligrams') str1 = 'mg';
        else if ($(".select.second").text() == 'kilograms') str1 = 'kg';

        $("#expression_string").text(this.number + str + '=');
        $("#expression_string").css("font-size", '90%')
        this.updateResult();

        $("#result_area").text(this.result + str1);

        this.toClear = true;

        if ($("#result_area").text().length > 13) {
            $("#result_area").css("font-size", '80%')
        }
        else $("#result_area").css("font-size", '100%')
    
        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
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
        document.getElementById("result_area").innerText = '0';

        if (this.string == "0") document.getElementById("expression_string").innerText = ""; //очищение истории
        else if (this.result != 0) $("#expression_string").text($("#expression_string").text() + ' ' + this.result);
        
        $("#result_area").css("font-size", '30px')
        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
             
        this.result = 0;
        this.string = "0";
        this.number = "";
    }

    updateResult() {
        const conversionRates = {
            milligrams: {
                milligrams: 1,
                grams: 0.001,
                kilograms: 0.000001
            },
            grams: {
                milligrams: 1000,
                grams: 1,
                kilograms: 0.001
            },
            kilograms: {
                milligrams: 1000000,
                grams: 1000,
                kilograms: 1
            }
        };
        
        let first = $(".select.first").text();
        let second = $(".select.second").text();
    
        let conversionRate = conversionRates[first][second];
        this.result = parseInt(this.number) * conversionRate;
    }
}

let calculator = new Calculator();


$(".select.first").on("click", function() {
    if ($(".select_menu.first").hasClass("active_menu_len")) {
        $(".select_menu.first").removeClass("active_menu_len");
    } else {
        $(".select_menu.first").addClass("active_menu_len");
    }
});

$(".select.second").on("click", function() {
    if ($(".select_menu.second").hasClass("active_menu_len")) {
        $(".select_menu.second").removeClass("active_menu_len");
    } else {
        $(".select_menu.second").addClass("active_menu_len");
    }
});

$(".select.menu-first.milligrams").on("click", function() {
    let temp = $(".select.menu-first.milligrams").text();
    $(".select.menu-first.milligrams").text($(".select.first").text());
    $(".select.first").text(temp);
    $(".select_menu.first").removeClass("active_menu_len");
});

$(".select.menu-first.kilograms").on("click", function() {
    let temp = $(".select.menu-first.kilograms").text();
    $(".select.menu-first.kilograms").text($(".select.first").text());
    $(".select.first").text(temp);
    $(".select_menu.first").removeClass("active_menu_len");
});


$(".select.menu-second.milligrams").on("click", function() {
    let temp = $(".select.menu-second.milligrams").text();
    $(".select.menu-second.milligrams").text($(".select.second").text());
    $(".select.second").text(temp);
    $(".select_menu.second").removeClass("active_menu_len");
});

$(".select.menu-second.kilograms").on("click", function() {
    let temp = $(".select.menu-second.kilograms").text();
    $(".select.menu-second.kilograms").text($(".select.second").text());
    $(".select.second").text(temp);
    $(".select_menu.second").removeClass("active_menu_len");
});