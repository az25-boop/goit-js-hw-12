import './css/styles.css';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages, showNotification, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.querySelector('#search-form');
    const searchInput = document.querySelector('#search-input');
    const loadMoreButton = document.querySelector('.load-more');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        currentQuery = searchInput.value.trim();
        if (!currentQuery) {
            showNotification('Please enter a search term!');
            return;
        }

        currentPage = 1;
        showLoader();
        hideLoadMoreButton();
        clearGallery();

        try {
            const images = await fetchImages(currentQuery, currentPage);
            if (images.length === 0) {
                showNotification('Sorry, there are no images matching your search query. Please try again!');
            } else {
                renderImages(images);
                showLoadMoreButton();
            }
        } catch (error) {
            showNotification('An error occurred while fetching images. Please try again later.');
        } finally {
            hideLoader();
        }
    });

    loadMoreButton.addEventListener('click', async () => {
        currentPage += 1;
        showLoader();
        hideLoadMoreButton();

        try {
            const images = await fetchImages(currentQuery, currentPage);
            if (images.length === 0) {
                showNotification('No more images found!');
                hideLoadMoreButton();
            } else {
                renderImages(images);
                showLoadMoreButton();
            }
        } catch (error) {
            showNotification('An error occurred while fetching images. Please try again later.');
        } finally {
            hideLoader();
        }
    });
});
