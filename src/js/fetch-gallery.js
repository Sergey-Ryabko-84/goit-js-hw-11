import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30719665-02331968f49df94435bfd7c2d';

export async function fetchGallery (searchQuery, pageNumber) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: pageNumber,
    });
    const response = await axios.get(`${BASE_URL}?${params}`);        
    if (response.data.totalHits > 0) {
        Notify.success(`Hooray! We found ${response.data.totalHits} images`, {timeout: 5000, clickToClose: true,});
        return response.data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
            return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
        });
    } else {            
        Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 5000, clickToClose: true,});
    }
    // try {
    //     const response = await axios.get(`${BASE_URL}?${params}`);        
    //     // console.log(response);
    //     if (response.data.totalHits > 0) {
    //         Notify.success(`Hooray! We found ${response.data.totalHits} images`, {timeout: 5000, clickToClose: true,});
    //         return response.data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    //             return {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
    //         });
    //     } else {            
    //         Notify.failure('Sorry, there are no images matching your search query. Please try again.', {timeout: 5000, clickToClose: true,});
    //     }
    // } catch (err) {console.log(err)}
}