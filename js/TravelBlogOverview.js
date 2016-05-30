/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var loggedIn=false;




    window.onload = function () {
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
                //alert("auth");
                loggedIn = result;
                setLoggedInStatus();
                loadblog();
            }
        });


    };


    $("#deleteDialog").dialog({
        autoOpen: false
    });

    $("#deleteButton").click(
        function () {
            if(loggedIn) {
                $("#deleteDialog").dialog('open');
            }else{
                alert("Sie müssen eingeloggt sein!");
            }
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

    $("#logout").click( function () {
        $.ajax({
            type: 'post',
            url: '../php/ajax.php',
            data: {id:"logout"},
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
                loggedIn = false;
                setLoggedInStatus();
            }
        });
    });

    $("#loginOk").click(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'post',
            url: '../php/ajax.php',
            data: {id:"login",username:$("#username").val(),pw:$.md5($("#password").val()),reqgroup:-1},
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
                loggedIn = result;
                setLoggedInStatus();
            }
        });
    });
   
    $("#blogTable").on('click',  function (event) {
        if(loggedIn) {
            var split_array = $(event.target).attr("id").split("_");
            var id = split_array[split_array.length - 1];
            if ($(event.target).attr("id").contains("deleteButton_")) {
                $("#deleteDialog").data("id", id).dialog('open');
                return false;
            } else if ($(event.target).attr("id").contains("editButton_")) {
                updateBlog();
            } else if ($(event.target).attr("id").contains("title_") || $(event.target).attr("id").contains("destination_") || $(event.target).attr("id").contains("startDate_")) {
                document.location.assign("TravelBlogEntry.html");
            }
            localStorage.setItem("selectedBlog", id);
        }else{
            alert("Sie müssen eingeloggt sein!");
        }
    });


    $("#dialogYes").click(function (event) {
        deleteBlog($("#deleteDialog").data("id"));
    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    });

    function setLoggedInStatus(){
        //alert(loggedIn);
        if (loggedIn==true){
            $("#logout").show();
            $("#login").hide();

        } else {
            $("#logout").hide();
            $("#login").show();
        }

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
                    $("#deleteDialog").dialog('close');
                    loadblog();
                }
            });
        }





});