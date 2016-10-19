$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        deleteDocument();
    });
}

function deleteDocument() {
    var docTitle = $("#txtDocumentTitle").val() + ".txt";

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var webRelUrl = _spPageContextInfo.webServerRelativeUrl;
    var fullUrl = siteUrl + "/_api/web/GetFileByServerRelativeUrl('" + webRelUrl + "/Shared Documents/" + docTitle + "')";

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
    $("#divResults").html("Document successfully deleted!");
}

function onQueryFailed(sender, args) {
    alert('Error!');
}