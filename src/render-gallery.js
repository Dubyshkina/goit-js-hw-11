import { gallery } from './vars';

export function renderGallery(refs) {
  const markup = refs
    .map(
      ref => `<div class="photo-card">
    <a href=${ref.largeImageURL} ><img src="${ref.webformatURL}" alt="${ref.tags}" loading="lazy" class="photo"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes:</b>
        ${ref.likes}
      </p>
      <p class="info-item">
        <b>Views:</b>
        ${ref.views}
      </p>
      <p class="info-item">
        <b>Comments:</b>
        ${ref.comments}
      </p>
      <p class="info-item">
        <b>Downloads:</b>
        ${ref.downloads}
      </p>
    </div>
  </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
