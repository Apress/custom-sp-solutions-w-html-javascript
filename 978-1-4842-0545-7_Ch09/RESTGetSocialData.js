$(function () {
    getUserProfileInfo();
    getUserFollows();
});

function getUserProfileInfo() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/social.feed/my";

    $.ajax({
        url: fullUrl,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: onUserInfoQuerySucceeded,
        error: onQueryFailed
    });
}

function getUserFollows() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl;
    var fullUrl = siteUrl + "/_api/social.following/my/followed(types=15)";

    $.ajax({
        url: fullUrl,
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
        },
        success: onFollowQuerySucceeded,
        error: onQueryFailed
    });
}

function onUserInfoQuerySucceeded(data) {
	$("#WelcomeMessageUserName").text(data.d.Me.Name);
}

function onFollowQuerySucceeded(data) {
    var following = data.d.Followed.results;
    var followedItems = "Items you are following:<br />";
    $.each(following, function (index, value) {
        followedItems += "<a href='" + value.Uri + "'>" + value.Name + "</a><br />";

    });
    $("#UserFollows").append(followedItems);
}

function onQueryFailed(sender, args) {
    alert("Error");
}