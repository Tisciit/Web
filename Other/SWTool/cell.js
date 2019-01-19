class Cell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = [true, true, true, true];
        this.available = true;
    }

    static getIndex(x, y) {
        return Cell.array.indexOf(Cell.array.find(o => o.x == x && o.y == y));
    }

    static setGlobals(size, cols, rows) {
        Cell.size = size;
        Cell.cols = cols;
        Cell.rows = rows;
    }

    static getArray() {
        let arr = [];
        for (let x = 0; x < Cell.cols; x++) {
            for (let y = 0; y < Cell.rows; y++) {
                arr.push(new Cell(x, y));
            }
        }
        Cell.array = arr;
        return arr;
    }

    removeWalls(target) {
        if (this.x - target.x == 1) {
            this.walls[3] = false;
            target.walls[1] = false;
        } else if (this.x - target.x == -1) {
            this.walls[1] = false;
            target.walls[3] = false;
        }

        if (this.y - target.y == 1) {
            this.walls[0] = false;
            target.walls[2] = false;
        } else if (this.y - target.y == -1) {
            this.walls[2] = false;
            target.walls[0] = false;
        }
    }

    getNeighbour(cells) {
        let n = [];

        let t = cells[Cell.getIndex(this.x, this.y - 1)];
        let b = cells[Cell.getIndex(this.x, this.y + 1)];
        let l = cells[Cell.getIndex(this.x - 1, this.y)];
        let r = cells[Cell.getIndex(this.x + 1, this.y)];

        if (t && t.available == true) {
            n.push(t);
        }
        if (b && b.available == true) {
            n.push(b);
        }
        if (l && l.available == true) {
            n.push(l);
        }
        if (r && r.available == true) {
            n.push(r);
        }

        let rnd = floor(random(0, n.length));
        return n[rnd];

    }

    draw() {
        noStroke();

        fill(52, 190);

        let drawX = this.x * Cell.size;
        let drawY = this.y * Cell.size;
        rect(drawX, drawY, Cell.size, Cell.size);

        //Draw Lines
        stroke(0, 120, 10);

        //Top, Right, Bottom, Left
        if (this.walls[0]) {
            line(drawX, drawY, drawX + Cell.size, drawY);
        }
        if (this.walls[1]) {
            line(drawX + Cell.size, drawY, drawX + Cell.size, drawY + Cell.size);
        }
        if (this.walls[2]) {
            line(drawX, drawY + Cell.size, drawX + Cell.size, drawY + Cell.size);
        }
        if (this.walls[3]) {
            line(drawX, drawY, drawX, drawY + Cell.size);
        }
    }
}