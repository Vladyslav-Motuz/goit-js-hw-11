// import '../sass/main.scss';

const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let Interval = '';

const onClickStart = () => {
    if (Interval) {
        return
    }
    
    Interval = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    start.setAttribute('disabled', true);
}

const onClickStop = () => {
    clearInterval(Interval);
    Interval = '';
    start.removeAttribute('disabled');
}

start.addEventListener('click', onClickStart);
stop.addEventListener('click', onClickStop);