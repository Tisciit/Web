let numberOfPoints = 300;
let radius = 200;
let connectBy = 80;
let noiseAngle = 0;

function setup() {
    createCanvas(800, 800);
    background(0);
    radius = width / 2 - 10

    noFill();
    frameRate(30);
}

function draw() {
    translate(width / 2, height / 2);

    background(0, 50);
    stroke(200);
    //Outter Ring
    ellipse(0, 0, radius * 2);

    //Draw Point riding the outter ring
    strokeWeight(10);
    let p = new p5.Vector(radius * cos(noiseAngle), radius * sin(noiseAngle));
    point(p.x, p.y);

    //Do perlin noise smooth transitions
    let n = noise(cos(noiseAngle), sin(noiseAngle));
    numberOfPoints = mapNoiseValue(n, numberOfPoints, 10, 200);
    connectBy = mapNoiseValue(n, connectBy, 1, 10);

    //draw gradient lines for each connection
    strokeWeight(1);

    for (let i = 0; i < numberOfPoints; i++) {

        //define colors
        let c1 = color(125, 249, 255, noise(noiseAngle) * 255);
        let c2 = color(207, 16, 32, noise(noiseAngle + 1) * 255);

        //find points
        let p1 = getPoint(i, radius);
        let p2 = getPoint(i * connectBy, radius);

        //draw Points
        gradientLine(p1, p2, c1, c2, 6);
    }


    //increment the angle in perlin noise space
    noiseAngle += radians(.5);
    if (noiseAngle >= TWO_PI) {
        noiseAngle = 0;
        //background(0);
    }

}

p5.prototype.gradientLine = function (vector1, vector2, color1, color2, slices = 5) {

    const lengthOfSlice = dist(vector1.x, vector1.y, vector2.x, vector2.y) / slices;
    const angle = atan2(vector2.y - vector1.y, vector2.x - vector1.x);

    let p0 = createVector(vector1.x, vector1.y);

    //do once for each slice of the gradient line
    for (let i = 0; i < slices; i++) {
        let inter = map(i, 0, slices, 0, 1);
        let c = lerpColor(color1, color2, inter);

        vector1.x += lengthOfSlice * cos(angle);
        vector1.y += lengthOfSlice * sin(angle);
        push();
        noFill();
        stroke(c);
        beginShape();
        vertex(p0.x, p0.y);
        vertex(vector1.x, vector1.y);
        endShape();
        pop();

        p0 = createVector(vector1.x, vector1.y);
    }
}

function mapNoiseValue(noise, value, min, max) {
    value = map(noise, 0, 1, min, max);
    if (value < min) {
        value = min
    } else if (value > max) {
        value = max
    }

    return value;
}

function getPoint(index, radius) {
    let angle = TWO_PI / numberOfPoints * (index % numberOfPoints) + PI / 2 + noiseAngle;
    let x = radius * cos(angle);
    let y = radius * sin(angle);

    return new p5.Vector(x, y);
}