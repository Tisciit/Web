let allowedchars = "!§$%&/()=?²³{[]}\"üäöÜÄÖ+#-*'_~.:,;<>|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123465789";
// let allowedchars = "♥";
let chars = [];
let cols = 0;

const size = 20;
const spawnProb = .03;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(size);

    cols = windowWidth / size;

    // for (let i = 0; i < cols; i++) {
    //     let r = floor(random(allowedchars.length - 1));
    //     chars.push(new MatrixText(allowedchars[r], size, i * size, 0, 1));
    // }

    frameRate(20);
}

function draw() {

    background(color(55, 55, 55, 100));

    for (let i = chars.length - 1; i >= 0; i--) {
        fill(color(0, 143, 17));
        let c = chars[i];
        c.draw();
        c.moveDown();

        if (c.offScreen()) {
            chars.splice(i, 1);
        }
    }


    for (let i = 0; i < cols; i++) {
        if (Math.random() < spawnProb) {
            let r = floor(random(allowedchars.length - 1));
            chars.push(new MatrixText(allowedchars[r], size, i * size, 0, random()));
        }
    }
}

function mousePressed(){
    fullscreen(!fullscreen());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}