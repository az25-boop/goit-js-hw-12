import './css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  renderImages,
  showNotification,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const loadMoreButton = document.querySelector('.load-more');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  currentQuery = searchInput.value.trim();
  if (!currentQuery) {
    showNotification('Please enter a search term!');
    return;
  }

  currentPage = 1;
  totalHits = 0;
  showLoader();
  hideLoadMoreButton();
  clearGallery();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    totalHits = data.totalHits;
    if (data.length === 0) {
      showNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      renderImages(data.hits);
      if (data.hits.length >= 15) {
        showLoadMoreButton();
      }
    }
    searchInput.value = '';
  } catch (error) {
    showNotification(
      'An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await fetchImages(currentQuery, currentPage);
    if ((currentPage - 1) * 15 + data.hits.length >= totalHits) {
      hideLoadMoreButton();
      showNotification('No more images found!');
    } else {
      renderImages(data.hits);
      showLoadMoreButton();
    }
  } catch (error) {
    showNotification(
      'An error occurred while fetching images. Please try again later.'
    );
  } finally {
    hideLoader();
  }
});
