/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    $("#editButton").click(function () {
        document.location.href = "TravelRegistration.html"
    });
    
    /*$("#table").on("click", "th:title", function(e) {
        document.location.href = "TravelBlogEntry.html"
    }); */
    $("#title").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });
    $("#destination").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });

    $("#startDate").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });


    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteButton").click(
        function () {
            $("#deleteDialog").dialog('open');
            return false;
        }
    );

    $("#addBlogg").click(function () {
       document.location.href = "TravelRegistration.html"
    });

    $("#loginDialog").dialog({ autoOpen: false });

    $("#login").click( function () {
        $("#loginDialog").dialog('open');
        return true;
        }
    );

    $("#dialogYes").click(function () {

    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    })


});