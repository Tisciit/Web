class Point {

    constructor(x, y, size) {
        this.size = size;
        this.position = createVector(x, y);
        this.velocity = createVector();;
        this.acceleration = createVector();
        this.alive = true;
        this.brain = new Brain(400);
    }


    draw() {
        ellipse(this.position.x, this.position.y, this.size);
    }

    move() {
        this.acceleration = this.brain.getNext();
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    }

    checkCollision(obstacles) {
        if (obstacles) {
            for (let o of obstacles) {
                if (o.p1.x <= this.position.x &&
                    o.p2.x >= this.position.x &&
                    o.p1.y <= this.position.y &&
                    o.p2.y >= this.position.y) {
                    return true;
                }
            }
        }
        return false;
    }

    update(obstacles) {
        if (this.alive) {
            this.move();
            this.alive = !this.checkCollision(obstacles);

            if (!this.alive) {
                console.log("im ded");
                this.velocity = createVector();
                this.acceleration = createVector();
            }
        }
    }

}

class Brain {
    constructor(instructions) {
        this.instructions = [];
        this.step = 0;

        for (let i = 0; i < instructions; i++) {
            this.instructions[i] = p5.Vector.random2D();
        }
    }

    getNext() {
        if (this.step == this.instructions.length) {
            return createVector(0, 0);
        }
        let ret = this.instructions[this.step];
        this.step++;
        return ret;
    }
}

class Generation {
    constructor(members) {
        this.points = [];

        for (let i = 0; i < members; i++) {
            this.points.push(new Point(width / 2, height * .8, 10));
        }
    }

    draw() {
        for(let p of this.points){
            p.draw();
        }
    }

    update(obstacles) {
        for (let p of this.points) {
            p.update(obstacles);
        }
    }
}

class Obstacle {
    constructor(c, x1, y1, x2, y2) {
        this.color = c;
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
    }

    draw() {
        push();
        rectMode(CORNERS);
        fill(this.color);
        rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        pop();
    }
}