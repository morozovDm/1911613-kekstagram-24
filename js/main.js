const defaultComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

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

function generatePhotoComments(count, comments) {
  const commentItems = [];
  for(let id = 0; id < count; id++) {
    commentItems.push({
      id,
      avatar: `img/avatar-${randomInteger(1, 6)}.svg`,
      message: comments[randomInteger(0, comments.length - 1)],
      name: `user${randomInteger(1, 1000)}`,
    });
  }
  return commentItems;
}

function generatePhotoItems() {
  const photoItems = [];
  for(let id = 1; id <= 25; id++) {
    photoItems.push({
      id,
      url: `photos/${id}.jpg`,
      description: 'random desc',
      likes: randomInteger(15, 200),
      comments: generatePhotoComments(randomInteger(5, 25), defaultComments)
    });
  }
  return photoItems;
}

randomInteger(0, 1);
checkStrMaxLength('str', 3);
console.log(generatePhotoItems());
