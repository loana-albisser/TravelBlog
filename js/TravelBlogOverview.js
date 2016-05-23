/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var loggedIn= true;

    $("#editButton").click(function () {
        document.location.href = "TravelRegistration.html"
        updateBlog();
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
        deleteBlog();
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

   
    function loadBlogs() {
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
        var xhttp;
        //var dbAdapter = new dbAdapter();
        xhttp = new XMLHttpRequest();
        if (xhttp.readyState == 4 && xhttp.status == 200){

        }
        xhttp.open("GET","tblogEntry.php",true);
        xhttp.send();
        //var tblog = new tblog();
        
    }
        
    function deleteBlog() {
        
    };
    
    function updateBlog(){
        
    };



});