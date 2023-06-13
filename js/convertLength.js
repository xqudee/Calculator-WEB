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
        let str = 'sm';
        if ($(".select.first").text() == 'millimeters') str = 'mm';
        else if ($(".select.first").text() == 'meters') str = 'm';
        else if ($(".select.first").text() == 'kilometers') str = 'km';

        let str1 = 'sm';
        if ($(".select.second").text() == 'millimeters') str1 = 'mm';
        else if ($(".select.second").text() == 'meters') str1 = 'm';
        else if ($(".select.second").text() == 'kilometers') str1 = 'km';

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
        else if (this.result != 0)
            $("#expression_string").text($("#expression_string").text() + ' ' + this.result);
            //document.getElementById("expression_string").innerText = document.getElementById("expression_string").textContent + ' ' + this.result;
        
        $("#result_area").css("font-size", '30px')
        $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
            
        this.result = 0;
        this.string = "0";
        this.number = "";
    }

    updateResult() {
        const conversionRates = {
        millimeters: {
            millimeters: 1,
            santimeters: 0.1,
            meters: 0.001,
            kilometers: 0.000001
        },
        santimeters: {
            millimeters: 10,
            santimeters: 1,
            meters: 0.01,
            kilometers: 0.00001
        },
        meters: {
            millimeters: 1000,
            santimeters: 100,
            meters: 1,
            kilometers: 0.001
        },
        kilometers: {
            millimeters: 1000000,
            santimeters: 100000,
            meters: 1000,
            kilometers: 1
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

$(".select.menu-first.millimeters").on("click", function() {
    let temp = $(".select.menu-first.millimeters").text();
    $(".select.menu-first.millimeters").text($(".select.first").text());
    $(".select.first").text(temp);
    $(".select_menu.first").removeClass("active_menu_len");
});

$(".select.menu-first.meters").on("click", function() {
    let temp = $(".select.menu-first.meters").text();
    $(".select.menu-first.meters").text($(".select.first").text());
    $(".select.first").text(temp);
    $(".select_menu.first").removeClass("active_menu_len");
});

$(".select.menu-first.kilometers").on("click", function() {
    let temp = $(".select.menu-first.kilometers").text();
    $(".select.menu-first.kilometers").text($(".select.first").text());
    $(".select.first").text(temp);
    $(".select_menu.first").removeClass("active_menu_len");
});


$(".select.menu-second.millimeters").on("click", function() {
    let temp = $(".select.menu-second.millimeters").text();
    $(".select.menu-second.millimeters").text($(".select.second").text());
    $(".select.second").text(temp);
    $(".select_menu.second").removeClass("active_menu_len");
});

$(".select.menu-second.meters").on("click", function() {
    let temp = $(".select.menu-second.meters").text();
    $(".select.menu-second.meters").text($(".select.second").text());
    $(".select.second").text(temp);
    $(".select_menu.second").removeClass("active_menu_len");
});

$(".select.menu-second.kilometers").on("click", function() {
    let temp = $(".select.menu-second.kilometers").text();
    $(".select.menu-second.kilometers").text($(".select.second").text());
    $(".select.second").text(temp);
    $(".select_menu.second").removeClass("active_menu_len");
});