<template>
  <div class="card">
    <img class="card-img" :src="cardImg" alt="">
    <div class="card-title">
      {{cardTitle}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardTitle: String,
    cardImg: String,
    cardContent: String,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/_variable.scss';
.card{
    position: relative;
    height: 0;
    padding-bottom: 56.25%;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 3px 15px -3px rgba(black, .2);
    overflow: hidden;
    cursor: pointer;

    .card-img{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      object-fit: cover;
      transform: translate(-50%,-50%) scale(1);
      transition: 3s;
    }

    // .card-title{
    //   position: absolute;
    //   font-size: 1.3rem;
    //   bottom: 0;
    //   padding: .3em .6em;
    //   font-weight: bold;
    //   border-radius: 0 8px 0 0;
    //   color: $color-secondary;
    //   background-color: #fff;
    //   z-index: 99;
    // }

    &:hover{
      .card-img{
        transform: translate(-50%,-50%) scale(1.1);
      }
    }
}
</style>
