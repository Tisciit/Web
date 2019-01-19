let animation;
let animations = [];

function setup() {
    frameRate(60);
    createCanvas(windowWidth - 5, windowHeight - 2);
    background(52);
    setupMazeAnimation();

    animations.push(getFourierSeries(100, 100, 100, .05, 5));
    // animations.push(getFourierSeries(100, 200, 25, .05, 2));
    // animations.push(getFourierSeries(100, 300, 25, .05, 3));
    // animations.push(getFourierSeries(100, 400, 25, .05, 4));
    // animations.push(getFourierSeries(100, 500, 25, .05, 5));
    // animations.push(getFourierSeries(100, 600, 25, .05, 6));
    // animations.push(getFourierSeries(100, 600, 25, .05, 7));

    // animations.push(getFourierSeries(500, 100, 25, .05, 8));
    // animations.push(getFourierSeries(500, 200, 25, .05, 9));
    // animations.push(getFourierSeries(500, 300, 25, .05, 10));
    // animations.push(getFourierSeries(500, 400, 25, .05, 11));
    // animations.push(getFourierSeries(500, 500, 25, .05, 12));
    // animations.push(getFourierSeries(500, 600, 25, .05, 13));
    // animations.push(getFourierSeries(500, 600, 25, .05, 14));

    // animations.push(getFourierSeries(900, 100, 25, .05, 15));
    // animations.push(getFourierSeries(900, 200, 25, .05, 16));
    // animations.push(getFourierSeries(900, 300, 25, .05, 16));
    // animations.push(getFourierSeries(900, 400, 25, .05, 18));
    // animations.push(getFourierSeries(900, 500, 25, .05, 19));
    // animations.push(getFourierSeries(900, 600, 25, .05, 20));
    // animations.push(getFourierSeries(900, 600, 25, .05, 100));
}

function draw() {
    if (!animation.animate()) {

        for (let ani of animations) {
            ani.animate();
            image(ani.graphic, ani.x, ani.y);

            // noLoop();
        }
    };
}

function setupMazeAnimation() {
    animation = new Animation();
    background(52);

    //--- Custom Attr

    animation.step = 100;
    animation.size = 10;
    animation.rows = Math.floor(height / animation.size);
    animation.cols = Math.floor(width / animation.size);

    Cell.setGlobals(animation.size, animation.cols, animation.rows);

    animation.cells = Cell.getArray();
    animation.current = animation.cells[0];
    animation.current.available = false;
    animation.stack = [];

    //---

    animation.addStep(function (frame) {
        for (let n = 0; n < animation.step; n++) {
            let neighbour = animation.current.getNeighbour(animation.cells);
            if (neighbour) {
                animation.current.removeWalls(neighbour);
                animation.current.draw();
                neighbour.draw();
                animation.stack.push(animation.current);
                animation.current = neighbour;
                animation.current.available = false;
            } else if (animation.stack.length > 0) {
                animation.current = animation.stack.pop();
            } else {
                return true;
            }
        }
    });

    animation.addStep(function (frame) {
        return animation.wait(1);
    });

    animation.addStep(function (frame) {
        return true;
    });
}

