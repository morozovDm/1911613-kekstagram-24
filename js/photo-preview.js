import * as utils from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = document.querySelector('.comments-loader');
let visibleCommentsCount = 5;
let loadNewCommentsCallbackWrapper;

bigPictureCancel.addEventListener('click', () => closePreviewViewer(bigPicture));
document.addEventListener('keydown', ({key}) => {
  if (key === 'Escape') {
    closePreviewViewer(bigPicture);
  }
});

export function openPreviewViewer(data) {
  updateParams(bigPicture, data);
  bigPicture.classList.remove('hidden');
  utils.toggleBodyModalOpen();
  loadNewCommentsCallbackWrapper = loadNewComments.bind(this, bigPicture, data.comments);
  commentsLoader.addEventListener('click', loadNewCommentsCallbackWrapper);
}

export function closePreviewViewer(node) {
  node.classList.add('hidden');
  utils.toggleBodyModalOpen();
  visibleCommentsCount = 5;
  commentsLoader.removeEventListener('click', loadNewCommentsCallbackWrapper);
  loadNewCommentsCallbackWrapper = null;
}

function updateParams(node, data) {
  const img = node.querySelector('.big-picture__img img');
  img.src = data.url;
  node.querySelector('.likes-count').textContent = data.likes;
  node.querySelector('.comments-count.current').textContent = visibleCommentsCount;
  node.querySelector('.comments-count.total').textContent = data.comments.length;
  node.querySelector('.social__caption').textContent = data.description;
  updateComments(node.querySelector('.social__comments'), data.comments, visibleCommentsCount);
  document.querySelector('.comments-loader').classList.remove('hidden');
  node.classList.remove('hidden');
}

function updateComments(node, newComments, commentsCount) {
  const fragment = document.createDocumentFragment();
  while(node.children.length > 0) {
    node.removeChild(node.lastChild);
  }
  newComments.forEach((comment, index) => {
    if(index < commentsCount) {
      const commentTemplate = document.getElementById('comment-item').cloneNode(true).content;
      const img = commentTemplate.querySelector('img');
      img.src = comment.avatar;
      img.alt = comment.name;
      commentTemplate.querySelector('.social__text').textContent = comment.message;
      fragment.appendChild(commentTemplate);
    }
  });
  node.appendChild(fragment);
}

function loadNewComments(node, comments) {
  visibleCommentsCount = visibleCommentsCount + 5 < comments.length ? visibleCommentsCount + 5 : comments.length;
  node.querySelector('.comments-count.current').textContent = visibleCommentsCount;
  updateComments(node.querySelector('.social__comments'), comments, visibleCommentsCount);
  if(visibleCommentsCount === comments.length) {
    document.querySelector('.comments-loader').classList.add('hidden');
  }
}
