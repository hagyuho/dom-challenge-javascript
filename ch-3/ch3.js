function CreateBoard(el, row, col) {
  //1. get base Element
  var elme = document.querySelector(el);
  elme.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
  elme.style.gridTemplateRows = `repeat(${row}, 1fr)`;

  //2. create grid
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < col; c++) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.classList.add((r + c) % 2 == 0 ? "even" : "odd");
      box.dataset.r = r;
      box.dataset.c = c;
      elme.appendChild(box);
    }
  }

  //3. addEventListener
  elme.addEventListener("click", (event) => {
    turnRed(event, row, col);
  });
}

//event : when box is clicked
function turnRed(event) {
  let target = event.target;
  let plus = +target.dataset.r + +target.dataset.c;
  let minus = target.dataset.r - target.dataset.c;
  let boxs = document.getElementsByClassName("box");
  for (let i = 0; i < boxs.length; i++) {
    let r = parseInt(boxs[i].dataset.r);
    let c = parseInt(boxs[i].dataset.c);

    if (r + c == plus || r - c == minus) {
      boxs[i].classList.add("red");
    } else {
      boxs[i].classList.remove("red");
    }
  }
}
