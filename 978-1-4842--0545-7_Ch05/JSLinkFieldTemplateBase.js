(function () { 
    var overrideContext = {};
    overrideContext.Templates = {}; 
    overrideContext.Templates.Fields =
    {
        'Status': { 'View': overrideTemplate }
    };
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

    return "<img class='status-image' src='" + image + "' data-val='" + status + "' />";
}