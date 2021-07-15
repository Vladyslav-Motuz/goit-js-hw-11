import '../sass/main.scss';
const Swal = require('sweetalert2');

const input = document.querySelector('#date-selector');
const btnStart = document.querySelector('[data-start]');

const day = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
}

btnStart.setAttribute('disabled', true);

const timer = {  
  currentData: Date.now(), 
  inteval: '',
  
  start() {
    if (this.inteval) {
      return
    }

    this.inteval = setInterval(() => {
      // const currentData = Date.now() + 10800000;
      const currentData = Date.now();
      const timetMS = onchange() - currentData;

      const timertext = convertMs(timetMS);
      
      day.textContent = pad(`${timertext.days}`);
      hours.textContent = pad(`${timertext.hours}`);
      minutes.textContent = pad(`${timertext.minutes}`);
      seconds.textContent = pad(`${timertext.seconds}`);    
      
      if (timetMS < 1000) {
        this.stop();        
      }
    }, 1000);    
  },

  stop() {
    clearInterval(this.inteval);
    this.inteval = '';   
  }
};

const onchange = () => {
  const selectData = Date.parse(input.value);
  // const selectData = Date.UTC(2021,6,15,22,14);
  if (timer.currentData > selectData) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please choose a date in the future!'
    });
  } else {
    btnStart.removeAttribute('disabled');
  }
  return selectData;
};

const dataStart = () => {  
  timer.start();
}

input.addEventListener('change', onchange);
btnStart.addEventListener('click', dataStart);