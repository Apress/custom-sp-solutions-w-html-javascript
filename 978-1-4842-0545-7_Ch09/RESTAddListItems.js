$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        addListItem();
    });
}

function addListItem() {
    var title = $("#txtTitle").val();
    var desc = $("#txtDesc").val();

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Demo List')/items";

    $.ajax({
        url: fullUrl,
        type: "POST",
        data: JSON.stringify({
            '__metadata': { 'type': 'SP.Data.Demo_x0020_ListListItem' },
            'Title': title,
            'Description': desc,
            'Status':'On-time'
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

function onQuerySucceeded(sender, args) {
    $("#divResult").html("Item successfully added!");
}

function onQueryFailed() {
    alert('Error!');
}