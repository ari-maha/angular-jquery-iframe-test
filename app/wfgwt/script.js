(function(){

    $("#contentOfOption4").hide();      

    //Declare variables and functions
    var idHolder = {
        "3" : $("#contentOfOption3"),
        "4" : $("#contentOfOption4")
    }

    var clickHandler = function(evt) {
        var currentElement = $(evt.currentTarget),
            currentTabIndex = currentElement.attr("data-tabindex");

        if ( currentTabIndex === "1" || currentTabIndex === "2") {
            window.parent.postMessage("angular:"+currentTabIndex, "http://localhost:8000");
            return;
        }
        
        if (currentElement.hasClass("active")) {
            //Do nothing
            return;
        }

        $("#tabOptions > li").each(function(){
            $(this).removeClass("active");
        });

        currentElement.addClass("active");

        for (var tabIndexVal in idHolder) {
            if (idHolder.hasOwnProperty(tabIndexVal)) {
                if (currentTabIndex === tabIndexVal) {
                    idHolder[tabIndexVal].show();
                }
                else {
                    idHolder[tabIndexVal].hide();
                }
            }
        }
    }

    var windowMessageHandler = function(evt) {
        console.log("Message recieved for gwt : ");
        console.log(evt);
        $('#tabOptions > [data-tabindex="'+evt.originalEvent.data+'"]').click();
    }

    $(window).on("message onmessage", windowMessageHandler);

    $("#tabOptions > li").on("click", clickHandler)

}());