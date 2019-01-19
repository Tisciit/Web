const CIPHERS = {
    ROT: function () {
        let parent = clearParent();
        let input = document.createElement("textarea");
        let output = document.createElement("textarea");

        //#region Slider and Info
        let slider = document.createElement("input");
        slider.id = "slider";
        slider.classList.add("slider");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", -25);
        slider.setAttribute("max", 25);
        slider.setAttribute("value", 0);

        
        let info = document.createElement("paragraph");

        let container = document.createElement("div");
        container.classList.add("slidecontainer");
        container.appendChild(info);
        container.appendChild(slider);
        //#endregion

        input.oninput = function () {
            output.value = Codes.ROTCipher(input.value, Math.abs(slider.value), getOperation());
            resizeControl([input, output]);
        }

        slider.oninput = function () {
            let op = getOperation();
            output.value = Codes.ROTCipher(input.value, Math.abs(slider.value), op);

            if (op == OPERATIONS.ENCODE) {
                info.innerHTML = "Encoding by " + Math.abs(slider.value);
            } else {
                info.innerHTML = "Decoding by " + Math.abs(slider.value);
            }
        }

        function getOperation() {
            if (slider.value >= 0) {
                return OPERATIONS.ENCODE;
            } else {
                return OPERATIONS.DECODE;
            }
        }

        parent.appendChild(input);
        parent.appendChild(container);
        parent.appendChild(output);

        slider.oninput();
    },

    CAESAR: function () {
        let parent = clearParent();
        let input1 = document.createElement("textarea");
        let input2 = document.createElement("textarea");

        input1.oninput = function () {
            input2.value = Codes.CaesarCipher(input1.value, OPERATIONS.ENCODE);
            resizeControl([input1,input2]);
        }

        input2.oninput = function () {
            input1.value = Codes.CaesarCipher(input2.value, OPERATIONS.DECODE);
            resizeControl([input1,input2]);
        }

        parent.appendChild(input1);
        parent.appendChild(input2);
    },

    A1Z26: function () {
        let parent = clearParent();
        let input1 = document.createElement("textarea");
        let input2 = document.createElement("textarea");

        input1.oninput = function () {
            input2.value = Codes.A1Z26(input1.value, OPERATIONS.ENCODE);
            resizeControl([input1,input2]);
        }

        input2.oninput = function () {
            input1.value = Codes.A1Z26(input2.value, OPERATIONS.DECODE);
            resizeControl([input1,input2]);
        }

        parent.appendChild(input1);
        parent.appendChild(input2);
    },

    Vigenere: function () {
        let parent = clearParent();
        let input1 = document.createElement("textarea");
        let key = document.createElement("input");
        let input2 = document.createElement("textarea");

        input1.oninput = function () {
            input2.value = Codes.Vigenere(input1.value, key.value, OPERATIONS.ENCODE);
            resizeControl([input1,input2]);
        }

        key.oninput = function () {
            input2.value = Codes.Vigenere(input1.value, key.value, OPERATIONS.ENCODE);
        }

        input2.oninput = function () {
            input1.value = Codes.Vigenere(input2.value, key.value, OPERATIONS.DECODE);
            resizeControl([input1,input2]);
        }

        parent.appendChild(input1);
        parent.appendChild(key);
        parent.appendChild(input2);
    },
}

window.onload = function () {
    let list = this.document.getElementById("list_ciphers");

    for (let c of Object.getOwnPropertyNames(CIPHERS)) {
        let option = this.document.createElement("LI");
        let t = document.createTextNode(c);
        option.appendChild(t);
        list.appendChild(option);

        option.onclick = function () {
            CIPHERS[c]();
        }
    }
}

function clearParent(){
    let parent = document.getElementById("app");
    clearChildren(parent);
    return parent;
}

function resizeControl(controls) {
    for (let control of controls) {
        control.style.height = control.scrollHeight + "px";
    }
}

function clearChildren(control) {
    while (control.firstChild) {
        control.removeChild(control.firstChild);
    }
}