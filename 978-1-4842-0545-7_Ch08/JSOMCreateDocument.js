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

    var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();
    var oList = oWebsite.get_lists().getByTitle("Documents");

    var fileCreateInfo = new SP.FileCreationInformation();
    fileCreateInfo.set_url(docTitle);
    fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
    var fileContent = docContent;

    for (var i = 0; i < fileContent.length; i++) {

        fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
    }

    this.newFile = oList.get_rootFolder().get_files().add(fileCreateInfo);

    clientContext.load(this.newFile);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    $("#divResults").html("Document successfully created!");
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}