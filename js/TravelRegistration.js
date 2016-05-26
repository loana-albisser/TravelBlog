
/**
 * Created by Loana on 21.04.2016.
 */

$(document).ready(function(){

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
            if(result.toString()=="false"){
                alert("Du musst eingeloggt sein");
               // document.location.assign("TravelBlogOverview.html");
            }



        }
    });

    window.onload = function () {
        var segment_str = document.referrer;
        var segment_array = segment_str.split( '/' );
        var last_segment = segment_array[segment_array.length - 1];
        alert(last_segment);
        if (localStorage.getItem("selectedBlog")!=-1){
            blogReg.insertBlogValues(localStorage.getItem("selectedBlog"));
            alert(localStorage.getItem("selectedBlog"));
            $("#continue").hide();
            $("#updateBlog").show();
        } else {
            $("#continue").show();
            $("#updateBlog").hide();
        }
    };

    $("#continue").click(function() {
        blogReg.saveBlog();
    });

    $("#updateBlog").click(function() {
       blogReg.updateBlog(localStorage.getItem("selectedBlog"));
    });

    var blogReg = {
        saveBlog: function () {
            //alert($("#titleBlogRegistration").val()+$("#shortBlogDescription").val()+$("#blogdestination").val()+$("#blogStartdate").val());
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"insertBlog",title:$("#titleBlogRegistration").val(),description:$("#shortBlogDescription").val(),destination:$("#blogdestination").val(),startdate:$("#blogStartdate").val()},
                error: function (jqXHR, exception) {
                    alert("Error");
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
                    var response = JSON.parse(result);
                    localStorage.setItem("registeredBlog",response);
                    alert(response);
                    //alert(saved);
                    document.location.assign("TravelEntryRegistration.html");
                }
             });
        },

        updateBlog: function(id){
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"updateBlog", blogid:id,title:$("#titleBlogRegistration").val(),description:$("#shortBlogDescription").val(),destination:$("#blogdestination").val(),startdate:$("#blogStartdate").val()},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    alert("updated Blog: "+ localStorage.getItem("selectedBlog"));
                    document.location.assign("TravelBlogOverview.html");

                }
            });
        },

        insertBlogValues: function(id){
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"getBlogById", blogId:id},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    var response = JSON.parse(result);
                    alert(result);
                    $("#titleBlogRegistration").val(response['titel']);
                    $("#shortBlogDescription").val(response['description']);
                    $("#blogdestination").val(response['destination']);
                    $("#blogStartdate").val(response['startdate'])

                }
            });
        }
    }
});