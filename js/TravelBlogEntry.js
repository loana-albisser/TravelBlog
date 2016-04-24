/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    $("#addTravelEntry").click(function() {
        document.location.href = "TravelEntryRegistration.html";
    });
    
    $("#editButton").click(function () {
        document.location.href = "TravelEntryRegistration.html"
    });

    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteButton").click(function () {
            $("#deleteDialog").dialog('open');
            return true;
        }
    );
    
    $("#dialogYes").click(function () {
        
    });
    
    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    })
    


});