function setupHackingAnimation() {
    animation = new Animation();
    background(52);

    //--- Custom Attributes for this animation
    animation.offSetX = width / 4;
    animation.offSetY = height / 4;
    animation.terminalWidth = Math.floor(width - 2 * animation.offSetX);
    animation.terminalHeight = Math.floor(height - 2 * animation.offSetY);
    animation.padding = Math.floor(animation.terminalHeight / 11);
    animation.userName = "NT9827";
    animation.password = "******";

    animation.matrixPhrase = "N E O   T O K Y O   P O L I C E   D E P A R T M E N T - D U A R C H Y\
\nSELECT wanted, evidence FROM crimes WHERE\
\ndateOfCrime EQUALS /Yesterday/ AND clues CONTAINS 'drone NT-D-5132'\
\nOutput:\
\n1\tName: Lastname, FirstName\tRace:{Race}\tLast Seen: Litten John Hotel\
\n2\tName: Lastname, FirstName\tRace:{Race}\tLast Seen: Litten John Hotel\
\n3\tName: Unknown\t Race: Unknown\tLast Seen: Unknown\
\nEvidence: Video material from drone NT-D-5132, automatic face recognition software,\
\nbooking of taxer to a location near scene of crime from Litten John Hotel";
    animation.matrixDone = false;
    animation.matrixAllowedChars = " !\"§$%&/(){}=?²³\\^°@€[]ß*+~'#_-.:,;µ<>|`´üÜöÖäÄabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    animation.matrixChars = [];
    animation.textSize = 12;
    textSize(animation.textSize);
    animation.matrixCols = Math.floor(width / textWidth("@"));
    animation.matrixSpawnProbability = .15;
    animation.matrixIndex = 0;
    animation.matrixDrawOnFrame = 1;
    //---

    textFont('Consolas');

    animation.addStep(function (frame) { /* Terminal Outlines */
        let speed = 3;
        let drawn = false;

        for (let i = 0; i <= speed; i++) {
            //top & bottom
            if (frame + i < animation.terminalWidth) {
                point(animation.offSetX + frame + i, animation.offSetY);
                point(width - animation.offSetX - frame - i, height - animation.offSetY);
                drawn = true;
            }
            //left & right
            if (frame + i < animation.terminalHeight) {
                point(animation.offSetX, height - animation.offSetY - frame - i);
                point(width - animation.offSetX, animation.offSetY + frame + i);
                drawn = true;
            }
        }
        animation.skipFrames(speed);
        return !drawn;
    });
    animation.addStep(function (frame) { /* Wait for dramatic effect */
        return animation.wait(100);
    });
    animation.addStep(function (frame) { /* Write User Text */
        noStroke();
        fill(255);
        textSize(30);
        text("User", animation.offSetX + animation.padding, animation.offSetY + animation.padding);
        return true;
    });
    animation.addStep(function (frame) { /* Write Password Text */
        text("Pass", animation.offSetX + animation.padding, animation.offSetY + 4 * animation.padding);
        return true;
    });
    animation.addStep(function (frame) { /* User Box */
        let speed = 10;
        let drawn = false;
        let boxWidth = animation.terminalWidth - 2 * animation.padding;

        stroke(255);
        for (let i = 0; i <= speed; i++) {
            //top & bottom
            if (frame + i < boxWidth) {
                point(animation.offSetX + animation.padding + frame + i, animation.offSetY + 1.5 * animation.padding);
                point(animation.offSetX + animation.terminalWidth - animation.padding - frame - i, animation.offSetY + 2.5 * animation.padding);
                drawn = true;
            }
            //left & right
            if (frame + i < animation.padding) {
                point(animation.offSetX + animation.padding, animation.offSetY + 1.5 * animation.padding + frame + i);
                point(animation.offSetX + animation.padding + boxWidth, animation.offSetY + 1.5 * animation.padding + frame + i);
                drawn = true;
            }
        }
        animation.skipFrames(speed);
        return !drawn;
    });
    animation.addStep(function (frame) { /* Pass Box */
        let speed = 10;
        let drawn = false;
        let boxWidth = animation.terminalWidth - 2 * animation.padding;

        stroke(255);
        for (let i = 0; i <= speed; i++) {
            //top & bottom
            if (frame + i < boxWidth) {
                point(animation.offSetX + animation.padding + frame + i, animation.offSetY + 4.5 * animation.padding);
                point(animation.offSetX + animation.terminalWidth - animation.padding - frame - i, animation.offSetY + 5.5 * animation.padding);
                drawn = true;
            }
            //left & right
            if (frame + i < animation.padding) {
                point(animation.offSetX + animation.padding, animation.offSetY + 4.5 * animation.padding + frame + i);
                point(animation.offSetX + animation.padding + boxWidth, animation.offSetY + 4.5 * animation.padding + frame + i);
                drawn = true;
            }
        }
        animation.skipFrames(speed);
        return !drawn;
    });
    animation.addStep(function (frame) { /* Write Username in User-Box */
        frameRate(10);
        text(animation.userName[frame],
            animation.offSetX + animation.padding + textSize() / 2 + frame * textSize(),
            animation.offSetY + 2 * animation.padding + animation.padding * .25);

        return animation.userName.length == frame;
    });
    animation.addStep(function (frame) { /* Write Password in User-Box */
        text(animation.password[frame],
            animation.offSetX + animation.padding + textSize() / 2 + frame * textSize(),
            animation.offSetY + 5 * animation.padding + animation.padding * .25);

        return animation.password.length == frame;
    });
    animation.addStep(function (frame) { /* Login Fade Out */
        frameRate(20);
        fill(255, 255, 255, 20);
        rect(animation.offSetX, animation.offSetY, animation.terminalWidth, animation.terminalHeight);

        return frame == 100;
    });
    animation.addStep(function (frame) { /* Welcome Screen */
        textSize(textSize() * 2);
        noStroke();
        textAlign(CENTER);
        fill(0);
        text(`Login successful\nWelcome ${animation.userName}`, width / 2, height / 3);

        return true;
    });
    animation.addStep(function (frame) { /* Wait again*/
        return animation.wait(100);
    });
    animation.addStep(function (frame) { /* Do some nice looking matrix stuff */

        frameRate(60);
        textSize(animation.textSize);

        if (frame % animation.matrixDrawOnFrame == 0) {
            background(55, 55, 55, 100);

            let newText = [];
            for (let i = 0; i <= animation.matrixCols; i++) {
                if (Math.random() < animation.matrixSpawnProbability) {
                    let r = Math.floor(random(animation.matrixAllowedChars.length));

                    let mt = new MatrixText(animation.matrixAllowedChars[r],
                        textSize(),
                        i * Math.floor(width / animation.matrixCols), 0, 0);
                    animation.matrixChars.push(mt);
                    newText.push(mt);
                }
            }

            for (let c of newText) {
                if (!c.highlighted && c.char == animation.matrixPhrase[animation.matrixIndex]) {
                    c.highlight();
                    animation.matrixIndex++;

                    while (animation.matrixPhrase[animation.matrixIndex] == "\n" || animation.matrixPhrase[animation.matrixIndex] == "\t") {
                        animation.matrixIndex++;
                    }
                    break;
                }
            }

            for (let i = 0; i < animation.matrixChars.length; i++) {
                fill(0, 143, 17);
                let c = animation.matrixChars[i];
                c.draw();
                c.moveDown();

                if (c.offScreen()) {
                    animation.matrixChars.splice(i, 1);
                }
            }

            textSize(animation.textSize * 2);

            let rows = animation.matrixPhrase.substring(0, animation.matrixIndex).split("\n").length;
            let tWidth = Math.floor(textWidth(animation.matrixPhrase.substring(0,
                animation.matrixIndex) + 2 * animation.padding));

            fill(52, 52, 52);
            stroke(255);
            rect(width / 2 - tWidth / 2,
                height / 3 - (animation.textSize + animation.padding),
                tWidth,
                2 * animation.padding + (textSize() + 5) * rows
            );

            fill(255, 0, 0);
            noStroke();
            text(animation.matrixPhrase.substring(0,
                    animation.matrixIndex),
                width / 2,
                height / 3);

        }

        return animation.matrixIndex == animation.matrixPhrase.length;
    });

    stroke(255);
    strokeWeight(1);
}

