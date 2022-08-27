const grid = document.querySelector(".grid");
let square = Array.from(document.querySelectorAll(".grid div")); //to make into array

//console.log(square);
let ScoreDisplay = document.getElementById("score");
let StartBtn = document.getElementById("start-button");

const GRID_WIDTH = 10;

const lTetromino = [
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, 2], //different shapes of lTetromino
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2],
  [GRID_WIDTH, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1, GRID_WIDTH * 2 + 2],
];

const zTetromino = [
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
];

const tTetromino = [
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
];

const oTetromino = [
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
];

const iTetromino = [
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
];

const shapes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

const shapes_colors = ["orange", "blue", "green", "red", "yellow"];

let ran = Math.floor(Math.random() * shapes.length);
let curShape = ran;
let nextShape = ran;
let curRotation = 0;
let curPosition = 4; //specifies where our tetromino starts
let cur = shapes[curShape][curRotation]; //current tetrimono
let shapes_function = function () {
  for (let eachItem of cur) {
    //console.log(eachItem);
    // square[curPosition + eachItem].classList.add("its");
    square[curPosition + eachItem].style.backgroundColor =
      shapes_colors[curShape];
  }
};

let remove_shape = function () {
  for (let eachItem of cur) {
    //console.log(eachItem);
    //square[curPosition + eachItem].classList.remove("its");
    square[curPosition + eachItem].style.backgroundColor = "black";
  }
};

let timeId = null;

function freeze() {
  if (
    cur.some((eachItem) =>
      square[curPosition + eachItem + GRID_WIDTH].classList.contains("taken")
    ) //return true if any elements contains our required criteria
  ) {
    console.log("yes");
    cur.forEach((index) => square[curPosition + index].classList.add("taken"));
    //to start new tetrimino
    curShape = nextShape;
    nextShape = Math.floor(Math.random() * shapes.length);
    cur = shapes[curShape][curRotation];
    curPosition = 4;
    shapes_function();
    display_();
    display_score();
    game_over();
  }
}
function moveDown() {
  remove_shape();
  curPosition += GRID_WIDTH;

  shapes_function();
  console.log("dhoni");
  freeze();
}

document.addEventListener("keydown", control);
function control(event) {
  if (event.keyCode == 37) {
    moveLeft();
  } else if (event.keyCode === 38) {
    rotate();
  } else if (event.keyCode === 39) {
    moveRight();
  } else {
    moveDown();
  }
}

function moveLeft() {
  remove_shape();
  let left = cur.some((index) => (index + curPosition) % GRID_WIDTH === 0); //checking wheter the tetrimono can move to left
  if (!left) curPosition -= 1;
  if (
    cur.some((index) => square[index + curPosition].classList.contains("taken"))
  ) {
    curPosition += 1; //
  }
  shapes_function();
}
function moveRight() {
  remove_shape();
  let right = cur.some(
    (index) => (index + curPosition) % GRID_WIDTH === GRID_WIDTH - 1
  );
  if (!right) curPosition += 1;
  if (
    cur.some((index) => square[index + curPosition].classList.contains("taken"))
  ) {
    curPosition -= 1;
  }
  shapes_function();
}

function rotate() {
  remove_shape();

  let right = cur.some(
    (index) => (index + curPosition) % GRID_WIDTH === GRID_WIDTH - 1
  );
  let left = cur.some((index) => (index + curPosition) % GRID_WIDTH === 0);
  if (!left && !right) {
    curRotation++;
  }
  if (curRotation == 4) curRotation = 0;
  cur = shapes[curShape][curRotation];

  shapes_function();
}

let displaySquares = Array.from(document.querySelectorAll(".mini-grid div"));
//console.log("d");
//onsole.log(displaySquares);
//console.log("d");
//to display next tetrimino
let displayWidth = 4;
let displayIndex = 0;

const upNextTetris = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2],
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
  [1, displayWidth, displayWidth + 1, displayWidth + 2],
  [0, 1, displayWidth, displayWidth + 1],
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
];

function display_() {
  //to display shape in mini grid
  displaySquares.forEach((item) => {
    //tem.classList.remove("its");

    item.style.backgroundColor = "black";
  });
  //console.log(upNextTetris[nextShape]);
  upNextTetris[nextShape].forEach((index) => {
    //displaySquares[displayIndex + index].classList.add("its");
    displaySquares[displayIndex + index].style.backgroundColor =
      shapes_colors[nextShape];
  });
}
StartBtn.addEventListener("click", function () {
  if (timeId) {
    clearInterval(timeId);
    timeId = null;
  } else {
    shapes_function();
    timeId = setInterval(moveDown, 500);
    //nextShape=Math.floor(Math.random()*shapes.length);
    //display_();
  }
});

let scored = 0;

function display_score() {
  for (let i = 0; i < 199; i += GRID_WIDTH) {
    let rows = [
      i,
      i + 1,
      i + 2,
      i + 3,
      i + 4,
      i + 5,
      i + 6,
      i + 7,
      i + 8,
      i + 9,
    ];
    if (rows.every((index) => square[index].classList.contains("taken"))) {
      console.log("dhoni");

      scored += 10;
      ScoreDisplay.textContent = scored;
      rows.forEach((index) => {
        square[index].classList.remove("taken");
        square[index].style.backgroundColor = "black";
        //square[index].classList.remove("its");
      });
      //console.log(square.length);
      const squareRemoved = square.splice(i, GRID_WIDTH);
      square = squareRemoved.concat(square); //here we are removing the rows and concanating
      //console.log(square.length);
      //console.log(square);
      square.forEach((cell) => grid.appendChild(cell));
    }
  }
}
//display_score();

function game_over() {
  if (
    cur.some((index) => square[curPosition + index].classList.contains("taken"))
  ) {
    ScoreDisplay.textContent = "END";
    clearInterval(timeId);
    square.forEach((element) => (element.style.backgroundColor = "black"));
  }
}
