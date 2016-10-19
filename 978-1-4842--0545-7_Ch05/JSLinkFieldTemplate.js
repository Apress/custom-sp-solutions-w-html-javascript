(function () { 
    var overrideContext = {};
    overrideContext.Templates = {}; 
    overrideContext.Templates.Fields =
    {
        'Status': { 'View': overrideTemplate },
        'Description': { 'View': overrideDescTemplate }
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext); 
})();

function overrideDescTemplate(ctx) {
    return "<span style='font-weight:bold;'>" + ctx.CurrentItem.Description + "</span>";
}
  
function overrideTemplate(ctx) {
    var status = ctx.CurrentItem.Status;
    var image = "";

    if (status == "Delayed")
        image = "/apress/Webparts/JSLink/Status-Delayed.png";
    if (status == "On-time")
        image = "/apress/Webparts/JSLink/Status-Ontime.png";
    if (status == "Late")
        image = "/apress/Webparts/JSLink/Status-Late.png";

    return "<img class='status-image' src='" + image + "' data-val='" + status + "' />";
}

function listItemClick() {
    $(".status-image").on("click", function () {
        var status = $(this).attr("data-val");
        alert(status);
    });
}

_spBodyOnLoadFunctions.push(listItemClick);