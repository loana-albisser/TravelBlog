
/**
 * Created by Loana on 21.04.2016.
 */

$(document).ready(function(){

    

    $("#continue").click(function() {
        //alert("test");
        blogReg.saveBlog();
        //document.location.href = "TravelEntryRegistration.html";

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
            alert($("#title").val()+$("#shortDescription").val()+$("#destination").val()+$("#startdate").val());
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"insertBlog",title:$("#title").val(),description:$("#shortDescription").val(),destination:$("#destination").val(),startdate:$("#startdate").val()},
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
                    alert(result.toString());

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


