/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var logedIn = true;
    var $blogId;

    window.onload = function () {
        var segment_str = document.referrer;
        var segment_array = segment_str.split( '/' );
        var last_segment = segment_array[segment_array.length - 1];
        alert(last_segment);
        if (last_segment=="TravelEntryRegistration.html"){
            $blogId = localStorage.getItem("registeredBlog");
            alert(localStorage.getItem("registeredBlog"));
        } else if (last_segment=="TravelBlogOverview.html"){
            $blogId = localStorage.getItem("selectedBlog");
        }
        blogEntry.loadBlogEntries($blogId);
        localStorage.setItem("Blog",$blogId);
    }
    

    $("#addTravelEntry").click(function() {
        document.location.href = "TravelEntryRegistration.html";
    });

    $("#editEntryButton").click(function (event) {
        blogEntry.updateBlogEntry($(event.target).attr("name"));
        //$("#titleEntryRegistration").val("updateEntry");
    });

    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteButton").click(function () {
        $("#deleteDialog").dialog('open');
            return true;
        }
    );

    $("#travelEntry").on('click',  function (event) {
        var split_array = $(event.target).attr("id").split("_");
        var id = split_array[split_array.length-1];
        //alert ($(event.target).attr("id"));
        alert(("#travelEntry").data('id'));
        /*if($(event.target).attr("id").contains("deleteButton_")) {
            $("#deleteDialog").data("id", id).dialog('open');
            return false;
        }*/
    });

    $("#dialogYes").click(function () {
        blogEntry.deleteBlogEntry($blogId);

    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    })

    if (logedIn){
        $("#editEntryButton").show();
        $("#deleteEntryButton").show();
        $("#addTravelEntry").show();
    } else {
        $("#editEntryButton").hide();
        $("#deleteEntryButton").hide();
        $("#addTravelEntry").hide();
    }

    var arrayResult;

    var blogEntry = {
        loadBlogEntries: function (id) {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id: "getBlogEntries", blogId:id},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success: function (result) {
                    var response = JSON.parse(result);
                    alert(localStorage.getItem("selectedBlog"));
                    //alert(result);
                    //alert(JSON.stringify(response));
                    for (var i=0; i<response.length;i++){
                        $("#travelEntry").clone().insertAfter("#travelEntry");
                        $("#blogEntryTitle").removeAttr();
                        $("#blogEntryTitle").html(response[i]['titel']);
                        $("#blogEntryDate").removeAttr();
                        $("#blogEntryDate").html(response[i]['createdate']);
                        $("#blogEntryDescription").removeAttr();
                        $("#blogEntryDescription").html(response[i]['description']);
                        $("#editEntryButton").attr("name", response[i]['id']);
                    }
                }
            });

        },


        
        updateBlogEntry: function(id){
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"updateBlogEntry", blogEntryId:id},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {

                    localStorage.setItem("blogEntryId",id);
                    document.location.assign("TravelEntryRegistration.html");
                }
            });
        },
        
        deleteBlogEntry: function(id){
            alert("deleted");
            $.ajax({
                 type: 'post',
                 url: '../php/ajax.php',
                 data: {id:"deleteBlogEntries", blogEntryId:id},
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