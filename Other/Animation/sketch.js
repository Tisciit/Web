let animation;

function setup() {

    createCanvas(windowWidth - 5, windowHeight - 2);
    background(52);
    setupWritingAnimation();
}

function draw() {
    if (!animation.animate()) {
        console.log("done");
        noLoop();
    };
}

function setupWritingAnimation() {
    animation = new Animation();

    //---
    animation.text = "function setupIntroAnimation() \{\n\
             animation = new Animation(); \n\
        \n\
             \/\/--- Custom Attributes for this animation\n\
             animation.offSetX = width \/ 4;\n\
             animation.offSetY = height \/ 4;\n\
             animation.terminalWidth = Math.floor(width - 2 * animation.offSetX);\n\
             animation.terminalHeight = Math.floor(height - 2 * animation.offSetY);\n\
             animation.padding = Math.floor(animation.terminalHeight \/ 11);\n\
             animation.userName = 'NT9827';\n\
             animation.password = '******';\n\
             \/\/---\n\
        \n\
             textFont('Consolas');\n\
        \n\
             animation.addStep(function (frame) \{ \/* Terminal Outlines *\/\n\
                 let speed = 10;\n\
                 let drawn = false;\n\
        \n\
                 for (let i = 0; i <= speed; i++) \{\n\
                     \/\/top & bottom\n\
                     if (frame + i < animation.terminalWidth) \{\n\
                         point(animation.offSetX + frame + i, animation.offSetY);\n\
                         point(width - animation.offSetX - frame - i, height - animation.offSetY);\n\
                         drawn = true;\n\
                     \}\n\
                     \/\/left & right\n\
                     if (frame + i < animation.terminalHeight) \{\n\
                         point(animation.offSetX, height - animation.offSetY - frame - i);\n\
                         point(width - animation.offSetX, animation.offSetY + frame + i);\n\
                         drawn = true;\n\
                     \}\n\
                 \}\n\
                 animation.skipFrames(speed);\n\
                 return !drawn;\n\
             \});";
    animation.cpm = 5000;
    frameRate(Math.ceil(animation.cpm / 60));
    noStroke();
    textSize(16);
    fill(80);
    //---

    animation.addStep(function (frame) {
        fill(52);
        rect(100, 100, width - 200, 1000);
        fill(80);
        text(animation.text.substring(0, frame), 100, 100, width - 200, 1000);

        return animation.text.length == frame;
    });
}

function setupIntroAnimation() {
    animation = new Animation();

    //--- Custom Attributes for this animation
    animation.offSetX = width / 4;
    animation.offSetY = height / 4;
    animation.terminalWidth = Math.floor(width - 2 * animation.offSetX);
    animation.terminalHeight = Math.floor(height - 2 * animation.offSetY);
    animation.padding = Math.floor(animation.terminalHeight / 11);
    animation.userName = "NT9827";
    animation.password = "******";
    //---

    textFont('Consolas');

    animation.addStep(function (frame) { /* Terminal Outlines */
        let speed = 10;
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
        let speed = 20;
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
        frameRate(15);
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

        return frame == 60;
    });
    animation.addStep(function (frame) { /* Welcome Screen */
        textSize(textSize() * 2);
        noStroke();
        textAlign(CENTER);
        fill(0);
        text(`Login successful\nWelcome ${animation.userName}`, width / 2, height / 3);

        return true;
    });
    animation.addStep(function (frame) { /* Wait again */
        return animation.wait(500);
    });

    stroke(255);
    strokeWeight(1);
}