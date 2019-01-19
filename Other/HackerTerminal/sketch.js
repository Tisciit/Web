let frame = 0;

function setup() {
    createCanvas(windowWidth - 4, windowHeight - 4);
    background(50);
    initialization.getValues();
    matrixRain.getValues();
    matrixRain.setPhrase("Hello \n\n a b c d e f g h i j k l m n o p q r s t u v w x y z \n\n there");
}

function draw() {

    if (!initialization.done) {
        let newFrame = initialization.order[initialization.current](frame);
        frame = newFrame;
    } else if (!matrixRain.done) {
        matrixRain.animation(frame);
        frame++;
    }
}


let initialization = {

    getValues: function () {
        this.offSetX = width / 4;
        this.offSetY = height / 4;
        this.terminal_Width = Math.floor(width - (2 * initialization.offSetX));
        this.terminal_Height = Math.floor(height - (2 * initialization.offSetY));
        this.padding = Math.floor(this.terminal_Height / 11);
    },
    done: false,
    current: 0,
    offSetX: null,
    offSetY: null,
    padding: null,
    terminal_Width: null,
    terminal_Height: null,
    fontSettings: {
        font: 'Consolas',
        fontColor: 255,
        fontBorder: 255,
        sizeL: function () {
            return initialization.padding * .75;
        },
        sizeM: function () {
            return initialization.padding * .3
        },
    },

    order: {
        entryFrame: null,
        setEntryFrame: function (num) {
            if (!this.entryFrame) {
                this.entryFrame = num;
            }

            return num - this.entryFrame;
        },

        //draw Outter Terminal
        0: function (i) {
            i = this.setEntryFrame(i);
            let speed = 2;

            //Settings for the Points to be drawn
            stroke(255);
            strokeWeight(1);
            //top & bottom
            for (let n = 0; n <= speed; n++) {
                i++;
                if (i < initialization.terminal_Width) {
                    point(initialization.offSetX + i, initialization.offSetY);
                    point(width - initialization.offSetX - i, height - initialization.offSetY);
                }

                //right & left
                if (i < initialization.terminal_Height) {
                    point(width - initialization.offSetX, initialization.offSetY + i);
                    point(initialization.offSetX, height - initialization.offSetY - i);
                }
            }

            if (i >= max(initialization.terminal_Width, initialization.terminal_Height)) {
                this.entryFrame = null;
                initialization.current++;
            }

            return i + this.entryFrame;
        },

        //UserName
        1: function (i) {
            fill(initialization.fontSettings.fontColor);
            textFont(initialization.fontSettings.font);
            textSize(initialization.fontSettings.sizeL());
            text('Username', initialization.offSetX + initialization.padding, initialization.offSetY + initialization.padding);

            initialization.current++;
            return i;
        },

        //Password
        2: function (i) {
            text('Password', initialization.offSetX + initialization.padding, initialization.offSetY + 5 * initialization.padding);

            initialization.current++;

            return i;
        },

        //draw Username box
        3: function (i) {
            i = this.setEntryFrame(i);

            let speed = 10;

            //draw Username box
            for (let n = 0; n < speed; n++) {
                i++;
                if (i < initialization.terminal_Width - 2 * initialization.padding) {
                    point(initialization.offSetX + initialization.padding + i, initialization.offSetY + 2 * initialization.padding);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding - i, initialization.offSetY + 3 * initialization.padding);
                }

                if (i < initialization.padding) {
                    point(initialization.offSetX + initialization.padding, initialization.offSetY + 3 * initialization.padding - i);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding, initialization.offSetY + 2 * initialization.padding + i);
                }
            }
            if (i >= max(initialization.padding, initialization.terminal_Width - 2 * initialization.padding)) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        //draw Pwd Box
        4: function (i) {
            i = this.setEntryFrame(i);

            let speed = 10;
            for (let n = 0; n < speed; n++) {
                i++;
                if (i < initialization.terminal_Width - 2 * initialization.padding) {
                    point(initialization.offSetX + initialization.padding + i, initialization.offSetY + 6 * initialization.padding);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding - i, initialization.offSetY + 7 * initialization.padding);
                }

                if (i < initialization.padding) {
                    point(initialization.offSetX + initialization.padding, initialization.offSetY + 7 * initialization.padding - i);
                    point(initialization.terminal_Width + initialization.offSetX - initialization.padding, initialization.offSetY + 6 * initialization.padding + i);
                }
            }

            if (i >= max(initialization.padding, initialization.terminal_Width - 2 * initialization.padding)) {
                this.entryFrame = null;
                initialization.current++;
            }

            return i + this.entryFrame;
        },

        //write Info
        5: function (i) {
            noStroke();
            textSize(initialization.fontSettings.sizeM());
            text("We hereby inform you, that this system is under control of the Police department and the government. Unauthorized accesses will be investigated and persecuted",
                initialization.offSetX + initialization.padding,
                initialization.offSetY + 8 * initialization.padding,
                initialization.terminal_Width - 2 * initialization.padding,
                initialization.offSetY + 10 * initialization.padding);

            initialization.current++;
            return i;
        },

        //write 'root' in Username
        6: function (i) {
            i = this.setEntryFrame(i);
            textSize(initialization.fontSettings.sizeL());

            let username = "root";
            let innerPadding = initialization.padding / 4;
            const textheight = initialization.offSetY + 3 * initialization.padding - innerPadding;

            text(username[i], initialization.offSetX + initialization.padding + innerPadding + 30 * i, textheight);
            i++;
            if (i == username.length) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        //wait a moment
        7: function (i) {
            i = this.setEntryFrame(i);
            i++;
            if (i == 150) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        //write a bunch of starts in pwd box
        8: function (i) {
            i = this.setEntryFrame(i);

            let pwd = "***********************";
            let innerPadding = initialization.padding / 4;
            const textheight = initialization.offSetY + 7 * initialization.padding - innerPadding;

            text(pwd[i], initialization.offSetX + initialization.padding + innerPadding + 30 * i, textheight);
            i++;
            if (i == pwd.length) {
                this.entryFrame = null;
                initialization.current++;
            }
            return i + this.entryFrame;
        },

        //fade out by applying a box with some alpha value
        9: function (i) {
            i = this.setEntryFrame(i);

            fill(255, 255, 255, 20);
            rect(initialization.offSetX, initialization.offSetY, initialization.terminal_Width + 1, initialization.terminal_Height + 1);

            if (i == 190) {
                this.entryFrame = null;
                initialization.current++;
            }
            i++;
            return i + this.entryFrame;
        },

        //Write Access granted
        10: function (i) {
            textSize(60);
            textAlign(CENTER);
            fill(0);
            text("A C C E S S\nG R A N T E D", initialization.offSetX, initialization.offSetY + 3 * initialization.padding, initialization.terminal_Width, initialization.terminal_Height);

            initialization.current++;
            return i;
        },

        //wait and finish initialzation
        11: function (i) {
            i = this.setEntryFrame(i);
            i++;
            if (i == 300) {
                this.entryFrame = null;
                initialization.current++;
                initialization.done = true;
            }
            return i + this.entryFrame;


            return i;
        },
    }
}

