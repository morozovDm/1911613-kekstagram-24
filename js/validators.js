import * as utils from './utils.js';

const hashtagsRegExp = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19})$/;

export function hashTagsValidators(value) {
  const hashTags = value.split(' ');
  for(let i = 0; i < hashTags.length; i++) {
    if(hashTags[i][0] !== '#') {
      return 'Хэш-тег должен начинаться с символа #';
    }
    if(hashTags[i].length < 2) {
      return 'Хеш-тег не может состоять только из одной решётки';
    }
    if(hashTags[i].length > 20) {
      return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
    }
    if(!hashtagsRegExp.test(hashTags[i])) {
      return 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.';
    }
    if(hashTags.findIndex((item) => item.toLowerCase() === hashTags[i].toLowerCase()) !== i) {
      return 'Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом';
    }
  }
  if(hashTags.length > 5) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  return '';
}

export function descriptionValidators(value) {
  if(!utils.checkStrMaxLength(value, 140)) {
    return 'Длина комментария не может составлять больше 140 символов;';
  }
  return '';
}

