import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    loadMoreBtn: document.querySelector('.load-more'),
}

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30719665-02331968f49df94435bfd7c2d';
const per_page = 40;

export async function fetchGallery (searchQuery, pageNumber) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: pageNumber,
    });
    try {
        const response = await axios.get(`${BASE_URL}?${params}`);
        const totalHits = response.data.totalHits;        
        if (totalHits > 0) {
            if (pageNumber === 1) Notify.success(`Hooray! We found ${response.data.totalHits} images`, {timeout: 5000, clickToClose: true,});
            if (pageNumber * per_page > totalHits){
                Notify.failure("We're sorry, but you've reached the end of search results.", {timeout: 5000, clickToClose: true,});
                refs.loadMoreBtn.hidden = true;
            } else refs.loadMoreBtn.hidden = false;            
            return response.data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
                return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
            });
        } else {            
            Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 5000, clickToClose: true,});
            throw new Error();
        }
    } catch (err) {console.log(err)}
}