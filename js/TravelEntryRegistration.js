/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    $("#saveDialog").dialog({ autoOpen: false });

    $("#save").click(
        function () {
            $("#saveDialog").dialog('open');
            return false;
        }
    );

    $("#saveOk").click(function () {
        document.location.href = "TravelBlogEntry.html"
    })


});