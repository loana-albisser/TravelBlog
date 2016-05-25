/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var loggedIn= true;

    window.onload = function () {
        blogOverview.loadblog();
    }


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
        document.location.assign("TravelRegistration.html");
    });

    $("#loginDialog").dialog({ autoOpen: false });

    $("#login").click( function () {
            $("#loginDialog").dialog('open');
            return true;
        }
    );


    $("#blogTable").on('click',"#title", function () {
        alert ("title");
        document.location.assign("TravelBlogEntry.html");
    });

    $("#blogTable").on('click',"#destination", function () {
        document.location.assign("TravelBlogEntry.html");
        alert("destination");
    });

    $("#blogTable").on('click',"#shortDescription", function () {
        document.location.assign("TravelBlogEntry.html");
    });

    $("#blogTable").on('click',"#startDate", function () {
        document.location.assign("TravelBlogEntry.html");
    });

    $("#blogTable").on('click',"#editButton", function () {
        blogOverview.updateBlog();
    });

    $("#blogTable").on('click',"#deleteButton", function () {
            $("#deleteDialog").dialog('open');
            return false;
    });

    $("#dialogYes").click(function () {
        blogOverview.deleteBlog();
        $("#deleteDialog").dialog('close');
    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    });

    if (loggedIn){
        $("#logout").hide();
    } else {
        //$("#editButton").hide();
        //$("#deleteButton").hide();
        //$("#addBlogg").hide();
    }

    var blogOverview = {

        loadblog: function () {
            $.ajax({
                type: 'get',
                url: '../php/ajax.php',
                data: {id:"getAllBlogs"},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    alert(result.toString());
                    alert("getAllBlogs");
                    //$("#blogtable tr").remove();
                    $("#blogTable tbody").append('<tr class="child"><td>Titel</td><td>Ziel</td><td>Kurzbeschreibung</td><td>Startdatum</td><td> </td><td> </td></tr>');
                    var blogs = [];
                    alert (result);
                    for (var i=0; i<result.length;i++){
                        //alert("fill table entries");
                            $("#blogTable tbody").append(
                                /*'<tr class="child"><td>'+ response['titel']+
                                '</td><td>'+response['destination']+
                                '</td><td>'+response['description']+
                                '</td><td>'+response['startdate']+'</td></tr>'*/
                                '<tr class="child"><td id="title">'+ 'titel'+
                                '</td><td id="destination">'+'destination'+
                                '</td><td id="description">'+'description'+
                                '</td><td id="startDate">'+'startdate'+
                                '</td><td id="editButton">'+'<button type="button" class="glyphicon glyphicon-pencil btn btn-link"></button>'+
                                '</td><td id="deleteButton">'+'<button type="button" class="glyphicon glyphicon-trash btn btn-link"></button>'+'</td></tr>'

                            );
                    }


                }
            });
        },

        updateBlog:function () {
            alert("update!");
            document.location.assign("TravelRegistration.html");
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