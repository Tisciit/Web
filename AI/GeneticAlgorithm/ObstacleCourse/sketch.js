let generation;
let obstacles = [];
let target;
let skip = 10;
let mutationRate = .1;

function setup() {
    const OBSTACLESIZE = 10;
    createCanvas(1000, 600);
    background(52);
    const c = color(200);
    generation = new Generation(200, width * .1, height / 2, 5);

    obstacles.push(new Obstacle(c, 0, 0, width, OBSTACLESIZE));
    obstacles.push(new Obstacle(c, 0, 0, OBSTACLESIZE, height));
    obstacles.push(new Obstacle(c, 0, height - OBSTACLESIZE, width, height));
    obstacles.push(new Obstacle(c, width - OBSTACLESIZE, 0, width, height));

    target = new Target(color(255, 0, 0), createVector(width * .9, height / 2), 10);

}

function draw() {

    for (let i = 0; i < skip; i++) {
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
            generation.getNewGeneration(mutationRate);
        }
    }
}