let objects = [];
const amount_objects = 10;
const scaleUp = 500;
let calcPerDraw = 1;

function setup() {
    createCanvas(windowWidth, windowHeight - 5);

    let objectWidth = Math.floor(windowWidth / (2 * (amount_objects + 1)));
    let x = objectWidth;

    //Distance to left and right side of screen, Offset first "x" to half the 
    let offSet = windowWidth / (2 * (amount_objects + 1)) - objectWidth;
    offSet *= amount_objects;
    x += offSet;

    for (let i = 0; i < amount_objects; i++) {
        objects[i] = new SortingObject(Math.random());
        objects[i].x = x;
        x += 2 * objectWidth;
        objects[i].width = objectWidth;
    }

    frameRate(60);
    
}

function draw() {

    for (let i = 0; i < calcPerDraw; i++) {
        background(55);
        fill(255);
        for (let o of objects) {
            rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
        }

        //Bogo

        //Fill with red color
        fill(color(255, 0, 0));
        // o is the element at the current index, k is the next one. Firstly, we draw them red
        let oIndex = floor(random(0, objects.length));
        let o = objects[oIndex];
        rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
        let kIndex = floor(random(0, objects.length));
        let k = objects[kIndex];
        rect(k.x, windowHeight * .25, k.width, k.value * scaleUp);

        objects.splice(oIndex, 1, k);
        objects.splice(kIndex, 1, o);

        let kx = k.x;
        k.x = o.x;
        o.x = kx;
    }

    if (checkSorted()) {
        noLoop();

        background(55);
        for (let o of objects) {
            fill(255);
            rect(o.x, windowHeight * .25, o.width, o.value * scaleUp);
        }
    }

    //We increment the index, so that we check the next element the next time
}

function checkSorted() {
    for (let i = 1; i < objects.length; i++) {
        if (objects[i - 1].value > objects[i].value) {
            return false;
        }
    }
    return true;
}




NWF.FormFiller.Events.RegisterAfterReady(function () {
    NWF$("#" + jStandardDescription).change(function () {
        NWF.FormFiller.Functions.ProcessFillerControls();
    });
    NWF$("#" + jNonConf).change(function () {
        NWF.FormFiller.Functions.ProcessFillerControls();
    });
});



NWF.FormFiller.Events.RegisterAfterReady(function () {
    NWF$('.selAudits').change(function () {
        populateIDs();
    });
});

function populateIDs() {
    var selection = NWF$('.selAudits .s4-itm-cbx:checked');
    var ids = "";
    for (var i = 0; i < selection.length; i++) {
        ids = ids + selection[i].title + ",";
    }
    NWF$('#' + txtIDs).val(ids);
}

NWF.FormFiller.Events.RegisterRepeaterRowAdded(function () {
    var repeaterRow = NWF$(arguments[0][0]);
    if (NWF$(repeaterRow.parents('.nf-repeater')[0]).hasClass('vtMyRepeatingSection')) {
        NWF$(repeaterRow).find('.cssFirstField').find('input').val('wombat');
        NWF$(repeaterRow).find('.cssSecondField').find('input').val('koala');
    }
});