import axios from 'axios';

function flickrAPI(apiKey) {
  const domain = 'https://api.flickr.com/services/rest/?method=flickr.';
  return {
    getAlbums(userId) {
      const url = `${domain}photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=?`;
      return axios.get(url);
    },
    getAlbumPhotos(userId, albumId) {
      const url = `${domain}photosets.getPhotos&api_key=${apiKey}&user_id=${userId}&photoset_id=${albumId}&format=json&nojsoncallback=?`;
      return axios.get(url);
    },
    getUserId(userName) {
      const url = `${domain}people.findByUsername&api_key=${apiKey}&username=${userName}&format=json&nojsoncallback=?`;
      return axios.get(url);
    },
    getImgSrc(photoData, size = '') {
      const id = photoData.primary || photoData.id; // album use [primary], photo use [id]
      return `https://farm${photoData.farm}.staticflickr.com/${photoData.server}/${id}_${photoData.secret}${size}.jpg`;
    },
  };
}

export default flickrAPI;
