$(document).ready(function(){
    var data = [
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
/*        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/233"
        },
        {
            "type":"image",
            "source":"http://placekitten.com/310"
        },*/
    ]

    function makeoffsets() {
        for (var i = 0; i < data.length; i++) {
            var container = $("<article>");
            if (data[i].type === "image") {
                var content = $("<img>").attr({
                    src: data[i].source
                })
            }

            $("#space").append(container.append(content));
        }
    }

    for (var i = 0; i < data.length; i++) {
    }
    makeoffsets();
    drag();
})

function drag() {
    var dragging, draggedItem;    
    var item = $("article");

    $(item).mousedown(function(event){
        dragging = true;
        draggedItem = $(this);
        event.preventDefault();
    })

    $(document).mousemove(function(event){
        if (dragging) {
            var offset = $(item).offset();
            $(draggedItem).offset({
                top:  event.pageY,
                left: event.pageX
            })
        }
    })

    $(document).mouseup(function(){
        dragging = false;
        snap(draggedItem);
    })
}

function snap(item) {
    isSnapLegal(item);
}

function isSnapLegal(item) {
    var d    = item.position(),
        allD = [];
    $("article").not(item).each(function(){
        allD.push($(this));
    })
    //find top left bottom right cx cy of present objects
    for (i in allD) {
        // console.log(allD[0]);
        comparePos(item.position().top,  allD[i].position().top, "top", 0);
        comparePos(item.position().left, allD[i].position().left, "left", 0);
        comparePos((item.position().top + item.outerHeight(true)), (allD[i].position().top + allD[i].outerHeight(true)), "top", item, item.outerHeight(true));
        comparePos((item.position().left + item.outerWidth(true)), (allD[i].position().left + allD[i].outerWidth(true)), "left", item, item.outerWidth(true));
        comparePos(item.position().top,  (allD[i].position().top + allD[i].outerHeight(true)), "top",   item, 0);
        comparePos(item.position().left, (allD[i].position().left + allD[i].outerWidth(true)), "left", item, 0);
        comparePos((item.position().top + item.outerHeight(true)), allD[i].position().top, "top", item, item.outerHeight());
        comparePos((item.position().left + item.outerWidth(true)), allD[i].position().left, "left", item, item.outerWidth());
    }
}

function comparePos(a, b, side, item, value) {
    var snapThreshold = 24;
    // console.log(a, b);
    //compare distances, if distance < x, snap
    if (Math.abs(a-b) < snapThreshold) {
        snapAction((b - value), side, item);
    }
}

function snapAction(a, side, item) {
    //changes top or left or both of selected object
    //console.log(side, item.position()[side]);
    item.css(side, a);
    //console.log(item.css(side));
}

function pan() {
    //on mousedown trigger isPanning.  Take x and y of mousedown
    //wherever mouse x and y go to, add or subtract to all objects in array
    //on mouseup trigger isPanning
}