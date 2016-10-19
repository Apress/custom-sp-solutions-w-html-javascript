$(function () {
    retrieveListItems();
});

function retrieveListItems() {
    var clientContext = new SP.ClientContext();
    var oList = clientContext.get_web().get_lists().getByTitle('Demo List');

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(
        '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
        '<Value Type=\'Number\'>5</Value></Geq></Where></Query>' +
        '<RowLimit>10</RowLimit></View>'
    );
    this.collListItem = oList.getItems(camlQuery);

    clientContext.load(collListItem);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded),
        Function.createDelegate(this, this.onQueryFailed)
    );
}

function onQuerySucceeded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();

    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItemInfo += '<strong>ID: </strong> ' + oListItem.get_id() +
            ' <strong>Title:</strong> ' + oListItem.get_item('Title') +
            '<br />';
    }

    $("#divListItems").html(listItemInfo);
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}