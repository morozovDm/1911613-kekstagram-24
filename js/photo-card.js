
export function generateCards(data) {
  const picturesSection = document.getElementsByClassName('pictures')[0];
  const fragment = document.createDocumentFragment();
  if(data) {
    data.forEach((item) => {
      const template = document.querySelector('#picture').cloneNode(true).content;
      template.querySelector('img').src = item.url;
      template.querySelector('.picture__likes').textContent = item.likes;
      template.querySelector('.picture__comments').textContent = item.comments.length;
      fragment.appendChild(template);
    });
    picturesSection.appendChild(fragment);
  }
}
