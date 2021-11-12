const slider = document.querySelector('.effect-level__slider');
const imgPreview = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectOptions = {
  chrome: { style: 'grayscale', min: 0, max: 1, step: 0.1 },
  sepia: { style: 'sepia', min: 0, max: 1, step: 0.1 },
  marvin: { style: 'invert', min: 0, max: 100, step: 1 },
  phobos: { style: 'blur', min: 0, max: 3, step: 0.1 },
  heat: { style: 'brightness', min: 1, max: 3, step: 0.1 },
};
let selectedEffect = 'none';

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

slider.noUiSlider.on('update', ([value]) => {
  effectLevelValue.value = +value;
  switch(selectedEffect) {
    case 'chrome':
    case 'sepia':
    case 'heat': {
      imgPreview.style.filter = `${effectOptions[selectedEffect].style}(${+value})`;
      break;
    }
    case 'marvin': {
      imgPreview.style.filter = `${effectOptions[selectedEffect].style}(${+value}%)`;
      break;
    }
    case 'phobos': {
      imgPreview.style.filter = `${effectOptions[selectedEffect].style}(${+value}px)`;
      break;
    }
  }
});

effectsList.addEventListener('click', (event) => {
  imgPreview.style.filter = '';
  effectLevelValue.value = '';
  selectedEffect = event.target.value;
  if(selectedEffect && selectedEffect !== 'none') {
    setSliderParams(selectedEffect);
  }
});

function setSliderParams(selected) {
  slider.noUiSlider.updateOptions({
    range: {
      min:effectOptions[selected].min,
      max: effectOptions[selected].max,
    },
    step: effectOptions[selected].step,
    start: effectOptions[selected].max,
  });
}
