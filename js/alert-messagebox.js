function closeMessageModal () {
  const messageModal = document.querySelector('.success') || document.querySelector('.error');
  if (messageModal) {
    messageModal.remove();
  }
}

export function renderSuccessMessage() {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const messageModal = successTemplate.cloneNode(true);
  const messageModalButton = messageModal.querySelector('button');
  const closeCallback = (event) => {
    if(!event.key || event.key === 'Escape') {
      closeMessageModal();
      messageModalButton.removeEventListener('click', closeCallback);
      document.removeEventListener('click', closeCallback);
      document.removeEventListener('keydown', closeCallback);
    }
  };
  document.body.appendChild(messageModal);
  messageModalButton.addEventListener('click', closeCallback);
  document.addEventListener('click', closeCallback);
  document.addEventListener('keydown', closeCallback);
}

export function renderErrorMessage(onClose, template) {
  const errorTemplate = template.content.querySelector('.error');
  const messageModal = errorTemplate.cloneNode(true);
  const messageModalButton = messageModal.querySelector('button');
  const closeCallback = (event) => {
    if(!event.key || event.key === 'Escape') {
      event.stopPropagation();
      closeMessageModal();
      onClose();
      messageModalButton.removeEventListener('click', closeCallback);
      document.removeEventListener('click', closeCallback);
      document.removeEventListener('keydown', closeCallback);
    }
  };
  messageModal.style.zIndex = 100;
  document.body.appendChild(messageModal);
  messageModalButton.addEventListener('click', closeCallback);
  document.addEventListener('click', closeCallback);
  document.addEventListener('keydown', closeCallback);
}
