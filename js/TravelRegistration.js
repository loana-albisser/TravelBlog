
/**
 * Created by Loana on 21.04.2016.
 */

$(document).ready(function(){

    

    $("#continue").click(function() {
        //alert("test");
        blogReg.saveBlog();
        document.location.href = "TravelEntryRegistration.html";

    });

    var blogReg = {
        saveBlog: function () {
             /*setTimeout(function () {
                 $.ajax({
                 type: 'post',
                 url: 'php/ajax.php',
                 async: true,
                 data: {id:"insertBlog",title:$("#title").val(),description:$("#shortDescription").val(),destination:$("#destination"),startdate:$("#startdate").val()},
                 error: function(xhr) {
                    alert("An error occured: " + xhr.status + " " + xhr.statusText);
                }
             });
             }, 10); *//// You may need to adjust this to a longer delay.
            $.ajax({
                type: 'post',
                url: 'php/ajax.php',
                data: {id:"insertBlog",title:$("#title").val(),description:$("#shortDescription").val(),destination:$("#destination"),startdate:$("#startdate").val()},
                error: function() {
                    alert("An error occured");
                },
                success:function () {
                    alert("saved!")
                }


             });
        }
    }
});

    

    /*function blogPOST(action,data,callback){
        $.post('php/ajax.php?action='+action,data,callback,'json');
    }
    
    function blogGET(action,data,callback){
        $.get('php/ajax.php?action='+action,data,callback,'json');
    }*/


