$(function () {
    getListData();
});

function getListData() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists";

    $.ajax({
        url: fullUrl,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: onQuerySucceeded,
        error: onQueryFailed
    });
}

function onQuerySucceeded(data) {
    var listItemInfo = '';

    $.each(data.d.results, function (key, value) {
        listItemInfo += 'Title: ' + value.Title + ' - Created: ' +
            value.Created + '<br />';
    });

    $("#divGetListData").html(listItemInfo);
}

function onQueryFailed() {
    alert('Error!');
}