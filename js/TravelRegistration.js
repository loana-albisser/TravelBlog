
/**
 * Created by Loana on 21.04.2016.
 */

$(document).ready(function(){

    $.blogPOST = function(action,data,callback){
        $.post('php/ajax.php?action='+action,data,callback,'json');
    }

    $.blogGET = function(action,data,callback){
        $.get('php/ajax.php?action='+action,data,callback,'json');
    }

    $("#continue").click(function() {
        blogReg.saveBlog();
        document.location.href = "TravelEntryRegistration.html";

    });
});

    var blogReg = {
        saveBlog: function () {
            var title = $("#title").val();
            var date = $("#date").val();
            var duration = $("#duration").val();
            var description = $("#shortDescription").val();
            tblog = new tblog();
            $.blogPOST('insertBlog',tblog, function () {

         });
    /*var dbAdapter = new $dbAdapter();
     var tblog = new tblog();
     $.ajax({
     url: 'php/dbAdapter.php?function=insertBlog',
     type: 'post',
     data: { "insertBlog": "1"},
     success: function(response) { console.log(response); }
     });
     //alert(title);
     var xhttp;
     xhttp = new XMLHttpRequest();
     if (xhttp.readyState == 4 && xhttp.status == 200){

     }
     xhttp.open("GET","tblog.php",true);
     xhttp.send();*/
}
    }
    


