var que = [];

function CreateView(time) {
  //0. declare state
  //1. get base Element (score, board)
  var progressContainer = document.querySelector("#progress");
  var bar = document.createElement("progress");
  bar.classList.add("bar");
  bar.max = 100;
  bar.value = 0;
  progressContainer.appendChild(bar);

  var button = document.querySelector("#button");
  button.textContent = `Run`;

  //2. addEventListner
  button.addEventListener("click", () => handleClick(time));
  document.body.addEventListener("@change", handleChange);
}

//event : when button is clicked
function handleClick(time) {
  que.push(1);
  if (que.length === 1) queControl(que, time);
  const event = new CustomEvent("@change");
  document.body.dispatchEvent(event);
}

//event(custom) : when que's length is changed
function handleChange() {
  var button = document.querySelector("#button");
  button.textContent = `Run ${que.length > 0 ? que.length : ""}`;
}

//event(custom) : the moment when que's length is from 0 to 1
function queControl(que, time) {
  const intervalId = setInterval(() => {
    que.shift();
    const event = new CustomEvent("@change");
    document.body.dispatchEvent(event);
    if (que.length === 0) clearInterval(intervalId);
  }, time);
}
