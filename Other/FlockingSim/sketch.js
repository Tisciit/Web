let flock = [];

function setup() {

    createCanvas(1300, 1300);
    background(55);

    stroke(255);
    strokeWeight(18);

    for(let i = 0; i < 100; i++){
        flock.push(new Boid());
    }
}

function draw() {

    background(55);

    for(let boid of flock){
        let avgs = boid.getAverages(flock);
        //console.log(avgs);
        boid.updateFlockBehaviour(avgs.Position, avgs.Velocity, avgs.Acceleration);
        boid.update();
        boid.edges();
        boid.show();
    }
}