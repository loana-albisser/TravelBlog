/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    var $blogId;
    var $blogEntryId;
    var $last_segment;
    var $statement;

    $.ajax({
        type: 'post',
        url: '../php/ajax.php',
        data: {id:"auth",reqgroup:1},
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
            if(result.toString()=="false"){
                alert("Du musst eingeloggt sein oder hast keine Berechtigung.");
                document.location.assign("TravelBlogOverview.html");
            }



        }
    });

    window.onload = function () {
        var segment_str = document.referrer;
        var segment_array = segment_str.split( '/' );
        $last_segment = segment_array[segment_array.length - 1];
        alert($last_segment);
        if ($last_segment == "TravelBlogEntry.html"){
            $blogId = localStorage.getItem("Blog");
            $blogEntryId = localStorage.getItem("blogEntryId");
            if (localStorage.getItem("added")==0){
                blogEntryReg.loadBlogEntry($blogEntryId);
            }
        } else if ($last_segment == "TravelRegistration.html"||$last_segment == "TravelEntryRegistration.html"){
            $blogId = localStorage.getItem("registeredBlog");
        }
    }

    $("#logout").click(function () {
    });

    $("#saveDialog").dialog({ autoOpen: false });

    $("#save").click(
        function () {
            $("#saveDialog").dialog('open');
            return false;
        }
    );



    $("#saveOk").click(function () {
        $statement = "save";
        if ($last_segment == "TravelRegistration.html"){
            blogEntryReg.saveBlogEntry($blogId);
        } else if ($last_segment=="TravelBlogEntry.html"){
            if (localStorage.getItem("added")==1){
                blogEntryReg.saveBlogEntry($blogId);
            } else {
                alert("BlogEntry:"+$blogEntryId);
                alert("Blog:"+$blogId);
                blogEntryReg.updateBlog($blogEntryId,$blogId);
            }
        }
        $("#saveDialog").dialog('close');

    })

    $("#newEntry").click(function() {
        $statement = "next";
        blogEntryReg.saveBlogEntry($blogId);
    });


    var blogEntryReg = {
        saveBlogEntry: function (id) {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"insertBlogEntry", blogid:id,title:$("#titleEntryRegistration").val(),createdate:$("#dateEntryRegistration").val(),picture:$("#photoEntryRegistration").val(),description:$("#descriptionEntryRegistration").val()},
                error: function (jqXHR, exception) {
                    alert("Error: "+jqXHR.status);
                },
                success:function (result) {
                    if ($statement == "save"){
                        alert("saved: "+result);
                        document.location.assign("TravelBlogEntry.html");
                    } else if ($statement == "next"){
                        alert("next: "+result);
                        $("#entryForm").reset();

                    }
                }
            });
        },

        loadBlogEntry: function (id) {
            alert("load:"+id);
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"getBlogEntryById", blogEntryId:id,},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    alert(result);
                    var response = JSON.parse(result);
                    $("#titleEntryRegistration").val(response['titel']);
                    $("#dateEntryRegistration").val(response['createdate']);
                    $("#photoEntryRegistration").val(response['picture']);
                    $("#descriptionEntryRegistration").val(response['description']);
                    $("#newEntry").hide();
                }
            });
        },

        updateBlog: function(entryId, id){
            alert($blogEntryId+" "+$blogId+" "+$("#titleEntryRegistration").val()+" "+$("#dateEntryRegistration").val()+" "+$("#photoEntryRegistration").val()+" "+$("#descriptionEntryRegistration").val());
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"updateBlogEntry", blogEntryId:entryId, blogid:id,title:$("#titleEntryRegistration").val(),createdate:$("#dateEntryRegistration").val(),picture:$("#photoEntryRegistration").val(),description:$("#descriptionEntryRegistration").val()},
                error: function (jqXHR, exception) {
                    alert("Error:"+jqXHR.status);
                },
                success:function (result) {
                    alert(result);
                    document.location.assign("TravelBlogEntry.html");
                }
            });
        },

    }
});


