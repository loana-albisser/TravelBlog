/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){
    var logedIn = true;
    window.onload = function () {
        blogEntry.loadBlogEntries();
    }
    

    $("#addTravelEntry").click(function() {
        document.location.href = "TravelEntryRegistration.html";
    });

    $("#editButton").click(function () {
        blogEntry.updateBlogEntry();
        //$("#titleEntryRegistration").val("updateEntry");
    });

    $("#deleteDialog").dialog({ autoOpen: false });

    $("#deleteButton").click(function () {
            $("#deleteDialog").dialog('open');
            return true;
        }
    );

    $("#dialogYes").click(function () {
        blogEntry.deleteBlogEntry();

    });

    $("#dialogNo").click(function () {
        $("#deleteDialog").dialog('close');
    })

    if (logedIn){
        $("#editButton").show();
        $("#deleteButton").show();
        $("#addTravelEntry").show();
    } else {
        $("#editButton").hide();
        $("#deleteButton").hide();
        $("#addTravelEntry").hide();
    }

    var arrayResult;

    var blogEntry = {
        loadBlogEntries: function () {
            /*$("#title").load('../php/ajax.php',{id:"getBlogEntries", blogId:1},function(responseTxt, statusTxt, xhr){
                if(statusTxt == "success")
                    alert("External content loaded successfully!");
                    alert(responseTxt);
                    alert(responseTxt.value);
                if(statusTxt == "error")
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
            });*/

            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id: "getBlogEntries", blogId:1},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success: function (result) {
                    var response = JSON.parse(result);
                    alert(result);
                    alert(JSON.stringify(response));
                    alert(response[0]["titel"]);
                    var JSONObject = result;

                    for (var key in JSONObject) {
                        if (JSONObject.hasOwnProperty(key)) {
                           alert(JSONObject[key]["titel"]);
                        }
                    }
                    for (var i=0; i<2;i++){
                        $("#travelEntry").clone().insertAfter("#travelEntry");
                        $("#blogEntryTitle").removeAttr();
                        //$("#blogEntryTitle").html(response['titel']);
                        $("#blogEntryTitle").html('titel'+i);
                        $("#blogEntryDate").removeAttr();
                        //$("#blogEntryDate").html(response['createdate']);
                        $("#blogEntryDate").html('createdate');
                        $("#blogEntryDescription").removeAttr();
                        //$("#blogEntryDescription").html(response['description']);
                        $("#blogEntryDescription").html('description');
                    }
                }
            });

        },


        
        updateBlogEntry: function(){
            $.ajax({
                type: 'post',
                url: '../php/ajax.php',
                data: {id:"updateBlogEntry", blogEntryId:1},
                error: function (jqXHR, exception) {
                    alert(jqXHR.status);
                },
                success:function (result) {
                    //alert ("load!");
                    //alert(result.toString());
                    document.location.assign("TravelEntryRegistration.html");

                    //$("#dateEntryRegistration").val("12.12.2012");
                    //$("#descriptionEntryRegistration").val("updateEntry");
                    /*var blogEntries =[];
                    for (var i=0; i<result.blogEntries.length;i++){
                        if (result.blogEntries[i]){
                            alert(result.blogEntries[i]);
                            document.location.assign = "TravelEntryRegistration.html"
                        }
                    }*/

                }
            });
        },
        
        deleteBlogEntry: function(){
            alert("deleted");
            $.ajax({
                 type: 'post',
                 url: '../php/ajax.php',
                 data: {id:"deleteBlogEntries", blogEntryId:15},
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