let generation;
let obstacles = [];
let target;

let LOG = false;

function setup() {
    const OBSTACLESIZE = 30;
    createCanvas(400, 600);
    background(52);

    obstacles.push(new Obstacle(color(200), 0, 0, OBSTACLESIZE, height));
    obstacles.push(new Obstacle(color(200), width - OBSTACLESIZE, 0, width, height));

    obstacles.push(new Obstacle(color(200), 0, 0, width, OBSTACLESIZE));
    obstacles.push(new Obstacle(color(200), 0, height - OBSTACLESIZE, width, height));

    obstacles.push(new Obstacle(color(200), 0, height / 2, width * .75, height / 2 + OBSTACLESIZE));

    generation = new Generation(200);

    target = new Target(color(255, 0, 0), createVector(width / 2, height * .2), 20);
}

function draw() {
    background(52);

    target.draw();
    for (let o of obstacles) {
        o.draw();
    }
    text("Gen: " + generation.gen, 10, 10);
    generation.draw();
    generation.update(obstacles, target);

    if (!generation.checkAlive()) {
        generation.fitness(target);
        generation.getNewGeneration(.01, width / 2, height * .8, 10)
    }
}