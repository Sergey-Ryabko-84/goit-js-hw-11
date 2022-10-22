import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchGallery } from './js/fetch-gallery';
import markupGallery from './js/templates/markup-gallery.hbs'


const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryBox: document.querySelector('.gallery'),
}

refs.searchFormEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
    e.preventDefault();
    const searchQuery = e.target.searchQuery.value;
    const pageNumber = 1;
    if (!searchQuery.trim()) {
        Notify.failure('Please, enter a query!', {timeout: 5000, clickToClose: true,});
        return;
    }
    if (searchQuery.length > 100) {
        Notify.failure('The search query  may not exceed 100 characters! Enter a shorter query.', {timeout: 5000, clickToClose: true,});
        return;
    }
    fetchGallery(searchQuery, pageNumber)
    .then(data => {
        galleryMarkup(data);
    })
    .catch(console.log)
}

function galleryMarkup(data) {
    refs.galleryBox.innerHTML = markupGallery(data);
    let galleryClick = new SimpleLightbox('.photo-card-link');
}