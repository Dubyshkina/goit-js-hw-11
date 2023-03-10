import './css/styles.css';

import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { searchForm, loadBtn, gallery } from './vars';
import { renderGallery } from './render-gallery';

let page = 1;
let q = '';
let lightbox = null;

loadBtn.style.visibility = 'hidden';

async function getPhotos(q, page) {
  const photos = await axios.get(
    `https://pixabay.com/api/?key=34261787-55afb9b453f4d470311699488&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );

  return photos.data;
}

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  q = searchForm.searchQuery.value.trim();
  if (q) {
    page = 1;
    const refs = await getPhotos(q, page);
    if (refs.totalHits <= 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.info(`Hooray! We found ${refs.totalHits} images.`);
      gallery.innerHTML = '';

      renderGallery(refs.hits);
      lightbox = new SimpleLightbox('.photo-card > a');
      const lastPage = Math.ceil(refs.totalHits / 40);
      if(page === lastPage ) {
       loadBtn.style.visibility = 'hidden';
      }else { 
        loadBtn.style.visibility = 'visible';}
     
      
    }
  }
});

loadBtn.addEventListener('click', async event => {
  page += 1;

  const loadRefs = await getPhotos(q, page);
  const lastPageLoad = Math.ceil(loadRefs.totalHits / 40);
  if(page === lastPageLoad ) {
   loadBtn.style.visibility = 'hidden';
 }

  renderGallery(loadRefs.hits);
 
      
      

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  lightbox.refresh();
});
