$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        createSite();
    });
}

function createSite() {
    var newSiteTitle = $("#txtSiteTitle").val();
    var newSiteDesc = $("#txtSiteDescription").val();
    var newSiteUrl = newSiteTitle.replace(/\s/g, "");

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/webinfos/add";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            'parameters': {
                '__metadata':  {'type': 'SP.WebInfoCreationInformation' },
                'Url': newSiteUrl,
                'Title': newSiteTitle,
                'Description': newSiteDesc,
                'Language':1033,
                'WebTemplate':'sts#0',
                'UseUniquePermissions': false
            }
        }),
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function onQuerySucceeded() {
    $("#divResults").html("Site successfully created!");
}

function onQueryFailed(sender, args) {
    alert('Error!');
}