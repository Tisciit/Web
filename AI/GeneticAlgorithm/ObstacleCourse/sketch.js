let generation;
let obstacles = [];
let target;
let skip = 1;
let mutationRate = .01;

function setup() {
    createCanvas(1000, 400);
    background(52);
    generation = new Generation(200, width * .1, height / 2, 5);
    createObstacles();


    target = new Target(color(255, 0, 0), createVector(width * .9, height / 2), 10);

}

function draw() {

    for (let i = 0; i < skip; i++) {
        background(52);

        target.draw();
        for (let o of obstacles) {
            o.draw();
            o.move();
            o.checkCollision(obstacles);
        }

        text("Gen: " + generation.gen, 10, 10);
        generation.draw();
        generation.update(obstacles, target);

        if (!generation.checkAlive()) {
            generation.fitness(target);
            generation.getNewGeneration(mutationRate);

            createObstacles();
        }
    }
}

function createObstacles() {
    obstacles = [];

    const OBSTACLESIZE = 10;
    const c = color(200);
    //Outter box
    obstacles.push(new Obstacle(c, 0, 0, width, OBSTACLESIZE, "", 0));
    obstacles.push(new Obstacle(c, 0, 0, OBSTACLESIZE, height, "", 0));
    obstacles.push(new Obstacle(c, 0, height - OBSTACLESIZE, width, height, "", 0));
    obstacles.push(new Obstacle(c, width - OBSTACLESIZE, 0, width, height, "", 0));

    //
    obstacles.push(new Obstacle(c, width * .2, 300, width * .2 + OBSTACLESIZE, 340, "d", 5));
    obstacles.push(new Obstacle(c, width * .4, 200, width * .4 + OBSTACLESIZE, 240, "d", 5));
    obstacles.push(new Obstacle(c, width * .6, 100, width * .6 + OBSTACLESIZE, 140, "d", 5));
    obstacles.push(new Obstacle(c, width * .8, 300, width * .8 + OBSTACLESIZE, 340, "d", 5));
    obstacles.push(new Obstacle(c, width * .7, 100, width * .7 + OBSTACLESIZE, 140, "r", 5));
    obstacles.push(new Obstacle(c, width * .9, 300, width * .9 + OBSTACLESIZE, 340, "r", 5));
    obstacles.push(new Obstacle(c, width * .7, 200, width * .7 + OBSTACLESIZE, 340, "r", 5));
    obstacles.push(new Obstacle(c, width * .9, 50, width * .9 + OBSTACLESIZE, 100, "r", 5));
}