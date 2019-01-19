class MatrixCol {

    constructor(x, size) {
        this.allowedchars = "!§$%&/()=?²³{[]}\"üäöÜÄÖ+#-*'_~.:,;<>|abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123465789";
        this.x = x;
        this.size = size;

        this.characters = [];
        this.y = 0;
        this.curY = 0;
        this.desiredY = 0;
        this.ttl = 0;
    }

    getRandomCharacter() {
        return this.allowedchars[floor(random(0, this.allowedchars.length))];
    }

    update() {

        if (this.characters.length == 0) {
            /** Populate new */
            this.curY = floor(random(this.size, height / this.size / 3)); /** Spawn in upper third */
            this.curY *= this.size; //harmonize?
            this.y = this.curY;
            this.desiredY = this.curY + floor(random(height * .7 - this.curY));
            this.ttl = floor(random(100, 200));

            /** Add first char */
            this.characters.push(this.getRandomCharacter());
        } else if (this.curY <= this.desiredY) {
            /** Grow */
            this.curY += this.size;
            this.characters.push(this.getRandomCharacter());
        } else {
            /** TTL */
            this.ttl--;

            for (let i = 0; i < this.characters.length; i++) {
                if (Math.random() > .99) {
                    this.characters[i] = this.getRandomCharacter();
                }
            }
            if (this.ttl == 0) {
                this.characters = [];
            }
        }
    }

    draw() {
        const drawStr = this.characters.join("\n");
        text(drawStr, this.x, this.y);
    }
}