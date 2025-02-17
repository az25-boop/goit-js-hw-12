const API_KEY = '44852213-a2483cc0047435af0fdb3dda4';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  console.log('Fetch URL:', url);
  try {
    const response = await fetch(url);
    console.log('Fetch URL:', url);

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
