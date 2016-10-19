$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        createFolder();
    });
}

function createFolder() {
    var folderName = $("#txtFolderName").val();

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/folders";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Folder' },
            'ServerRelativeUrl': 'Shared Documents/' + folderName
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
    $("#divResults").html("Folder successfully created!");
}

function onQueryFailed() {
    alert('Error!');
}