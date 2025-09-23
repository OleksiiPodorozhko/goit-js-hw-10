import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  daysLabel: document.querySelector('[data-days]'),
  hoursLabel: document.querySelector('[data-hours]'),
  minutesLabel: document.querySelector('[data-minutes]'),
  secondsLabel: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let intervalId = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length === 0) {
      refs.startBtn.disabled = true;
      return;
    }

    userSelectedDate = selectedDates[0].getTime();

    if (userSelectedDate < Date.now()) {
      refs.startBtn.disabled = true;

      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.dateInput, options);

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.dateInput.disabled = true;

  updateTimer();
  intervalId = setInterval(updateTimer, 1000);
});

function updateTimer() {
  let remainingTime = userSelectedDate - Date.now();

  if (remainingTime <= 0) {
    clearInterval(intervalId);
    showDate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    refs.dateInput.disabled = false;
    return;
  }

  showDate(convertMs(remainingTime));
}

function showDate({ days, hours, minutes, seconds }) {
  refs.daysLabel.textContent = addLeadingZero(days);
  refs.hoursLabel.textContent = addLeadingZero(hours);
  refs.minutesLabel.textContent = addLeadingZero(minutes);
  refs.secondsLabel.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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