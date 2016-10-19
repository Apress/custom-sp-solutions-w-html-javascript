$(function () {
    retrieveListItems();
});

function retrieveListItems() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Demo List')/items?$filter=Id ge 4";

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
        listItemInfo += '<strong>ID: </strong> ' + value.Id +
            ' <strong>Title:</strong> ' + value.Title +
            '<br />';
    });

    $("#divListItems").html(listItemInfo);
}

function onQueryFailed(sender, args) {
    alert('Error!');
}