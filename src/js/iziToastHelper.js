import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../fonts/style.css';

export function showError(message) {
  iziToast.error({
    ...commonStyles,
    title: 'Error',
    message: message,
    color: '#ef4040',
    icon: 'icon-error',
  });
}

export function showOk(message) {
  iziToast.success({
    ...commonStyles,
    title: 'OK',
    message: message,
    color: '#59A10D',
    icon: 'icon-ok',
  });
}

const commonStyles =
  {
    position: 'topRight',
    titleColor: '#fff',
    titleSize: '16px',
    titleWeight: '700',
    titleLineHeight: '1.5',
    messageColor: '#fff',
    messageSize: '16px',
    messageWeight: '400',
    messageLineHeight: '1.5',
    iconColor: '#fff',
    theme: 'dark',
  };