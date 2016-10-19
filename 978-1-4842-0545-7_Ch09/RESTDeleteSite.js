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

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/" + siteTitleNoSpaces + "/_api/web";

    $.ajax({
        url: fullUrl,
        type: "POST",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "DELETE",
            "IF-MATCH": "*"
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function onQuerySucceeded() {
    $("#divResults").html("Site successfully deleted!");
}

function onQueryFailed(sender, args) {
    alert('Error!');
}