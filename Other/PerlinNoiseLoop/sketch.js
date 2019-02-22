const size = 5;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    noLoop();
}

function draw() {
    for (let x = 0; x < width; x += size) {
        for (let y = 0; y < height; y += size) {
            fill(map(noise(x, y), 0, 1, 0, 255));
            rect(x, y, size, size);
        }
    }
}