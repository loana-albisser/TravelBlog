/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    var $statement;

    $("#saveDialog").dialog({ autoOpen: false });

    $("#save").click(
        function () {
            $("#saveDialog").dialog('open');
            return false;
        }
    );

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
                data: {id:"insertBlogEntry", blogid:1,title:$("#title").val(),createdate:$("#date").val(),photo:$("#photo").val(),description:$("#description").val()},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    alert(result.toString());
                    if ($statement == "save"){
                        document.location.assign("TravelBlogEntry.html");
                    } else if ($statement == "next"){
                        $("#entryForm").reset();
                        //document.getElementById("entryForm").reset();
                    }

                }
            });
        }
    }


});

/**
 * toDo hardCoded Blogid!
 * @type {{saveBlogEntry: blogEntryReg.saveBlogEntry}}
 */

