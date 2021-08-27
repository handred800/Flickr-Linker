<template>
  <div class="container">
    <div class="hero">
      <h1>Flickr-Linker</h1>
      <form @submit.prevent="getAllPhotos">
        <input type="text" v-model="username">
      </form>
    </div>

    <CardList/>
  </div>

</template>

<script>
import apiCreator from '@/assets/api/flickr_api';
import CardList from '@/components/CardList.vue';

const api = apiCreator(process.env.VUE_APP_APIKEY);

export default {
  components: {
    CardList,
  },
  data() {
    return {
      username: '',
      photoset: [],
    };
  },
  mounted() {
  },
  methods: {
    getAllPhotos() {
      api.getUserId(this.username)
        .then(({ data }) => data.user.id)
        .then((uid) => api.getAlbums(uid).then(({ data }) => {
          this.photoset = data.photosets.photoset;
        }));
    },
  },
};
</script>
