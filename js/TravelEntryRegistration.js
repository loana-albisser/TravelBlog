/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    var $blogId;
    var $blogEntryId;

    window.onload = function () {
        var segment_str = document.referrer;
        var segment_array = segment_str.split( '/' );
        var last_segment = segment_array[segment_array.length - 1];
        alert(last_segment);
        if (last_segment == "TravelBlogEntry.html"){
            $blogId = localStorage.getItem("Blog");
            $blogEntryId = localStorage.getItem("blogEntryId");
            blogEntryReg.loadBlogEntry($blogEntryId);
            $("#save").hide();
            $("#newEntry").hide();
            $("#updateBlogEntry").show();
        } else if (last_segment=="TravelRegistration.html"){
            $blogId = localStorage.getItem("registeredBlog");
            $("#save").show();
            $("#newEntry").show();
            $("#updateBlogEntry").hide();
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

    var $statement;

    $("#saveOk").click(function () {
        $statement = "save";
        blogEntryReg.saveBlogEntry($blogId);
    })

    $("#newEntry").click(function() {
        $statement = "next";
        blogEntryReg.saveBlogEntry($blogId);
    });

    $("#updateBlogEntry").click(function () {
        blogEntryReg.updateBlog($blogId);
    })

    var blogEntryReg = {
        saveBlogEntry: function (id) {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"insertBlogEntry", blogid:$blogId,title:$("#titleEntryRegistration").val(),createdate:$("#dateEntryRegistration").val(),picture:$("#photoEntryRegistration").val(),description:$("#descriptionEntryRegistration").val()},
                error: function (jqXHR, exception) {
                    alert("Error: "+jqXHR.status);
                },
                success:function (result) {
                    if ($statement == "save"){
                        alert("saved: "+result);
                        document.location.assign("TravelBlogEntry.html");
                    } else if ($statement == "next"){
                        alert("next: "+result)
                        /*$("#save").show();
                        $("#newEntry").show();
                        $("#updateBlogEntry").hide();*/
                        $("#entryForm").reset();

                    }
                }
            });
        },

        loadBlogEntry: function (id) {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"getBlogEntryById", blogEntryId:id},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    var response = JSON.parse(result);
                    alert(result);                    
                    $("#titleEntryRegistration").val(response['titel']);
                    $("#dateEntryRegistration").val(response['createdate']);
                    $("#photoEntryRegistration").val(response['picture']);
                    $("#descriptionEntryRegistration").val(response['description']);
                }
            });
        },

        updateBlog: function(id){
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"updateBlogEntry", blogEntryId:id},
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


