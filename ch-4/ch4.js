const createBoard = function (row, col, scoreNum) {
  //1. get base Element (score, board)
  var score = document.getElementById("score");
  score.textContent = `Score:${scoreNum}`;

  var board = document.createElement("div");
  board.id = "innerBoard";
  board.style.display = "grid";
  board.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${row}, 1fr)`;

  //2. get RandomColor & ramdonNum
  const randomNum = Math.round(Math.random() * row * col);
  const randomColor = getRandomColors();

  //3. create grid
  for (let r = 0; r < row * col; r++) {
    let box = document.createElement("div");
    box.dataset.isTrue = r === randomNum ? true : false;
    box.classList.add("box");
    box.style.backgroundColor =
      r == randomNum ? randomColor.color : randomColor.oddColor;
    board.appendChild(box);
  }

  //4. addEventListener
  board.addEventListener("click", (event) =>
    handleButtonClick(event, row, col, scoreNum)
  );
  return board;
};

//5. event : when box is clicked
const handleClick = function (event, row, col, scoreNum) {
  if (event.target.dataset.isTrue === "true") {
    scoreNum++;
    row++;
    col++;
  } else {
    row = 4;
    col = 4;
    scoreNum = 0;
  }
  board.replaceChild(
    createBoard(row, col, scoreNum),
    document.getElementById("innerBoard")
  );
};

const getRandomColors = function () {
  var ratio = 0.618033988749895;

  var hue = (Math.random() + ratio) % 1;
  var saturation = Math.round(Math.random() * 100) % 85;
  var lightness = Math.round(Math.random() * 100) % 85;

  var color =
    "hsl(" + Math.round(360 * hue) + "," + saturation + "%," + lightness + "%)";
  var oddColor =
    "hsl(" +
    Math.round(360 * hue) +
    "," +
    saturation +
    "%," +
    (lightness + 5) +
    "%)";

  return {
    color,
    oddColor,
  };
};
