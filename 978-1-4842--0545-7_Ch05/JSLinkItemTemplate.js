(function () { 
    var overrideContext = {};
    overrideContext.Templates = {}; 
    overrideContext.Templates.Item = overrideTemplate;
    overrideContext.Templates.Header = overrideHeader;
    overrideContext.Templates.Footer = overrideFooter;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext); 
})(); 
  
function overrideTemplate(ctx) {
    var status = ctx.CurrentItem.Status;
    var image = "";

    if (status == "Delayed")
        image = "/apress/Webparts/JSLink/Status-Delayed.png";
    if (status == "On-time")
        image = "/apress/Webparts/JSLink/Status-Ontime.png";
    if (status == "Late")
        image = "/apress/Webparts/JSLink/Status-Late.png";

    return "<div style='font-size:18px;margin-bottom:6px;padding:4px;cursor:pointer;' class='list-item-div'>"
        + ctx.CurrentItem.Title
        + "<div style='font-size:14px;border-top:solid 1px Silver;display:none;'>"
        + "<span style='display:inline-block;'>" + ctx.CurrentItem.Status + "<br /><img src='" + image + "' /></span>"
        + "<span style='display:inline-block;vertical-align:top;padding-left:16px;'>"
        + "<strong>Description</strong><br />"
        + ctx.CurrentItem.Description + "</span>"
        + "</div>"
        + "</div>";
}

function overrideHeader() {
    return "<h3>These items are tasks from the Demo List:</h3>";
}

function overrideFooter() {
    return "<h4>Click an item to view it's details.</h4>";
}

function listItemClick() {
    $(".list-item-div").on("click", function () {
        var childDiv = $(this).children()[0];
        $(childDiv).toggle("slow");
    });
}

_spBodyOnLoadFunctions.push(listItemClick);