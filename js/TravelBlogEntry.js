/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var logedIn = false;

    $("#addTravelEntry").click(function() {
        document.location.href = "TravelEntryRegistration.html";
    });

    $("#editButton").click(function () {
        document.location.href = "TravelEntryRegistration.html"
        updateBlogEntry();
    });

    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteButton").click(function () {
            $("#deleteDialog").dialog('open');
            return true;
        }
    );

    $("#dialogYes").click(function () {
        deleteBlogEntry();
    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    })

    if (logedIn){
        $("#editButton").show();
        $("#deleteButton").show();
        $("#addTravelEntry").show();
    } else {
        $("#editButton").hide();
        $("#deleteButton").hide();
        $("#addTravelEntry").hide();
    }
    
    function loadBlogEntries() {
        
    }
    
    function updateBlogEntry() {
        
    }
    
    function deleteBlogEntry() {
        
    }




});