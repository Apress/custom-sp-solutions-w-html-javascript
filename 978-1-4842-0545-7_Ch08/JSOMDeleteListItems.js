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

    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle('Demo List');

    this.oListItem = oList.getItemById(id);
    oListItem.deleteObject();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onAddSucceeded),
        Function.createDelegate(this, this.onAddFailed)
    );

}

function onAddSucceeded(sender, args) {
    $("#divResult").html("Item successfully deleted!");
}

function onAddFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}
