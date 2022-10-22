import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchGallery } from './js/fetch-gallery';
import markupGallery from './js/templates/markup-gallery.hbs'

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryBox: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}
let pageNumber = 0;
let searchQuery = '';

refs.loadMoreBtn.hidden = true;

refs.searchFormEl.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn)

async function onSubmitForm(e) {
    e.preventDefault();
    refs.loadMoreBtn.hidden = true;
    searchQuery = e.target.searchQuery.value;
    pageNumber = 1;
    if (!searchQuery.trim()) {
        Notify.failure('Please, enter a query!', {timeout: 5000, clickToClose: true,});
        return;
    }
    if (searchQuery.length > 100) {
        Notify.failure('The search query  may not exceed 100 characters! Enter a shorter query.', {timeout: 5000, clickToClose: true,});
        return;
    }
    refs.galleryBox.innerHTML = '';    
    galleryMarkup(await fetchGallery(searchQuery, pageNumber));
}

async function onClickLoadMoreBtn() {
    pageNumber ++;
    galleryMarkup(await fetchGallery(searchQuery, pageNumber));
}

function galleryMarkup(data) {
    refs.galleryBox.insertAdjacentHTML('beforeend', markupGallery(data));
    let galleryClick = new SimpleLightbox('.photo-card-link');

    if (pageNumber > 1) smoothlyScroll();
}

function smoothlyScroll () {
    const { height: cardHeight } = refs.galleryBox.firstElementChild.getBoundingClientRect();  
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}