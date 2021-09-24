window.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.querySelector(".btn");
  const gameDiv = document.querySelector(".game");
  const time = document.querySelector("#time");
  const resultHeader = document.querySelector("#result-header");
  const result = document.querySelector("#result");
  const timeHeader = document.querySelector("#time-header");
  const userTime = document.querySelector("#game-time");

  let score = 0;
  let canPlay = true;

  startBtn.addEventListener("click", start);

  gameDiv.addEventListener("click", touchRenderBlock);

  userTime.addEventListener("input", setTime);

  function start(){
    score = 0;
    setTime();
    timeHeader.classList.remove("hide");
    resultHeader.classList.add("hide");
    gameDiv.style.backgroundColor = "#fff";
    startBtn.classList.add("hide");

    let interval = setInterval(function () {
      if (time.textContent <= 0) {
        clearInterval(interval);
        endGame();
      } else {
        time.innerHTML = (time.textContent - 0.1).toFixed(1);
      }
    }, 100);
    renderBlock();
  };

  const endGame = () => {
    canPlay = false;
    setScore();
    startBtn.classList.remove("hide");
    gameDiv.style.backgroundColor = "#acacac";
    gameDiv.innerHTML = "";
    timeHeader.classList.add("hide");
    resultHeader.classList.remove("hide");
    canPlay = true
  };

  const setScore = () => {
    result.innerHTML = score;
  };
  function setTime() {
    let timee = +userTime.value;
    time.textContent = timee.toFixed(1);
  }
  const renderBlock = () => {
    let maxTop = gameDiv.getBoundingClientRect().height - 50;
    let maxLeft = gameDiv.getBoundingClientRect().width - 50;
    let box = document.createElement("div");
    box.style.width = box.style.height = '50px';
    box.style.backgroundColor = "black";
    box.style.position = "absolute";
    box.style.top = getRandom(30, maxTop) + "px";
    box.style.left = getRandom(30, maxLeft) + "px";
    box.style.cursor = "pointer";
    box.setAttribute("data-box", "true");
    gameDiv.insertAdjacentElement("afterbegin", box);
  };

  function touchRenderBlock(event) {
    if (canPlay) {
      if (event.target.dataset.box == 'true') {
        score++;
        renderBlock();
        event.target.style.display = "none";
      }
    }
  }

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
});
