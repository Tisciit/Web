let generation;
let obstacles = [];

function setup() {
    const OBSTACLESIZE = 30;
    createCanvas(400, 600);
    background(52);

    obstacles.push(new Obstacle(color(200), 0, 0, OBSTACLESIZE, height));
    obstacles.push(new Obstacle(color(200), width - OBSTACLESIZE, 0, width, height));

    obstacles.push(new Obstacle(color(200), 0, 0, width, OBSTACLESIZE));
    obstacles.push(new Obstacle(color(200), 0, height - OBSTACLESIZE, width, height));

    generation = new Generation(20);
}

function draw() {
    background(52);
    for (let o of obstacles) {
        o.draw();
    }
    generation.draw();
    generation.update(obstacles);
}