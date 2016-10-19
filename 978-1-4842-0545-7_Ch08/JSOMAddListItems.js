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

    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle('Demo List');

    var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);
    oListItem.set_item('Title', title);
    oListItem.set_item('Description', desc);
    oListItem.set_item('Status', 'On-time');
    oListItem.update();

    clientContext.load(oListItem);

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onAddSucceeded),
        Function.createDelegate(this, this.onAddFailed)
    );

}

function onAddSucceeded(sender, args) {
    $("#divResult").html("Item successfully added!");
}

function onAddFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}