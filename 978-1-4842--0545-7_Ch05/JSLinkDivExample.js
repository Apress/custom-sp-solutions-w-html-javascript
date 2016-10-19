(function () { 
    var overrideContext = {}; 
    overrideContext.Templates = {}; 
    overrideContext.Templates.Item = overrideTemplate;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideContext); 
})(); 
  
function overrideTemplate(ctx) {
    return "<div style='font-size:18px;border:solid 1px Silver;margin-bottom:6px;padding:4px;width:200px;'>"
        + ctx.CurrentItem.Title
        + "</div>";
}