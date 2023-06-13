$(".menu_button").on("click", function() {
    if ($(".menu_button").hasClass("active_menu")) {
        $(".menu-container").removeClass("active_menu");
        $(".menu_button").removeClass("active_menu");
    } else {
        $(".menu-container").addClass("active_menu");
        $(".menu_button").addClass("active_menu");
    }
})
