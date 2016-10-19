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
    var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();
    
    var listCreationInfo = new SP.ListCreationInformation();
    listCreationInfo.set_title(listName);
    listCreationInfo.set_templateType(SP.ListTemplateType.genericList);
    this.oList = oWebsite.get_lists().add(listCreationInfo);

    clientContext.load(oList);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    var results = oList.get_title() + ' successfully created!';
    $("#divCreateListResults").html(results);
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}