import * as utils from './utils.js';
import * as validators from './validators.js';

const uploadPhoto = document.querySelector('#upload-file');
const cacelButton = document.querySelector('#upload-cancel');
const imgPreview = document.querySelector('.img-upload__preview');
const scaleControl = document.querySelector('.scale__control--value');
const scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
const hashTagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectsList = document.querySelector('.effects__list');

uploadPhoto.addEventListener('change', () => openImageEditor());
cacelButton.addEventListener('click', () => closeImageEditor());
scaleControlSmallerBtn.addEventListener('click', () => decreasingScale());
scaleControlBiggerBtn.addEventListener('click', () => increasingScale());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !hashTagsInput.classList.contains('focused') && !descriptionInput.classList.contains('focused')) {
    closeImageEditor();
  }
});

effectsList.addEventListener('click', (event) => {
  imgPreview.className = '';
  if (event.target.classList.contains('effect-chrome')) {
    imgPreview.classList.add('effects__preview--chrome');
  } else if(event.target.classList.contains('effect-sepia')) {
    imgPreview.classList.add('effects__preview--sepia');
  } else if (event.target.classList.contains('effect-marvin')) {
    imgPreview.classList.add('effects__preview--marvin');
  } else if (event.target.classList.contains('effect-phobos')) {
    imgPreview.classList.add('effects__preview--phobos');
  } else if (event.target.classList.contains('effect-heat')) {
    imgPreview.classList.add('effects__preview--heat');
  }
});

hashTagsInput.addEventListener('input', () => hashTagsInput.setCustomValidity(validators.hashTagsValidators(hashTagsInput.value)));
hashTagsInput.addEventListener('focus', () => hashTagsInput.classList.add('focused'));
hashTagsInput.addEventListener('blur', () => hashTagsInput.classList.remove('focused'));
descriptionInput.addEventListener('input', () => descriptionInput.setCustomValidity(validators.descriptionValidators(descriptionInput.value)));
descriptionInput.addEventListener('focus', () => descriptionInput.classList.add('focused'));
descriptionInput.addEventListener('blur', () => descriptionInput.classList.remove('focused'));

function openImageEditor() {
  const uploadPhotoSection = document.getElementsByClassName('img-upload__overlay')[0];
  uploadPhotoSection.classList.remove('hidden');
  utils.toggleBodyModalOpen();
}

function closeImageEditor() {
  const uploadPhotoSection = document.getElementsByClassName('img-upload__overlay')[0];
  uploadPhotoSection.classList.add('hidden');
  scaleControl.setAttribute('value', 100);
  uploadPhoto.value = '';
  imgPreview.style.transform = 'scale(1.0)';
  imgPreview.className = '';
  utils.toggleBodyModalOpen();
}

function decreasingScale() {
  const value = +scaleControl.value > 25 ? +scaleControl.value - 25 : 25;
  scaleControl.setAttribute('value', value);
  imgPreview.style.transform = `scale(${value/100})`;
}

function increasingScale() {
  const value = +scaleControl.value + 25 < 100 ? +scaleControl.value + 25 : 100;
  scaleControl.setAttribute('value', value);
  imgPreview.style.transform = `scale(${value/100})`;
}
