$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmit").on("click", function () {
        deleteListItem();
    });
}

function deleteListItem() {
    var id = $("#txtId").val();

    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/web/lists/GetByTitle('Demo List')/items(" + id + ")";

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

function onQuerySucceeded(sender, args) {
    $("#divResult").html("Item successfully deleted!");
}

function onQueryFailed() {
    alert('Error!');
}
