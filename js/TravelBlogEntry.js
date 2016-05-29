/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var logedIn = true;
    var $blogId;
    var $added;
    var $deleteButton;

    $.ajax({
        type: 'post',
        url: '../php/ajax.php',
        data: {id:"auth",reqgroup:-1},
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
        success:function (result) {
            logedIn = result;



        }
    });

    window.onload = function () {
        var segment_str = document.referrer;
        var segment_array = segment_str.split( '/' );
        var last_segment = segment_array[segment_array.length - 1];
        alert(last_segment);
        if (last_segment=="TravelEntryRegistration.html"){
            $blogId = localStorage.getItem("registeredBlog");
            alert(localStorage.getItem("registeredBlog"));
            blogEntry.loadBlogEntries($blogId);
        } else if (last_segment=="TravelBlogOverview.html"){
            $blogId = localStorage.getItem("selectedBlog");
        }
        //blogEntry.loadBlogEntries($blogId);
        localStorage.setItem("Blog",$blogId);
    }
    

    $("#addTravelEntry").click(function() {
        document.location.href = "TravelEntryRegistration.html";
        $added = 1;
        localStorage.setItem("added",$added);

    });

    $("#editEntryButton").click(function (event) {
        $added = 0;
        blogEntry.updateBlogEntry($(event.target).attr("id"));
    });

    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteEntryButton").click(function (event) {
        $("#deleteDialog").dialog('open');
            $deleteButton = $(event.target).attr("id");
            return false;
        }
    );


    $("#dialogYes").click(function () {
        blogEntry.deleteBlogEntry($deleteButton);
        loadBlogEntries($blogId);
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
                    for (var i=0; i<response.length;i++){
                        $("#travelEntry").clone().insertAfter("#travelEntry");
                        $("#blogEntryTitle").html(response[i]['titel']);
                        $("#blogEntryDate").html(response[i]['createdate']);
                        $("#blogEntryDescription").html(response[i]['description']);
                        $("#editEntryButton").attr("id", response[i]['id']);
                        $("#deleteEntryButton").attr("id", response[i]['id']);
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
                    localStorage.setItem("added",$added);
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