import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30719665-02331968f49df94435bfd7c2d';
const params = new URLSearchParams({
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
});

export async function fetchGallery (q) {
    params.q = q;
    try {
        const response = await axios.get(`${BASE_URL}?${params}`);        
        // console.log(response);
        if (response.data.totalHits > 0) {
            Notify.success(`Hooray! We found ${response.data.totalHits} images`, {timeout: 5000,});
            return response.data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
                return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
            });
        } else {            
            Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 5000,});
        }
    } catch (err) {console.log(err)}
}