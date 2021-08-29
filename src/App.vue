<template>
  <div class="container">
    <div class="hero">
      <h1>Flickr-Linker</h1>
      <form @submit.prevent="getAllPhotos">
        <div class="search-input">
          <input type="text" v-model="username" placeholder="請輸入使用者名稱">
        </div>
      </form>
    </div>
    <div class="row">
      <div
        v-for="album in albums"
        class="column"
        :key="album.id">
        <card @click="openModal(album)" :card-img="getPhotoUrl(album)"/>
        <p>{{album.title._content}}</p>
      </div>
    </div>
    <Modal :modal-title="modalData.title">123123</Modal>
  </div>

</template>

<script>
import MicroModal from 'micromodal';
import apiCreator from '@/assets/api/flickr_api';

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
        data: {},
      },
    };
  },
  mounted() {
    MicroModal.init({
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
    });
  },
  methods: {
    getAllPhotos() {
      api.getUserId(this.username)
        .then(({ data }) => data.user.id)
        .then((uid) => api.getAlbums(uid).then(({ data }) => {
          this.albums = data.photosets.photoset;
        }));
    },
    getPhotoUrl(photoData, size) {
      return api.getImgSrc(photoData, size);
    },
    openModal(album) {
      this.modalData = {
        title: album.title._content,
      };

      MicroModal.show('modal', {
        disableScroll: true,
        awaitCloseAnimation: true,
      });
    },
  },
};
</script>
