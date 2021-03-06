import * as utils from './utils.js';
import * as validators from './validators.js';
import * as slider from './slider.js';
import * as api from './api.js';
import * as alertMessagebox from './alert-messagebox.js';

const selectImageForm = document.querySelector('#upload-select-image');
const uploadPhoto = document.querySelector('#upload-file');
const cacelButton = document.querySelector('#upload-cancel');
const imgPreviewWrapper = document.querySelector('.img-upload__preview');
const scaleControl = document.querySelector('.scale__control--value');
const scaleControlSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = document.querySelector('.scale__control--bigger');
const hashTagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelWrapper = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

uploadPhoto.addEventListener('change', (event) => openImageEditor(event));
cacelButton.addEventListener('click', () => closeImageEditor());
scaleControlSmallerBtn.addEventListener('click', () => decreasingScale());
scaleControlBiggerBtn.addEventListener('click', () => increasingScale());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !hashTagsInput.classList.contains('focused') && !descriptionInput.classList.contains('focused')) {
    closeImageEditor();
  }
});

selectImageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  api.uploadData(
    () => {
      alertMessagebox.renderSuccessMessage();
      closeImageEditor();
    },
    () => {
      alertMessagebox.renderErrorMessage(resetForm, document.querySelector('#error'));
    },
    new FormData(selectImageForm),
  );
});

effectsList.addEventListener('click', (event) => {
  const selectedEffect = event.target.value;
  if(selectedEffect) {
    imgPreviewWrapper.className = 'img-upload__preview';
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
        imgPreviewWrapper.classList.add(`effects__preview--${selectedEffect}`);
        break;
      }
    }
  }
});

hashTagsInput.addEventListener('input', () => hashTagsInput.setCustomValidity(validators.hashTagsValidators(hashTagsInput.value)));
hashTagsInput.addEventListener('focus', () => hashTagsInput.classList.add('focused'));
hashTagsInput.addEventListener('blur', () => hashTagsInput.classList.remove('focused'));
descriptionInput.addEventListener('input', () => descriptionInput.setCustomValidity(validators.descriptionValidators(descriptionInput.value)));
descriptionInput.addEventListener('focus', () => descriptionInput.classList.add('focused'));
descriptionInput.addEventListener('blur', () => descriptionInput.classList.remove('focused'));

function openImageEditor(event) {
  const imgPreview = imgPreviewWrapper.querySelector('img');
  const file = event.target.files;
  imgPreview.src = window.URL.createObjectURL(new Blob(file));
  const uploadPhotoSection = document.getElementsByClassName('img-upload__overlay')[0];
  uploadPhotoSection.classList.remove('hidden');
  resetForm();
  utils.toggleBodyModalOpen();
  slider.showSlider();
}

function closeImageEditor() {
  const uploadPhotoSection = document.getElementsByClassName('img-upload__overlay')[0];
  uploadPhotoSection.classList.add('hidden');
  uploadPhoto.value = '';
  utils.toggleBodyModalOpen();
}

function decreasingScale() {
  const value = +scaleControl.value > 25 ? +scaleControl.value - 25 : 25;
  scaleControl.setAttribute('value', value);
  imgPreviewWrapper.style.transform = `scale(${value/100})`;
}

function increasingScale() {
  const value = +scaleControl.value + 25 < 100 ? +scaleControl.value + 25 : 100;
  scaleControl.setAttribute('value', value);
  imgPreviewWrapper.style.transform = `scale(${value/100})`;
}

export function resetForm() {
  effectLevelSlider.classList.add('hidden');
  effectLevelWrapper.classList.add('hidden');
  scaleControl.setAttribute('value', 100);
  imgPreviewWrapper.style.filter = '';
  effectLevelValue.value = '';
  imgPreviewWrapper.style.transform = 'scale(1.0)';
  imgPreviewWrapper.className = 'img-upload__preview';
  hashTagsInput.value = '';
  descriptionInput.value = '';
  document.querySelector('#effect-none').checked = true;
}
