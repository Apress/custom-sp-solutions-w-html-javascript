$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        deleteSite();
    });
}

function deleteSite() {
    var siteTitle = $("#txtSiteTitle").val();
    var siteTitleNoSpaces = siteTitle.replace(/\s/g, "");
    var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/" + siteTitleNoSpaces;

    var clientContext = new SP.ClientContext(siteUrl);
    var oWebsite = clientContext.get_web();

    oWebsite.deleteObject();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    $("#divResults").html("Site successfully deleted!");
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}