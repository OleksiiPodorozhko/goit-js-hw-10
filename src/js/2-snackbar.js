import { showError, showOk } from './iziToastHelper.js';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = e.target.elements.delay.value;

  if (delay < 0) {
    showError('Invalid delay value');
    e.target.elements.delay.value = '';
    return;
  }

  const state = e.target.elements.state.value;
  e.target.reset();

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => showOk(`Fulfilled promise in ${delay}ms`))
    .catch(delay => showError(`Rejected promise in ${delay}ms`));
});
