let phase = 0;
let rMin = 100;
let rMax = 200;
let pRad = 0;

let radius = [
    [200, 250],
    [100, 200],
];
let mic;

function setup() {

    mic = new p5.AudioIn();

    createCanvas(600, 600);
    background(52);
    noFill();

    mic.start();
}

function draw() {
    translate(width / 2, height / 2);
    stroke(125, 249, 255);
    strokeWeight(2);
    background(52, 25);

    let noiseMax = mic.getLevel() * 100;
    //noiseSeed();

    for (let rad of radius) {
        beginShape()

        for (let a = 0; a < TWO_PI; a += .1) {
            let xOff = map(cos(a + phase), -1, 1, 0, noiseMax);
            let yOff = map(sin(a + phase), -1, 1, 0, noiseMax);
            let r = map(noise(xOff, yOff), 0, 1, rad[0], rad[1]);
            let x = r * cos(a);
            let y = r * sin(a);
            vertex(x, y);
        }
        endShape(CLOSE)

        let xOff = map(cos(pRad + phase), -1, 1, 0, noiseMax);
        let yOff = map(sin(pRad + phase), -1, 1, 0, noiseMax);
        let r = map(noise(xOff, yOff), 0, 1, 250, 300);
        let x = r * cos(pRad);
        let y = r * sin(pRad);
        point(x, y);
        pRad += .001;
    }

    phase += .001;
}