$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmitListName").on("click", function () {
        var listName = $("#txtListName").val();
        createList(listName);
    });
}

function createList(listName) {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.List' },
            'BaseTemplate': 100,
            'Title': listName
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

function onQuerySucceeded(data) {
    $("#divCreateListResults").html(data.d.Title + " successfully created!");
}

function onQueryFailed() {
    alert('Error!');
}