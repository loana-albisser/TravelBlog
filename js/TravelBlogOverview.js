/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var loggedIn= true;

    window.onload = function () {
        loadblog();
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
        localStorage.setItem("selectedBlog",-1);
    });

    $("#loginDialog").dialog({ autoOpen: false });

    $("#login").click( function () {
            $("#loginDialog").dialog('open');
            return true;
        }
    );


   
    $("#blogTable").on('click',  function (event) {
        var split_array = $(event.target).attr("id").split("_");
        var id = split_array[split_array.length-1];
        alert($(event.target).attr("id"));
        if($(event.target).attr("id").contains("deleteButton_")) {
            $("#deleteDialog").data("id", id).dialog('open');
            return false;
        } else if ($(event.target).attr("id").contains("editButton_")){
            updateBlog();
        } else if ($(event.target).attr("id").contains("title_")||$(event.target).attr("id").contains("destination_")||$(event.target).attr("id").contains("startDate_")){
            document.location.assign("TravelBlogEntry.html");
        }
        localStorage.setItem("selectedBlog",id);
    });


    $("#dialogYes").click(function (event) {
        alert("delete!");
        deleteBlog($("#deleteDialog").data("id"));
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

        function loadblog  () {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"getAllBlogs"},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    $("#blogTable tbody").empty();
                    $("#blogTable tbody").append('<tr class="child"><td>Titel</td><td >Ziel</td><td >Kurzbeschreibung</td><td>Startdatum</td><td> </td><td> </td></tr>');
                    var blogs = [];
                    alert (result);
                    var response = JSON.parse(result);
                    for (var i=0; i<response.length;i++){
                        //alert("fill table entries");
                            $("#blogTable tbody").append(
                                '<tr class="child"><td id="title_'+response[i]["id"]+'">'+ response[i]['titel']+
                                '</td><td id="destination_'+response[i]["id"]+'">'+response[i]['destination']+
                                '</td><td id="shortDescription_'+response[i]["id"]+'">'+response[i]['description']+
                                '</td><td id="startDate_'+response[i]["id"]+'">'+response[i]['startdate']+
                                /*'<tr class="child"><td id="title">'+ 'titel'+
                                '</td><td id="destination">'+'destination'+
                                '</td><td id="description">'+'description'+
                                '</td><td id="startDate">'+'startdate'+*/
                                '</td><td id="editButton">'+'<button id="editButton_'+response[i]["id"]+'"type="button" class="glyphicon glyphicon-pencil btn btn-link"></button>'+
                                '</td><td id="deleteButton">'+'<button id="deleteButton_'+response[i]["id"]+'" type="button" class="glyphicon glyphicon-trash btn btn-link" ></button>'+'</td></tr>'

                            );
                    }

                }
            });
        }

    function updateBlog () {
            alert("update!");
            document.location.assign("TravelRegistration.html");
        }

    function deleteBlog(id) {
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"deleteBlog", blogid:id},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    alert("success");
                    $("#deleteDialog").dialog('close');
                    loadblog();
                }
            });
        }





});