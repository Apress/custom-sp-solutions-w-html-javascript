$(function () {
    bindButtonClick();
});

function bindButtonClick() {
    $("#btnSubmitListName").on("click", function () {
        var listName = $("#txtListName").val();
        deleteList(listName);
    });
}

function deleteList(listName) {
    var clientContext = new SP.ClientContext();
    var oWebsite = clientContext.get_web();
    
    this.oList = oWebsite.get_lists().getByTitle(listName);
    oList.deleteObject();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded() {
    $("#divDeleteListResults").html("List successfully deleted!");
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}