<template>
  <div class="card" :class="{'card-inactive': isInactive}">
    <img class="card-img" :src="cardImg" alt="">
    <div class="card-addon-top">
      <slot name="addon-top"></slot>
    </div>
    <div class="card-addon-bottom">
      <slot name="addon-bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardImg: String,
    isInactive: {
      type: Boolean,
      default: false,
    },
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
    &.card-inactive{
      cursor: pointer;
    }

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

    &:hover{
      .card-img{
        transform: translate(-50%,-50%) scale(1.1);
      }
    }

    %card-addon{
      position: absolute;
      z-index: 999;
    }

    .card-addon-top{
      @extend %card-addon;
      right: 10px;
      top: 10px;
    }

    .card-addon-bottom{
      @extend %card-addon;
      left: 10px;
      bottom: 10px;
      width: calc(100% - 20px);
    }
}
</style>
