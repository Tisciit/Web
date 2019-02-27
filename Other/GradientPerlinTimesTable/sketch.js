let numberOfPoints = 3;
let radius = 200;
let connectBy = 0;
let noiseAngle = 0;

function setup() {
    createCanvas(800, 800);
    background(0);
    radius = width / 2 - 30

    noFill();
    frameRate(20);
}

function draw() {
    translate(width / 2, height / 2);

    background(20, 200);

    //Outter Ring
    stroke(200);
    ellipse(0, 0, radius * 2);

    //Draw Point riding the outter ring
    strokeWeight(10);
    let p = new p5.Vector(radius * cos(noiseAngle), radius * sin(noiseAngle));
    point(p.x, p.y);

    //Do perlin noise smooth transitions
    let n = noise(cos(noiseAngle), sin(noiseAngle));
    numberOfPoints = mapNoiseValue(n, numberOfPoints, 100, 1000);
    connectBy += .001;

    //draw gradient lines for each connection
    strokeWeight(1);

    for (let i = 0; i < numberOfPoints; i++) {
        //define colors
        let c1 = color(125, 249, 255, 140);
        let c2 = color(207, 16, 32, 140);

        //find points
        let p1 = getPoint(i, radius, noiseAngle);
        let p2 = getPoint(i * connectBy, radius, noiseAngle);

        //draw Points
        p1.gradientLineTo(p2.x, p2.y, c1, c2, 4);
    }


    //increment the angle in perlin noise space
    noiseAngle += radians(1);
    if (noiseAngle >= TWO_PI) {
        noiseAngle = 0;
    }

}

p5.Vector.prototype.gradientLineTo = function (targetX, targetY, color1, color2, slices = 5) {
    gradientLine(this.x, this.y, targetX, targetY, color1, color2, slices);
}

p5.prototype.gradientLine = function (x1, y1, x2, y2, color1, color2, slices = 5) {

    push();
    const lengthOfSlice = dist(x1, y1, x2, y2) / slices;
    const angle = atan2(y2 - y1, x2 - x1);
    //const moveVector = createVector(x1, y1);

    //do once for each slice of the gradient line
    for (let i = 0; i < slices; i++) {
        const inter = map(i, 0, slices, 0, 1);
        const c = lerpColor(color1, color2, inter);
        stroke(c);

        line(x1,
            y1,
            x1 += lengthOfSlice * cos(angle),
            y1 += lengthOfSlice * sin(angle));
    }
    pop();
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

function getPoint(index, radius, phase) {
    let angle = TWO_PI / numberOfPoints * (index % numberOfPoints) + PI / 2 + phase;
    let x = radius * cos(angle);
    let y = radius * sin(angle);

    return new p5.Vector(x, y);
}