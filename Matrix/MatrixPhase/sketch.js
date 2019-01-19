// let allowedchars = "♥";
let columns = [];
const size = 18;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(size);

    const cols = windowWidth / size;
    // const cols = 1;

    for (let i = 0; i < cols; i++) {
        columns.push(new MatrixCol(i * size, size));
    }

    frameRate(30);

    background(30);
}

function draw() {

    background(color(20, 50));
    noStroke();
    fill(0, 143, 17);
    for (let c of columns) {
        c.update();
        c.draw();
    }

    push();

    let x = width * .99;
    let y = height * .03;
    fill(20);
    rectMode(CENTER);
    rect(x, y, 50, 80);    
    pop();

    //doFPSStuff();
}

let fps = [];

function doFPSStuff() {
    let x = width * .99;
    let y = height * .03;
    push();
    fill(255);
    textSize(20);
    textAlign(CENTER);
    let curFPS = frameRate();
    fps.push(curFPS);
    text(round(curFPS, 2), x, y);
    let sum = getSum(fps);
    let avg = sum / fps.length;
    text(round(avg, 2), x, y + 20);

    pop();

    if (curFPS.length > 10000) {
        curFPS.splice(0, 1);
    }
}

function getSum(arr) {
    let sum = 0;
    for (let m of arr) {
        sum += m;
    }
    return sum;
}

function mousePressed() {
    fullscreen(!fullscreen());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}