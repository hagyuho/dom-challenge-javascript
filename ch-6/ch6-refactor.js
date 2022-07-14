var nowScore = 0;
var highScore = 0;
var zoneNumber = 0;
var que = [];

function CreateView(zoneNum) {
  //1. create base View
  zoneNumber = zoneNum;
  const $scoreArea = document.querySelector("#scoreArea");
  const $nowScoreView = document.createElement("div");
  const $highScoreView = document.createElement("div");
  $nowScoreView.classList.add("nowScore");
  $highScoreView.classList.add("highScore");
  $nowScoreView.textContent = `Score: ${nowScore}`;
  $highScoreView.textContent = `High Score: ${highScore}`;

  $scoreArea.appendChild($nowScoreView);
  $scoreArea.appendChild($highScoreView);

  const $zoneArea = document.querySelector("#zoneArea");
  for (let i = 0; i < zoneNum; i++) {
    const $box = document.createElement("div");
    $box.classList.add("box");
    $box.dataset.key = i;
    $zoneArea.appendChild($box);
  }

  const $buttonArea = document.querySelector("#buttonArea");
  const $button = document.createElement("button");
  $button.textContent = "START";
  $button.classList.add("button");
  $buttonArea.appendChild($button);

  //2. add EventListener
  $buttonArea.addEventListener("click", handleButtonClick);
  $zoneArea.addEventListener("click", handleBoxClick);
}

//event : when button is clicked
const handleButtonClick = () => {
  const $button = document.querySelector(".button");
  $button.setAttribute("disabled", true);
  startQuiz(nowScore + 1);
};

//event : when box is clicked
const handleBoxClick = (event) => {
  const clickedNum = +event.target.dataset.key;
  const answerNum = que.shift();
  let isCorrect = answerNum === clickedNum ? true : false;

  if (!isCorrect) {
    que = [];
    nowScore = 0;
    const $button = document.querySelector(".button");
    const $zoneArea = document.querySelector("#zoneArea");
    const $nowScore = document.querySelector(".nowScore");
    $button.removeAttribute("disabled");
    $zoneArea.classList.add("shake");
    $nowScore.textContent = `Score: ${nowScore}`;
    event.target.classList.add("red");

    setTimeout(() => {
      $zoneArea.classList.remove("shake");
      event.target.classList.remove("red");
    }, 500);
  }

  if (isCorrect) {
    event.target.classList.add("green");
    setTimeout(() => {
      event.target.classList.remove("green");
    }, 100);

    if (que.length === 0) {
      scoreChange();
      startQuiz(nowScore + 1);
    }
  }
};

//event : when quiz finally succeeded
// 1. nowScore ++ and render
// 2. update highScore and render
const scoreChange = () => {
  nowScore++;
  let $nowScore = document.querySelector(".nowScore");
  $nowScore.textContent = `Score: ${nowScore}`;
  if (nowScore > highScore) {
    highScore = nowScore;
    let $highScore = document.querySelector(".highScore");
    $highScore.textContent = `High Score: ${highScore}`;
  }
};

//event : when button is clicked / when quiz finally succeeded
// 1. generate random number
// 2. show which box is matched with random number (box's color changes momentarily )
// 3. push the random number into queue
// 4. repeat 1-3
const startQuiz = (num) => {
  const $zoneArea = document.querySelector("#zoneArea");
  const $boxes = $zoneArea.getElementsByClassName("box");
  for (let i = 0; i < num; i++) {
    const ramdomNumber = Math.floor(Math.random() * zoneNumber);
    setTimeout(() => {
      for (let j = 0; j < $boxes.length; j++) {
        if (ramdomNumber === +$boxes[j].dataset.key) {
          $boxes[j].classList.add("blue");
          setTimeout(() => {
            $boxes[j].classList.remove("blue");
          }, 500);
        }
      }
    }, 600 * i);
    que.push(ramdomNumber);
  }
};
