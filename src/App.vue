<template>
  <div class="container">
    <div class="hero">
      <h1>Flickr-Linker</h1>
      <form @submit.prevent="getAllAlbums">
        <div class="search-input">
          <input type="text" v-model="username" :disabled="isloadSearch" placeholder="Enter Username">
        </div>
      </form>
    </div>
    <div class="row">
      <div
        v-for="album in albums"
        class="column"
        :key="album.id">
        <Card :isInactive="true" @click="openModal(album)" :card-img="getPhotoUrl(album)"/>
        <div class="title">{{album.title._content}}({{album.count_photos}})</div>
        <div class="subtitle">{{timestampToDate(album.date_create)}}</div>
      </div>
    </div>
    <Modal :modal-title="modalData.title" ref="modal">
      <div class="row" v-if="modalData.photos.length >= 0">
        <div class="column" v-for="photo in modalData.photos" :key="photo.id">
          <Card :card-img="getPhotoUrl(photo)">
            <template v-slot:addon-top>
              <button class="btn">🔍</button>
            </template>
            <template v-slot:addon-bottom>
              <input class="input-sm" type="text" :value="getPhotoUrl(photo)" @click="copyInput" readonly>
            </template>
          </Card>
        </div>
      </div>
    </Modal>
  </div>

</template>

<script>
import apiCreator from '@/assets/api/flickr_api';
import loadingImg from '../public/loading.gif';

import Card from '@/components/Card.vue';
import Modal from '@/components/Modal.vue';

const api = apiCreator(process.env.VUE_APP_APIKEY);

export default {
  components: {
    Card,
    Modal,
  },
  data() {
    return {
      username: '',
      albums: [],
      modalData: {
        title: '',
        photos: [],
      },
      isloadSearch: false,
    };
  },
  mounted() {},
  methods: {
    getAllAlbums() {
      this.isloadSearch = true;
      api.getUserId(this.username)
        .then(({ data }) => data.user.id)
        .then((uid) => api.getAlbums(uid).then(({ data }) => {
          this.isloadSearch = false;
          this.albums = data.photosets.photoset;
        }));
    },
    getAllPhotos(uid, albumId) {
      api.getAlbumPhotos(uid, albumId)
        .then(({ data }) => data.photoset)
        .then((photoset) => {
          this.modalData = {
            title: photoset.title,
            photos: photoset.photo,
          };
        });
    },
    getPhotoUrl(photoData) {
      const keys = Object.keys(photoData);
      return keys.includes('isloading') ? loadingImg : api.getImgSrc(photoData);
    },
    openModal(album) {
      // load placeholder
      this.modalData = {
        title: album.title._content,
        photos: [],
      };
      for (let i = 0; i <= album.count_photos; i += 1) {
        this.modalData.photos.push({
          id: i,
          isloading: true,
        });
      }

      this.getAllPhotos(album.owner, album.id);
      this.$refs.modal.show();
    },
    timestampToDate(timestamp) {
      const date = new Date(parseInt(timestamp * 1000, 10));
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    copyInput(e) {
      const $target = e.target;
      $target.select();
      document.execCommand('copy');
    },
  },
};
</script>
