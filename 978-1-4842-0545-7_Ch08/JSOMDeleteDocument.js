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

    var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();

    var fileUrl = _spPageContextInfo.webServerRelativeUrl +
            "/Shared Documents/" + docTitle;
    this.fileToDelete = oWebsite.getFileByServerRelativeUrl(fileUrl);
    this.fileToDelete.deleteObject();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    $("#divResults").html("Document successfully deleted!");
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}