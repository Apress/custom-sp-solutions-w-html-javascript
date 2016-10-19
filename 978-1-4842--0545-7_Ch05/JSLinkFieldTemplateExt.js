function listItemClick() {
    $(".status-image").on("click", function () {
        var status = $(this).attr("data-val");
        alert("STATUS: " + status);
    });
}

_spBodyOnLoadFunctions.push(listItemClick);