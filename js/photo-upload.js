/* eslint-disable no-unused-vars */
import * as utils from './utils.js';
import * as validators from './validators.js';
import * as slider from './slider.js';
import * as store from './store.js';

const uploadPhoto = document.querySelector('#upload-file');
const cacelButton = document.querySelector('#upload-cancel');
const imgPreview = document.querySelector('.img-upload__preview');
const scaleControl = document.querySelector('.scale__control--value');
const scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
const hashTagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelWrapper = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

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
  const selectedEffect = event.target.value;
  if(selectedEffect) {
    imgPreview.className = '';
    effectLevelSlider.classList.remove('hidden');
    effectLevelWrapper.classList.remove('hidden');
    switch(selectedEffect) {
      case 'none': {
        effectLevelSlider.classList.add('hidden');
        effectLevelWrapper.classList.add('hidden');
        break;
      }
      case 'chrome':
      case 'sepia':
      case 'marvin':
      case 'phobos':
      case 'heat': {
        imgPreview.classList.add(`effects__preview--${selectedEffect}`);
        break;
      }
    }
  }
  store.setSelectedEffect(event.target.value);
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
  effectLevelSlider.classList.add('hidden');
  effectLevelWrapper.classList.add('hidden');
  imgPreview.style.filter = '';
  effectLevelValue.value = '';
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
  store.setScale(value);
}

function increasingScale() {
  const value = +scaleControl.value + 25 < 100 ? +scaleControl.value + 25 : 100;
  scaleControl.setAttribute('value', value);
  imgPreview.style.transform = `scale(${value/100})`;
  store.setScale(value);
}
