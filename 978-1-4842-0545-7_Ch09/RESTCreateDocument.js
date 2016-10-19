$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        createDocument();
    });
}

function createDocument() {
    var docTitle = $("#txtDocumentTitle").val() + ".txt";
    var docContent = $("#txtDocumentContent").val();

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/GetFolderByServerRelativeUrl('Shared Documents')/Files/add(url='" + docTitle + "',overwrite=true)";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: docContent,
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
    $("#divResults").html("Document successfully created!");
}

function onQueryFailed() {
    alert('Error!');
}