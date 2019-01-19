let ROWS = 100;
let COLS = 100;
let SIZE = 20;
let STEP = 20;

let cells = [];
let current;
let stack = [];


function setup() {

  ROWS = floor((windowHeight - 5) / SIZE);
  COLS = floor((windowWidth - 5) / SIZE);

  Cell.setGlobals(SIZE, COLS, ROWS);
  createCanvas(SIZE * COLS, SIZE * ROWS)
  cells = Cell.getArray();

  current = cells[0];
  current.available = false;

  background(52);

  frameRate(120);
}

function draw() {

  //Provide ability to draw faster
  for (let n = 0; n < STEP; n++) {
    let neighbour = current.getNeighbour(false);
    if (neighbour) {
      current.removeWalls(neighbour);
      current.draw();
      neighbour.draw();
      stack.push(current);
      current = neighbour;
      current.available = false;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else {
      noLoop();
    }
  }
}