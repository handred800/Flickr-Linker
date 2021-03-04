<template>
  <div class="container">
    <c-box
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      align-items="center"
      justify-content="center"
    >
      <c-heading textAlign="center" mb="4">Flickr-Linker</c-heading>
      <c-form-control w="400px">
        <c-input-group>
          <c-input
            variant="filled"
            focus-border-color="pink.200"
            placeholder="請輸入使用者名稱"
            v-model="username"
            @keydown.enter.native="searchUser"
            :disabled="isSearchLoading"
          ></c-input>
          <c-input-right-element>
            <c-spinner color="pink.400" v-show="isSearchLoading"></c-spinner>
          </c-input-right-element>
        </c-input-group>
        <c-form-helper-text v-show="!isSearchLoading"
          >輸入後，按下Enter搜尋</c-form-helper-text
        >
      </c-form-control>
    </c-box>
    <c-grid class="card-list" :template-columns="['repeat(1, 1fr)' ,'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']" gap="5">
      <div
        class="card"
        v-for="album in albums"
        :key="album.id">
        <img class="card-bg" :src="getImageUrl(album)">
        <div class="card-overlay card-overlay-hoveralbe">
          <c-text fontSize="1.3rem" fontWeight="bold" color="white">{{ album.title._content }}</c-text>
        </div>
      </div>
    </c-grid>
  </div>
</template>

<script>
import flickrAPI from "@/api/flickr_api.js";
const flickrHandler = flickrAPI("a75c17f0525fb6fab546b7c1ab87e25e");

export default {
  data() {
    return {
      username: "handred800",
      isSearchLoading: false,
      albums: []
    };
  },
  methods: {
    searchUser() {
      const vm = this;
      vm.isSearchLoading = true;
      flickrHandler
        .getUserId(vm.username)
        .then(({ data }) => flickrHandler.getAlbums(data.user.id))
        .then(({ data }) => {
          vm.albums = data.photosets.photoset;
          vm.isSearchLoading = false;
        });
    },
    getImageUrl(data){
      return flickrHandler.getImgSrc(data);
    }
  }
};
</script>

<style lang="scss">
  .card-list{
    margin-top: 5rem;
  }
  .card{
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 0 15px -2px rgba(black, .15);
    transform: translateY(0);
    transition: .3s;

    .card-bg{ transition: 1s; }

    .card-overlay{
      position: absolute;
      padding: .5rem .8rem;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
    }

    .card-overlay-hoverable{
      user-select: none;
      opacity: 0;
      transform: translateY(10px);
      transition: .15s;
    }

    &:hover{
      transform: translateY(-3px);
      box-shadow: 0 5px 15px -2px rgba(black, .15);

      .card-overlay-hoverable{
        opacity: 1;
        transform: translateY(0);
      }
      .card-bg{
        transform: scale(1.1);
      }
    }
  }
</style>
