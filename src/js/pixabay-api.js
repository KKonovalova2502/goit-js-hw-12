import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export let perPage = 15;

export async function fetchImages(query, currentPage = 1) {
  const API_KEY = '49328511-2c3ca610241153d1ac84b83e7';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
      },
    });

    if (response.data.hits.length === 0) {
      iziToast.info({
        title: 'No results!',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return { images: [], totalHits: 0 };
    }
    return { images: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    console.error('Error:', error);
    return { images: [], totalHits: 0 };
  }
}
