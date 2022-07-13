var nowScore = 0;
var highScore = 0;
var zoneNumber = 0;
var que = [];

function CreateView(zoneNum) {
  //1. create base View
  zoneNumber = zoneNum;
  const scoreView = document.querySelector("#scoreArea");
  const nowScoreView = document.createElement("div");
  const highScoreView = document.createElement("div");
  nowScoreView.classList.add("nowScore");
  highScoreView.classList.add("highScore");
  nowScoreView.textContent = `Score: ${nowScore}`;
  highScoreView.textContent = `High Score: ${highScore}`;

  scoreView.appendChild(nowScoreView);
  scoreView.appendChild(highScoreView);

  const clickZone = document.querySelector("#zoneArea");
  for (let i = 0; i < zoneNum; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.key = i;
    clickZone.appendChild(box);
  }

  const button = document.querySelector("#buttonArea");
  const buttonView = document.createElement("button");
  buttonView.textContent = "START";
  buttonView.classList.add("button");
  button.appendChild(buttonView);

  //2. create addEventListener
  button.addEventListener("click", handleButtonClick);
  clickZone.addEventListener("click", handleBoxClick);
}

const handleBoxClick = (event) => {
  const boxKey = +event.target.dataset.key;
  const answer = que.shift();
  let isOk = answer === boxKey ? true : false;
  if (!isOk) {
    que = [];
    const button = document.querySelector(".button");
    button.removeAttribute("disabled");

    nowScore = 0;
    const nowScoreView = document.querySelector(".nowScore");
    nowScoreView.textContent = `Score: ${nowScore}`;

    event.target.classList.add("red");
    const clickZone = document.querySelector("#zoneArea");
    clickZone.classList.add("shake");
    setTimeout(() => {
      clickZone.classList.remove("shake");
      event.target.classList.remove("red");
    }, 500);
  } else {
    event.target.classList.add("green");
    setTimeout(() => {
      event.target.classList.remove("green");
    }, 100);

    if (que.length === 0) {
      nowScore++;
      let nowScoreView = document.querySelector(".nowScore");
      nowScoreView.textContent = `Score: ${nowScore}`;
      if (nowScore > highScore) {
        highScore = nowScore;
        let highScoreView = document.querySelector(".highScore");
        highScoreView.textContent = `High Score: ${highScore}`;
      }
      startQuiz(nowScore + 1);
    }
  }
};

const handleButtonClick = () => {
  const button = document.querySelector(".button");
  button.setAttribute("disabled", true);
  startQuiz(nowScore + 1);
};

const startQuiz = (num) => {
  const clickZone = document.querySelector("#zoneArea");
  const boxes = clickZone.getElementsByClassName("box");

  for (let i = 0; i < num; i++) {
    const ramdomNumber = Math.floor(Math.random() * zoneNumber);
    setTimeout(() => {
      for (let j = 0; j < boxes.length; j++) {
        if (ramdomNumber === +boxes[j].dataset.key) {
          boxes[j].classList.add("blue");
          setTimeout(() => {
            boxes[j].classList.remove("blue");
          }, 500);
        }
      }
    }, 600 * i);
    que.push(ramdomNumber);
  }
};
