import * as utils from './utils.js';

const imgFilters = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

export function show(data, callback) {
  imgFilters.classList.remove('img-filters--inactive');
  defaultFilterButton.addEventListener('click', utils.debounce(filterItems.bind(this, data, callback, 'default')));
  randomFilterButton.addEventListener('click', utils.debounce(filterItems.bind(this, data, callback, 'random')));
  discussedFilterButton.addEventListener('click', utils.debounce(filterItems.bind(this, data, callback, 'discussed')));
}

function filterItems(data, callback, filter) {
  clearItems();
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  switch(filter) {
    case 'random': {
      randomFilterButton.classList.add('img-filters__button--active');
      callback(getRandomFilteredItems(data));
      break;
    }
    case 'discussed': {
      discussedFilterButton.classList.add('img-filters__button--active');
      callback(getDiscussedFilteredItems(data));
      break;
    }
    default: {
      defaultFilterButton.classList.add('img-filters__button--active');
      callback(data);
    }
  }
}

function clearItems() {
  const items = document.querySelectorAll('.picture');
  items.forEach((item) => item.remove());
}

function getRandomFilteredItems(data) {
  const filteredItems = [];
  while(filteredItems.length < 10) {
    const randomItem = data[utils.randomInteger(0, data.length - 1)];
    if(!filteredItems.find((item) => item.id === randomItem.id)) {
      filteredItems.push(randomItem);
    }
  }
  return filteredItems;
}

function getDiscussedFilteredItems(data) {
  return data.sort((a, b) => b.comments.length - a.comments.length);
}
