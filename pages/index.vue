<template>
    <div class="container">
      <c-box class="hero" :class="{ fullpage: albums.length <= 0 }">
        <c-heading textAlign="center" as="h1" mb="4">Flickr-Linker</c-heading>
        <c-form-control maxW="400px" w="100%">
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
          <c-form-helper-text v-show="albums.length <= 0"
            >輸入後，按下Enter搜尋</c-form-helper-text
          >
        </c-form-control>
      </c-box>
      <c-grid
        class="card-list"
        :template-columns="[
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)'
        ]"
        gap="5"
      >
        <div
          class="card"
          v-for="album in albums"
          @click="setNowAlbum(album)"
          :key="album.id"
        >
          <img class="card-bg" :src="getImageUrl(album)" />
          <div class="card-overlay card-overlay-hoveralbe">
            <c-text fontSize="lg" fontWeight="bold" color="white">{{
              album.title._content
            }}</c-text>
            <c-text fontSize="sm" color="gray.300">{{
              timeStampToFormatDate(album.date_create)
            }}</c-text>
          </div>
        </div>
      </c-grid>

      <c-modal
        :is-open="isModalOpen"
        :on-close="
          () => {
            isModalOpen = false;
          }
        "
        is-centered
        scroll-behavior="inside"
        size="full"
        v-if="nowAlbumData !== null"
      >
        <c-modal-content>
          <c-modal-header>
            <c-heading as="h2">{{ nowAlbumData.title._content }}</c-heading>
          </c-modal-header>
          <c-modal-close-button />
          <c-modal-body>
            <c-grid
              class="card-list"
              :template-columns="[
                'repeat(1, 1fr)',
                'repeat(2, 1fr)',
                'repeat(3, 1fr)'
              ]"
              gap="5"
            >
              <c-box class="card" v-for="photo in nowAlbumPhotos" :key="photo.id" @click="copyLink(photo.id)">
                <img :src="getImageUrl(photo)" alt="" class="card-bg">
                <div class="card-overlay">
                  <c-input :ref="`input${photo.id}`" isReadOnly variant="filled" :value="getImageUrl(photo,'_b')" />
                </div>
              </c-box>
            </c-grid>
          </c-modal-body>
        </c-modal-content>
        <c-modal-overlay />
      </c-modal>
    </div>
</template>

<script>
import flickrAPI from "@/api/flickr_api.js";
const flickrHandler = flickrAPI("a75c17f0525fb6fab546b7c1ab87e25e");

export default {
  data() {
    return {
      username: "handred800",
      userId: null,
      isSearchLoading: false,
      albums: [],
      nowAlbumData: null,
      nowAlbumPhotos: [],
      isModalOpen: false
    };
  },
  methods: {
    searchUser() {
      const vm = this;
      vm.isSearchLoading = true;
      flickrHandler
        .getUserId(vm.username)
        .then(({ data }) => {
          vm.userId = data.user.id;
          return flickrHandler.getAlbums(data.user.id);
        })
        .then(({ data }) => {
          vm.albums = data.photosets.photoset;
          vm.isSearchLoading = false;
        });
    },
    setNowAlbum(album) {
      const vm = this;
      vm.isModalOpen = true;
      vm.nowAlbumData = album;
      flickrHandler
        .getAlbumPhotos(vm.userId, album.id)
        .then(({ data }) => {
          vm.nowAlbumPhotos = data.photoset.photo;
        });
    },
    copyLink(id) {
      const inputId = `input${id}`;
      this.$refs[inputId][0].$el.select();
      document.execCommand('copy');
      this.showToast('複製成功', 'success');
    },
    getImageUrl(data, size) {
      return flickrHandler.getImgSrc(data, size);
    },
    timeStampToFormatDate(timestamp) {
      return this.$dayjs(timestamp * 1000).format("YYYY/MM/DD");
    },
    showToast(msg, type = "info") {
      this.$toast({
        title: msg,
        status: type,
        position: 'bottom-right',
        isClosable: false,
        duration: 3000
      });
    }
  }
};
</script>

<style lang="scss">
.hero {
  padding: 3rem 10px;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 1s;
  &.fullpage {
    height: 100vh;
  }
}

.card-list {
  padding: 0 10px;
}
.card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(black, 0.15);
  transform: translateY(0);
  transition: 0.3s;
  cursor: pointer;

  .card-bg {
    width: 100%;
    transition: 1s;
  }

  .card-overlay {
    position: absolute;
    padding: 0.5rem 0.8rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    input{
      background-color: #fff;
      &::selection{
        background-color: deeppink;
        color: #fff;
      }
    }
  }

  .card-overlay-hoverable {
    user-select: none;
    opacity: 0;
    transform: translateY(10px);
    transition: 0.15s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 10px rgba(black, 0.15);

    .card-overlay-hoverable {
      opacity: 1;
      transform: translateY(0);
    }
    .card-bg {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: translateY(0);
    transition: 0.15s;
  }
}
</style>
