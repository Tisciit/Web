class MatrixText {

    constructor(char, size, x, y, speed) {
        this.char = char;
        this.size = size;
        this.x = x;
        this.y = y;
        this.speed = floor(speed * 2);
        this.highlighted = false;
    }

    draw() {
        if (this.highlighted) {
            push();
            fill(255, 0, 0);
            noStroke();
        }
        text(this.char, this.x, this.y);

        if (this.highlighted) {
            pop();
        }
    }

    moveDown() {
        this.y += this.size + this.speed;
    }

    offScreen() {
        return this.y > windowHeight;
    }

    highlight() {
        this.highlighted = true;
    }
}