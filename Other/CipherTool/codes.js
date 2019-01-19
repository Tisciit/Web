const OPERATIONS = {
    ENCODE: 1,
    DECODE: -1,
}

const Boundaries = {
    UpperCase: {
        boundary_start: 'A'.charCodeAt(),
        boundary_end: 'Z'.charCodeAt(),
        boundary_check: function (c) {
            let index = c.charCodeAt();
            return this.boundary_start <= index && index <= this.boundary_end;
        }
    },
    LowerCase: {
        boundary_start: 'a'.charCodeAt(),
        boundary_end: 'z'.charCodeAt(),
        boundary_check: function (c) {
            let index = c.charCodeAt();
            return this.boundary_start <= index && index <= this.boundary_end;
        }
    },
    Numbers: {
        boundary_start: '0'.charCodeAt(),
        boundary_end: '9'.charCodeAt(),
        boundary_check: function (c) {
            let index = c.charCodeAt();
            return this.boundary_start <= index && index <= this.boundary_end;
        }
    }
}

/**
 * Contains the Alphabet in Uppercase without any special characters like ÄÜÖ...
 */
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Codes {

    /**
     * ROTCipher (Rotation Cipher) rotates each character in your text according to the given number.
     * @param {String} text The Texto to Encode / Decode
     * @param {Number} shift The Number of characters to shift
     * @param {Codes.OPERATIONS} operation Encode or Decode
     * @returns {String} The text en- or decoded
     */
    static ROTCipher(text, shift, operation) {

        if (operation == OPERATIONS.DECODE) {
            shift = Math.abs(shift) * -1;
        } else {
            shift = Math.abs(shift);
        }

        //Todo: Implement Boundaries
        let out = "";
        for (let t of text) {
            let boundary = this.getCorrectBoundaries(t);
            let charCode = t.charCodeAt()

            if (boundary != undefined) {
                for (let i = Math.abs(shift); i > 0; i--) {
                    charCode += operation;

                    if (charCode > boundary.boundary_end) {
                        charCode = boundary.boundary_start;
                    } else if (charCode < boundary.boundary_start) {
                        charCode = boundary.boundary_end;
                    }
                }
            }
            out += String.fromCharCode(charCode);
        }
        return out;
    }

    /**
     * Caesar Cypher is the most known ROTCipher. It is shifting the Text 2 to the right or left
     * @param {String} text The Text to Encode / Decode
     * @param {Codes.OPERATIONS} operation Encode or Decode
     * @returns {String} The text en- or decoded
     */
    static CaesarCipher(text, operation) {
        return Codes.ROTCipher(text, 2, operation);
    }

    /**
     * Use A1Z26 to assign Numbers to each Character
     * @param {String} text The Text to Encode / Decode
     * @param {Codes.OPERATIONS} operation Encode or Decode
     * @returns {String} The text en- or decoded
     */
    static A1Z26(text, operation) {

        let out = "";

        if (operation == OPERATIONS.ENCODE) {
            for (let t of text.toUpperCase()) {
                if (t.trim() == "") {
                    out += " ";
                } else if (ALPHABET.indexOf(t) != -1) {
                    out += (ALPHABET.indexOf(t) + 1) + " ";
                } else {
                    out += t + " ";
                }
            }
        } else {
            for (let n of text.split(" ")) {
                if (Boundaries.Numbers.boundary_check(n)) {
                    //Is a number
                    out += ALPHABET[n - 1];
                } else {
                    out += n;
                }
            }
        }

        return out;
    }

    /**
     * Returns a new Object which can be used in "SubstitutionCipher"
     * @param {String} text The characters which represent the code, starting with Uppercase Letters, Lowercase Letters and then numbers. F.E GHIJKLMNOPQRSTUVWXYZABCDEFqwertzuiopasdfghjklyxcvbnm2413576890
     * @returns {Object} A object which can be used in Substitutioncipher
     * @see Codes.SubstitutionCipher
     */
    static getSubstitution(text) {
        let obj = {};
        let index = 0;

        obj[" "] = " ";
        for (let bound of Object.keys(Boundaries)) {
            for (let i = Boundaries[bound].boundary_start; i <= Boundaries[bound].boundary_end; i++) {
                obj[String.fromCharCode(i)] = text[index];
                index++;
            }
        }
        return obj;
    }

    /**
     * Substitutes each character with another
     * @param {String} text The Text to Encode / Decode
     * @param {Object} sub The Substitution to use to encode / decode. Use 'getSubstitution' to receive such an object
     * @param {Codes.OPERATIONS} operation Encode or Decode
     * @returns {String} The text en- or decoded
     */
    static SubstitutionCipher(text, sub, operation) {
        let out = "";

        if (operation == OPERATIONS.ENCODE) {
            for (let t of text) {
                out += sub[t];
            }
        } else {
            for (let t of text) {
                let vals = Object.values(sub);
                for (let i = 0; i < vals.length; i++) {
                    if (vals[i] == t) {
                        out += Object.keys(sub)[i];
                        break;
                    }
                }
            }
        }
        return out;
    }

    /**
     * More complex ROTCipher, which rotates each character in "text" by its corresponding "keyWords", 0 based integer value.
     * A = 0; Z = 25
     * Key Llama would translate to 11,11,0,12,0
     * @param {String} text The Text to Encode / Decode
     * @param {String} keyWord The Word used to Encode / Decode the Text. May not contain whitespaces
     * @param {Codes.OPERATIONS} operation Encode or Decode
     * @returns {String} The text en- or decoded
     */
    static Vigenere(text, keyWord, operation, shiftWhitespace = false, shiftNumbers = false) {
        let shiftBy = [];

        //Assign shiftBy - Values by the given keyWord.
        for (let key of keyWord) {
            if (Boundaries.Numbers.boundary_check(key)) {
                //Key is a number
                shiftBy.push(key);
            } else if (ALPHABET.indexOf(key.toUpperCase()) != -1) {
                shiftBy.push(ALPHABET.indexOf(key.toUpperCase()));
            } else {
                //Do nothing
            }
        }

        //Actual Encoding / Decoding
        let out = "";
        let index = 0;
        for (let t of text) {

            if (Boundaries.LowerCase.boundary_check(t) || Boundaries.UpperCase.boundary_check(t)) {
                out += this.ROTCipher(t, shiftBy[index], operation);
                index++;
            } else if (shiftWhitespace && (t == " " || t == "\t" || t == "\n")) {
                out += t;
                index++;
            } else if (shiftNumbers && Boundaries.Numbers.boundary_check(t)) {
                out += this.ROTCipher(t, shiftBy[index], operation);
            } else {
                out += t;
            }

            if (index % shiftBy.length == 0) {
                index = 0;
            }
        }

        return out;
    }

    static PlayFair(text, keyWord, operation) {
        let cipherstring = "";

        const playFairOptions = {
            substituteCharacter: {
                sub: "j",
                for: "i",
            },

            skipCharacter: {
                skip: "q",
            },

            order: {
                row: 0,
                column: 1,
            },
        }

        for (let t of text) {
            if (cipherstring.indexOf(t) != -1) {
                cipherstring.push(t);
            }
        }

        for (let t of Codes.ALPHABET) {
            if (cipherstring.indexOf(t) != -1) {
                cipherstring.push(t);
            }
        }
    }

    /**
     * Return the correct Boundary for the given Sign
     * @param {String} sign The sign to get the boundary of.
     * @returns {Codes.Boundaries} The correct boundary for the given sign. Will return undefined if no boundary found.
     */
    static getCorrectBoundaries(sign) {

        sign = sign.trim();
        for (let boundary of Object.getOwnPropertyNames(Boundaries)) {
            if (Boundaries[boundary].boundary_check(sign)) {
                return Boundaries[boundary];
            }
        }
        return undefined;
    }
}