let matrixRain = {

    done: false,
    getValues: function () {
        push();
        textSize(this.size);
        let max = 0;
        for (let c of this.allowedChars) {
            let m = textWidth(c);
            
            if(max < m){
                max = m;
            }
        }
        pop();
        this.cols = Math.floor(width / max);
    },
    setPhrase: function (string) {
        this.phraseToFind = string;
        this.currentIndex = 0;
    },
    allowedChars: " !\"§$%&/()=?²³\\^°@€[]ß*+~'#_-.:,;µ<>|`´üÜöÖäÄabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    //abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123465789
    chars: [],
    cols: 0,
    size: 30,
    spawnProb: .15,

    phraseToFind: "",
    currentIndex: 0,

    drawingOnFrame: 3,
    animation: function (i) {

        if (i % this.drawingOnFrame == 0) {
            background(color(55, 55, 55, 100));
            textSize(this.size);

            for (let i = this.chars.length - 1; i >= 0; i--) {
                fill(color(0, 143, 17));
                let c = this.chars[i];
                c.draw();
                c.moveDown();

                if (c.offScreen()) {
                    this.chars.splice(i, 1);
                }
            }

            for (let c of this.chars) {
                if (!c.highlighted && c.char == this.phraseToFind[this.currentIndex]) {
                    c.highlight();
                    this.currentIndex++;

                    while (this.phraseToFind[this.currentIndex] == "\n") {
                        this.currentIndex++;
                    }
                    break;
                }
            }


            for (let i = 0; i <= this.cols; i++) {
                if (Math.random() < this.spawnProb) {
                    let r = floor(random(this.allowedChars.length));
                    this.chars.push(new MatrixText(this.allowedChars[r], this.size, i * Math.floor(width / this.cols), 0, 0));
                }
            }
        }

        push();
        textSize(this.size);
        textFont('Consolas')

        fill(52, 52, 52);
        rectMode(CORNER);
        stroke(255);
        strokeWeight(1);

        let rows = this.phraseToFind.substring(0, this.currentIndex).split("\n").length;
        let tWidth = textWidth(this.phraseToFind.substring(0, this.currentIndex)) + (2 * initialization.padding);

        rect(width / 2 - tWidth / 2,
            height / 3 - (this.size + initialization.padding),
            tWidth,
            initialization.padding + (this.size + 5) * rows + initialization.padding);
        fill(255, 0, 0);
        noStroke();
        textAlign(CENTER);
        text(this.phraseToFind.substring(0, this.currentIndex), width / 2, height / 3);
        pop();

        if (this.currentIndex == this.phraseToFind.length) {
            this.done = true;
            textAlign(CENTER)
            fill(255, 0, 0);
            textSize(this.size * 2);
            text("Connection closed", width / 2, height / 4);
        }
    }
}