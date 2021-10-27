import * as utils from './utils.js';

const defaultComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

function generatePhotoComments(count, comments) {
  const commentItems = [];
  for(let id = 0; id < count; id++) {
    commentItems.push({
      id,
      avatar: `img/avatar-${utils.randomInteger(1, 6)}.svg`,
      message: comments[utils.randomInteger(0, comments.length - 1)],
      name: `user${utils.randomInteger(1, 1000)}`,
    });
  }
  return commentItems;
}

export function generatePhotoItems() {
  const photoItems = [];
  for(let id = 1; id <= 25; id++) {
    photoItems.push({
      id,
      url: `photos/${id}.jpg`,
      description: 'random desc',
      likes: utils.randomInteger(15, 200),
      comments: generatePhotoComments(utils.randomInteger(5, 25), defaultComments),
    });
  }
  return photoItems;
}
