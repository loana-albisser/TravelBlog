
/**
 * Created by Loana on 21.04.2016.
 */

$(document).ready(function(){    

    $("#continue").click(function() {
        blogReg.saveBlog();
    });

    var blogReg = {
        saveBlog: function () {
            alert($("#titleBlogRegistration").val()+$("#shortDescription").val()+$("#destination").val()+$("#startdate").val());
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"insertBlog",title:$("#titleBlogRegistration").val(),description:$("#shortDescription").val(),destination:$("#destination").val(),startdate:$("#startdate").val()},
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
                    document.location.assign("TravelEntryRegistration.html");

                }


             });
        }
    }
});



