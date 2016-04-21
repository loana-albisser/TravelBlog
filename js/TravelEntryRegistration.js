/**
 * Created by Loana on 21.04.2016.
 */
$(document).ready(function(){

    $(function () {
        $("#saveDialog").dialog({
            autoOpen: false,
        });
        $("#save").click(function () {
            $("#saveDialog").dialog("open");
        })

    })



});