import * as utils from './utils.js';

export function openPreviewViewer(data) {
  const previewViewerNode = document.querySelector('.big-picture');
  const closeButton = previewViewerNode.querySelector('.big-picture__cancel');
  updateParams(previewViewerNode, data);
  previewViewerNode.classList.remove('hidden');
  utils.toggleBodyModalOpen();
  closeButton.addEventListener('click', () => {
    closePreviewViewer(previewViewerNode);
    closeButton.removeEventListener('click', () => {});
  });
  document.addEventListener('keydown', ({key}) => {
    if (key === 'Escape') {
      closePreviewViewer(previewViewerNode);
      document.removeEventListener('keydown', () => {});
    }
  });
}

export function closePreviewViewer(node) {
  node.classList.add('hidden');
  utils.toggleBodyModalOpen();
}

function updateParams(node, data) {
  const img = node.querySelector('.big-picture__img img');
  img.src = data.url;
  node.querySelector('.likes-count').textContent = data.likes;
  node.querySelector('.comments-count').textContent = data.comments.length;
  node.querySelector('.social__caption').textContent = data.description;
  updateComments(node.querySelector('.social__comments'), data.comments);
  node.querySelector('.social__comment-count').classList.add('hidden');
  node.querySelector('.comments-loader').classList.add('hidden');
  node.classList.remove('hidden');
}

function updateComments(node, newComments) {
  const fragment = document.createDocumentFragment();
  while(node.children.length > 0) {
    node.removeChild(node.lastChild);
  }
  newComments.forEach((comment) => {
    const commentTemplate = document.getElementById('comment-item').cloneNode(true).content;
    const img = commentTemplate.querySelector('img');
    img.src = comment.avatar;
    img.alt = comment.name;
    commentTemplate.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(commentTemplate);
  });
  node.appendChild(fragment);
}
