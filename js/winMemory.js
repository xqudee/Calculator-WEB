$('#showM').on("click", function() {
    if ($(".memory-div").hasClass("active_memory")) {
        $(".memory-div").removeClass("active_memory");
    } else {
        $(".memory-div").addClass("active_memory");
    }
})