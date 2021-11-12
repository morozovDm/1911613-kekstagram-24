const body = document.querySelector('body');


export function toggleBodyModalOpen() {
  if(body.classList.contains('modal-open')) {
    body.classList.remove('modal-open');
  } else {
    body.classList.add('modal-open');
  }
}

export function randomInteger(min, max) {
  if(min < max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  alert('некорректный диапазон значений'); // eslint-disable-line no-alert
}

export function checkStrMaxLength(str, maxLength) {
  return !!str && str.length <= maxLength;
}

export function debounce(callback, delay = 500) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
}

checkStrMaxLength('str', 3);

