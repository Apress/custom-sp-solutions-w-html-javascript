$(function () {
    ExecuteOrDelayUntilScriptLoaded(getUserProfileProperties, "sp.userprofiles.js");
});

function getUserProfileProperties() {
    var clientContext = new SP.ClientContext();

    var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
    userProperties = peopleManager.getMyProperties();
    clientContext.load(userProperties);

    var followingManager = new SP.Social.SocialFollowingManager(clientContext);
    following = followingManager.getFollowed(15);

    clientContext.executeQueryAsync(
    Function.createDelegate(this, this.onQuerySucceeded),
    Function.createDelegate(this, this.onQueryFailed)
);
}

function onQuerySucceeded() {
	$("#WelcomeMessageUserName").text(userProperties.get_displayName());

	var followedItems = "Items you are following:<br />";
	$.each(following, function( index, value ) {
		followedItems += "<a href='" + value.get_uri() + "'>" + value.get_name() + "</a><br />";

	});
	$("#UserFollows").append(followedItems);
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}