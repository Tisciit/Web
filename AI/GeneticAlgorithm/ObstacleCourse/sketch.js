let generation;
let obstacles = [];
let target;
let skip = 1;
let mutationRate = .1;

function setup() {
    const OBSTACLESIZE = 10;
    createCanvas(1000, 600);
    background(52);
    const c = color(200);
    generation = new Generation(200, width * .1, height / 2, 5);

    //Outter box
    obstacles.push(new Obstacle(c, 0, 0, width, OBSTACLESIZE, "", 0));
    obstacles.push(new Obstacle(c, 0, 0, OBSTACLESIZE, height, "", 0));
    obstacles.push(new Obstacle(c, 0, height - OBSTACLESIZE, width, height, "", 0));
    obstacles.push(new Obstacle(c, width - OBSTACLESIZE, 0, width, height, "", 0));

    //
    obstacles.push(new Obstacle(c, width * .2, 300, width * .2 + OBSTACLESIZE, 340, "d", 1));

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


            for (let o of obstacles) {
                o.reset();
            }
        }
    }
}