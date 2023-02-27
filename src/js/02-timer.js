import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

let chosenDate = 0;
let time = 0;
btn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    const dateNow = new Date().getTime();
    if (chosenDate < dateNow) {
      Notiflix.Notify.failure('"Please choose a date in the future"');
    } else {
      time = chosenDate - dateNow;
      convertMs(time);

      btn.disabled = false;
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
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

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  const a = value.toString().padStart(2, '0');
  return a;
}

const onStartBtn = () => {
  const timerId = setInterval(() => {
    if (time > 1000) {
      time -= 1000;
      convertMs(time);
      btn.disabled = true;
    } else {
      btn.disabled = false;
      clearInterval(timerId);
    }
  }, 1000);
};
btn.addEventListener('click', onStartBtn);
