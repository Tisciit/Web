class Animation {

    constructor() {
        this.currentFrame = 0;
        this.entryFrame = null;

        this.steps = []
        this.currentStep = 0;

        this._wait_StartFrame = null;
    }

    animate() {
        if (this.steps.length == this.currentStep) {
            return false;
        }
        
        if (this.steps[this.currentStep]()) {
            this.currentStep++;
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
            animation.currentFrame++;

            if (f(frame)) {
                animation.releaseEntryFrame();
                return true;
            };

            return false;
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