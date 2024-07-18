import './css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  renderImages,
  showNotification,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('#search-form');
  const searchInput = document.querySelector('#search-input');

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (!query) {
      showNotification('Please enter a search term!');
      return;
    }

    clearGallery();
    showLoader();

    fetchImages(query)
      .then(images => {
        if (images.length === 0) {
          showNotification(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        } else {
          renderImages(images);
        }
      })
      .catch(error => {
        showNotification(
          'An error occurred while fetching images. Please try again later.'
        );
      })
      .finally(() => {
        hideLoader();
      });
  });
});