function getFourierSeries(x, y, size, speed, num) {
    let tempanimation = new Animation();

    tempanimation.wave = [];



    tempanimation.x = x;
    tempanimation.y = y;
    tempanimation.speed = speed;
    tempanimation.circleSize = size;
    tempanimation.graphic = createGraphics(tempanimation.circleSize * 15, tempanimation.circleSize * 4);
    tempanimation.numberOfCoords = tempanimation.circleSize * 8;
    tempanimation.graphic.translate(tempanimation.circleSize * 3, tempanimation.graphic.height / 2);

    tempanimation.num = num;
    tempanimation.time = 0;

    tempanimation.originalBackground;

    tempanimation.addStep(function () {
        tempanimation.originalBackground = get(tempanimation.x, tempanimation.y, tempanimation.graphic.width, tempanimation.graphic.height);
        return true;
    });


    tempanimation.addStep(function (frame) {

        let graph = tempanimation.graphic;
        graph.noFill();
        graph.image(tempanimation.originalBackground, -tempanimation.circleSize * 3, -tempanimation.graphic.height / 2);

        let x = 0;
        let y = 0;



        for (let i = 0; i < tempanimation.num; i++) {
            let prevX = x;
            let prevY = y;

            let n = i * 2 + 1; /* Normalize to 1, 3, 5, ... */

            let r = tempanimation.circleSize * (4 / (n * PI));
            x += r * cos(n * tempanimation.time);
            y += r * sin(n * tempanimation.time);

            graph.stroke(255);
            graph.ellipse(prevX, prevY, r * 2);

            graph.stroke(255, 0, 0);
            graph.line(prevX, prevY, x, y);
        }
        tempanimation.wave.unshift(y);

        graph.stroke(0, 100, 200);
        graph.line(x, y, tempanimation.circleSize * 3, tempanimation.wave[0]);
        graph.beginShape();
        graph.stroke(0, 230, 12);
        graph.noFill();
        for (let i = 0; i < tempanimation.wave.length; i++) {
            graph.vertex(i + tempanimation.circleSize * 3, tempanimation.wave[i]);
        }
        graph.endShape();

        graph.stroke(255, 20);

        graph.line(-tempanimation.circleSize * 3, 0, graph.width, 0);

        tempanimation.time += tempanimation.speed;

        if (tempanimation.wave.length > tempanimation.numberOfCoords) {
            tempanimation.wave.pop();
        }

        image(graph, tempanimation.x, tempanimation.y);

    });

    return tempanimation;
}