$(function () {
    readDocument();
});

function readDocument() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var documentLibrary = "/Shared Documents/"
    var fileUrl = "New Text Doc.txt";
    var fullUrl = siteUrl + documentLibrary + fileUrl;

    $.ajax({
        url: fullUrl,
        type: "GET"
    })
    .done(function (data) {
        $("#divReadDocument").html(data);
    })
    .fail(function () {
        alert("error");
    });
}