$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        createSite();
    });
}

function createSite() {
    var siteTitle = $("#txtSiteTitle").val();
    var siteDesc = $("#txtSiteDescription").val();
    var siteUrl = siteTitle.replace(/\s/g, "");

    var clientContext = new SP.ClientContext();
    var collWeb = clientContext.get_web().get_webs();

    var webCreationInfo = new SP.WebCreationInformation();
    webCreationInfo.set_title(siteTitle);
    webCreationInfo.set_description(siteDesc);
    webCreationInfo.set_language(1033);
    webCreationInfo.set_url(siteUrl);
    webCreationInfo.set_useSamePermissionsAsParentSite(true);
    webCreationInfo.set_webTemplate('STS#0');

    var oNewWebsite = collWeb.add(webCreationInfo);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    $("#divResults").html("Site successfully created!");
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}