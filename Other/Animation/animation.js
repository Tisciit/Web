class Animation {

    constructor() {
        this.currentFrame = 0;
        this.entryFrame = null;

        this.steps = []
        this.currentStep = 0;

        this._wait_StartFrame = null;
        this.image;
    }

    animate() {
        if (this.steps[this.currentStep]()) {
            this.currentStep++;
        }

        if (this.steps.length == this.currentStep) {
            return false;
        }
        return true;
    }

    skipFrames(frames) {
        this.currentFrame += frames;
    }

    wait(frames) {
        if (this._wait_StartFrame == null) {
            this._wait_StartFrame = this.currentFrame;
        }
        if (this.currentFrame - this._wait_StartFrame >= frames) {
            this._wait_StartFrame = null;
            return true;
        }
    }

    addStep(f) {
        let animation = this;
        this.steps.push(function () {
            let frame = animation.normalizeFrame();
            let stepDone = false;
            animation.currentFrame++;

            if (f(frame)) {
                animation.releaseEntryFrame();
                stepDone = true;
            };

            /* */

            return stepDone;
        });
    }

    normalizeFrame() {
        if (this.entryFrame == null) {
            this.entryFrame = this.currentFrame;
        }
        return this.currentFrame - this.entryFrame;
    }

    releaseEntryFrame() {
        this.entryFrame = null;
    }
}