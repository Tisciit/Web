class Point {

    constructor(x, y, size) {
        this.size = size;
        this.position;
        this.velocity;
        this.acceleration;
        this.alive = true;
        this.brain = new Brain();
    }

    move() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    }

    checkCollision(obstacles) {
        for (let o of obstacles) {
            if (o.p1.x <= this.position.x &&
                o.p2.x >= this.position.x &&
                o.p1.y <= this.position.y &&
                o.p2.y >= this.position.y) {
                return true;
            }
        }
        return false;
    }

    update() {
        if (this.alive) {
            this.move();
            this.alive = !this.checkCollision();
        }
    }

}

class Brain {

}

class Generation {

}

class Obstacle {
    constructor(c, x1, y1, x2, y2) {
        this.color = c;
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
    }
}