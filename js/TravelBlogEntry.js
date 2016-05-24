/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var logedIn = true;
    window.onload = function () {
        blogEntry.loadBlogEntries();
    }
    

    $("#addTravelEntry").click(function() {
        document.location.href = "TravelEntryRegistration.html";
    });

    $("#editButton").click(function () {
        document.location.href = "TravelEntryRegistration.html"
        blogEntry.updateBlogEntry();
    });

    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteButton").click(function () {
            $("#deleteDialog").dialog('open');
            return true;
        }
    );

    $("#dialogYes").click(function () {
        blogEntry.deleteBlogEntry();

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

    var blogEntry = {
        loadBlogEntries: function () {
            //alert("loadEntries");
            $("#title").load('../php/ajax.php',{id:"getBlogEntries", blogId:1},function(responseTxt, statusTxt, xhr){
                if(statusTxt == "success")
                    alert("External content loaded successfully!");
                if(statusTxt == "error")
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
            });            
        },
        
        updateBlogEntry: function(){
            
        },
        
        deleteBlogEntry: function(){
            alert("deleted");
            $.ajax({
                 type: 'post',
                 url: '../php/ajax.php',
                 data: {id:"deleteBlogEntries", blogEntryId:15},
                 error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                 },
                 success:function (result) {
                    alert(result.toString());
                     $("#deleteDialog").dialog('close');
                 }
             });
        }


    }
     




});