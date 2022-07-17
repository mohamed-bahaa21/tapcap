var form_ele = ".update_form";

// make eveything disabled
var disableFormEdit = function (selector) {
    $(selector).removeClass("form_enabled").addClass("form_disabled");
    $(selector + " input, " + selector + " select, " + selector + " button").prop("disabled", true);
};

// make eveything enabled
var enableFormEdit = function (selector) {
    $(selector + " input, " + selector + " select, " + selector + " button ").prop("disabled", false);
    $(selector).removeClass("form_disabled").addClass("form_enabled");
};

disableFormEdit(form_ele);

$(".js-toggleForm").click(function () {
    // get the status of form
    var form_status = $(form_ele).hasClass("form_disabled")
        ? "disabled"
        : "enabled";

    // check if disabled or enabled
    switch (form_status) {
        case "disabled":
            enableFormEdit(form_ele);
            $(this).text("Disable Update");
            break;
        case "enabled":
            disableFormEdit(form_ele);
            $(this).text("Enable Update");
            break;
    }
});
