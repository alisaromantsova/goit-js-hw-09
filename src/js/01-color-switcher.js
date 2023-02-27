function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

const onStartBtn = () => {
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', true);
};

const onStopBtn = () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
};

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);
