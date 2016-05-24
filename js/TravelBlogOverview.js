/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var loggedIn= true;
    blogOverview.loadblog();

    $("#editButton").click(function () {
        blogOverview.updateBlog();
    });

    $("#title").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });
    $("#destination").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });
    $("#shortDescription").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });
    $("#duration").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });
    $("#startDate").click(function () {
        document.location.href = "TravelBlogEntry.html"
    });

    $("#deleteDialog").dialog({
        autoOpen: false
    });

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
        blogOverview.deleteBlog();
    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    });

    if (loggedIn){
        $("#logout").hide();
        $("#editButton").show();
        $("#deleteButton").show();
        $("#addBlogg").show();
    } else {
        $("#editButton").hide();
        $("#deleteButton").hide();
        $("#addBlogg").hide();
    }

    var blogOverview = {
        loadblog: function () {
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
            /*$("#blogTable tr").remove();
             $("#blogTable tbody").append('<tr class="child"><td>Titel</td><td>Ziel</td><td>Kurzbeschreibung</td><td>Startdatum</td><td>Dauer</td></tr>');
             for (var i=0; i< entry ;i++){
             ('<tr class="child">' +
             '<td>'+r.users[i].id+
             '</td><td>'+r.users[i].name+
             '</td><td>'+r.users[i].last_activity+
             '</td><td>'+r.users[i].online+
             '</td><td>'+r.users[i].registered+'</td>' +
             '</tr>');
             }*/
        },

        updateBlog:function () {
            $("#titleBlogRegistration").load('../php/ajax.php',{id:"getBlogById", blogId:1},function(responseTxt, statusTxt, xhr){
                if(statusTxt == "success")
                    alert("External content loaded successfully!");
                    document.location.href = "TravelRegistration.html"
                if(statusTxt == "error")
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
            });
        },

        deleteBlog:function () {

            alert("deleted");
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"deleteBlog", blogid:1},
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