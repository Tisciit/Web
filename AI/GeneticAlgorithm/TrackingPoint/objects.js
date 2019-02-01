class Point {

    constructor(x, y, size, brain) {
        this.size = size;
        this.position = createVector(x, y);
        this.velocity = createVector();;
        this.acceleration = createVector();
        this.alive = true;
        this.targetReached = false;
        if (brain) {
            this.brain = brain;
            this.brain.step = 0;
        } else {
            this.brain = new Brain(400);
        }
    }


    draw() {
        ellipse(this.position.x, this.position.y, this.size);
    }

    move(acc) {
        this.acceleration = acc;
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

    checkTargetReached(target) {
        let d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
        if (d <= target.size / 2) {
            this.alive = false;
            this.targetReached = true;
            this.velocity = createVector();
            this.acceleration = createVector();
        }
    }

    update(obstacles, target) {
        if (this.alive) {
            let newAcc = this.brain.getNext();
            if (newAcc.x != 0 && newAcc.y != 0) {
                this.move(newAcc);
                this.alive = !this.checkCollision(obstacles);
            } else {
                this.alive = false;
            }
            if (!this.alive) {
                this.velocity = createVector();
                this.acceleration = createVector();
            } else {
                this.checkTargetReached(target);
            }
        }
    }

    calculateFitness(target) {
        if (this.targetReached) {
            return 1 / 10 + 100 / (Math.pow(this.brain.step, 2));
        } else {
            return 1 / Math.pow(dist(this.position.x, this.position.y, target.position.x, target.position.y), 2);
        }
    }

}

class Brain {
    constructor(numinstructions, givenInstructions) {
        this.instructions = [];
        for (let i = 0; i < numinstructions; i++) {
            this.instructions[i] = givenInstructions ? givenInstructions[i] : "";
        }
        this.step = 0;

        if (!givenInstructions) {
            this.mutate(1);
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

    mutate(rate) {
        for (let i = 0; i < this.instructions.length; i++) {
            if (Math.random() < rate) {
                this.instructions[i] = p5.Vector.random2D();
            }
        }
        this.step = 0;
    }

    copy() {
        return new Brain(this.instructions.length, this.instructions);
    }
}

class Generation {
    constructor(members, x, y, size) {
        this.points = [];
        this.gen = 1;

        for (let i = 0; i < members; i++) {
            this.points.push(new Point(x, y, size));
        }
    }

    draw() {
        for (let p of this.points) {
            p.draw();
        }
    }

    update(obstacles, target) {
        for (let p of this.points) {
            p.update(obstacles, target);
        }
    }

    fitness(target) {
        let fitnessObject = {};
        let sum = 0;
        for (let p of this.points) {
            let fit = p.calculateFitness(target);
            p.fitnessRAW = fit;
            sum += fit;
        }
        for (let p of this.points) {
            p.fitness = (p.fitnessRAW / sum);
        }

        let rangeStart = 0;
        for (let i = 0; i < this.points.length; i++) {
            let range = this.points[i].fitness;
            fitnessObject[i] = {
                rangeStart: rangeStart,
                rangeEnd: rangeStart += range,
            };
        }

        this.fitnessObject = fitnessObject;
    }

    checkAlive() {
        for (let p of this.points) {
            if (p.alive) {
                return true;
            }
        }
        return false;
    }

    getNewGeneration(mutateRate, startX, startY, size) {
        let genZ = [];
        for (let i = 0; i < this.points.length; i++) {
            //console.log(i);

            let rnd = Math.random();
            let n = 0;
            for (n = 0; n < this.points.length; n++) {
                if (rnd <= this.fitnessObject[n].rangeEnd) {
                    //console.log(n);
                    break; //n is now index of point to copy
                }
            }

            let newBrain = this.points[n].brain.copy();

            genZ.push(new Point(startX, startY, size, newBrain));
            //console.log(genZ);
            genZ[genZ.length - 1].brain.mutate(mutateRate);
        }
        this.points = genZ;
        this.gen++;
    }
}

class Obstacle {
    constructor(c, x1, y1, x2, y2, type) {
        this.color = c;
        this.p1 = createVector(x1, y1);
        this.p2 = createVector(x2, y2);
    }

    draw() {
        push();
        noStroke();
        rectMode(CORNERS);
        fill(this.color);
        rect(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        pop();
    }
}

class Target {
    constructor(c, v, size) {
        this.color = c;
        this.position = v;
        this.size = size;
    }

    draw() {
        push();

        fill(this.color);
        ellipse(this.position.x, this.position.y, this.size);
        pop();
    }
}