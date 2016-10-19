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

    var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();
    var oList = oWebsite.get_lists().getByTitle("Documents");

    var folderCreateInfo = new SP.ListItemCreationInformation();
    folderCreateInfo.set_underlyingObjectType(SP.FileSystemObjectType.folder);
    folderCreateInfo.set_leafName(folderName);
    this.oListItem = oList.addItem(folderCreateInfo);
    this.oListItem.update();

    clientContext.load(oList);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    $("#divResults").html("Folder successfully created!");
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}