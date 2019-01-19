class Boid {

    constructor() {
        this.position = createVector(random(height), random(width));
        this.velocity = p5.Vector.random2D();
        this.acceleration = createVector();

        this.perceptionRange = Math.floor((Math.random() + 1) * 150);
        this.maxSpeed = Math.floor((Math.random() + 1) * .5)

        this.velocity.setMag(2)
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration = createVector();
    }

    updateFlockBehaviour(position, velocity, acceleration) {
        position.sub(this.position);
        acceleration.sub(this.acceleration);

        let desire = position;
        desire.sub(acceleration);
        //this.position.add(position);
        this.acceleration.add(desire);
        this.acceleration.limit(this.maxSpeed);
    }

    show() {
        point(this.position.x, this.position.y);
        //this.showPerception();
    }

    edges() {
        if (this.position.x >= width) {
            this.position.x = 0;
        } else if (this.position.x <= 0) {
            this.position.x = width;
        } else if (this.position.y >= height) {
            this.position.y = 0;
        } else if (this.position.y <= 0) {
            this.position.y = height;
        }
    }

    showPerception() {
        push();
        noFill();
        strokeWeight(1);
        stroke(255);
        ellipse(this.position.x, this.position.y, this.perceptionRange);
        pop();
    }

    getAverages(boids) {

        let count = 0;
        let position = new createVector();
        let velocity = new createVector();
        let acceleration = new createVector();

        for (let b of boids) {
            if (b != this) {
                //get distance to b
                let distance = dist(
                    b.position.x,
                    this.position.x,
                    b.position.y,
                    this.position.y);
                //Check if b is in perceptionrange
                if (distance < this.perceptionRange) {

                    count++;
                    //Average Position
                    position.add(b.position);
                    //Average Velocity
                    velocity.add(b.velocity);
                    //Avearage Acceleration
                    acceleration.add(b.acceleration);
                }

            }
        }

        if (count > 0) {
            position.div(count);
            velocity.div(count);
            acceleration.div(count);
        }

        return {
            Position: position,
            Velocity: velocity,
            Acceleration: acceleration,
        }
    }
}