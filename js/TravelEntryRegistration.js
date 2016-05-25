/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    window.onload = function () {
        var segment_str = document.referrer;
        var segment_array = segment_str.split( '/' );
        var last_segment = segment_array[segment_array.length - 1];
        alert(last_segment);
        if (last_segment == "TravelBlogEntry.html"){
            blogEntryReg.loadBlogEntry();
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
        blogEntryReg.saveBlogEntry();
    })

    $("#newEntry").click(function() {
        $statement = "next";
        blogEntryReg.saveBlogEntry();
    });

    var blogEntryReg = {
        saveBlogEntry: function () {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"insertBlogEntry", blogid:1,title:$("#titleEntryRegistration").val(),createdate:$("#dateEntryRegistration").val(),photo:$("#photoEntryRegistration").val(),description:$("#description").val()},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    alert(result.toString());
                    if ($statement == "save"){
                        document.location.assign("TravelBlogEntry.html");
                    } else if ($statement == "next"){
                        $("#entryForm").reset();
                    }

                }
            });
        },

        loadBlogEntry: function () {
            $("#titleEntryRegistration").val("EntryRegistration");
        }
    }




});


