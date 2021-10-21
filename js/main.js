function randomInteger(min, max) {
  if(min < max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
  alert('некорректный диапазон значений'); // eslint-disable-line no-alert
}

function checkStrMaxLength(str, maxLength) {
  return !!str && str.length <= maxLength;
}

randomInteger(0, 1);
checkStrMaxLength('str', 3);
