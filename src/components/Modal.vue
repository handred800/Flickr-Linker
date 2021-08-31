<template>
  <div class="modal micromodal-slide" id="modal" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div class="modal__container" role="dialog" aria-modal="true">
        <header class="modal__header">
          <h2 class="modal__title">{{modalTitle}}</h2>
          <button
            class="modal__close"
            aria-label="Close modal"
            data-micromodal-close
          ></button>
        </header>
        <div class="modal__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MicroModal from 'micromodal';
import Scrollbar from 'smooth-scrollbar';

export default {
  props: {
    modalTitle: String,
  },
  data() {
    return {
      scrollbar: null,
    };
  },
  mounted() {
    this.scrollbar = Scrollbar.init(document.querySelector('.modal__content'));
  },
  methods: {
    reset() {
      this.scrollbar.scrollTo(0, 0);
    },
    show() {
      MicroModal.show('modal', {
        disableScroll: true,
        awaitCloseAnimation: true,
        onShow: (() => this.reset()),
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/_variable.scss';

.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(#000, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 999;
}

.modal__container {
  width: 100%;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  overflow-y: auto;
  box-sizing: border-box;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal__title {
  margin-top: 0;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 1.25;
  color: $color-secondary;
  box-sizing: border-box;
}

.modal__close {
  font-size: 1.8rem;
  font-weight: bold;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.modal__header .modal__close:before {
  content: "\2715";
}

.modal__content {
  height: 100%;
  max-height: 75vh;
  margin: 1rem 0;
  line-height: 1.5;
}

@keyframes mmfadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes mmfadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes mmslideIn {
  from {
    transform: translateY(15%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes mmslideOut {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(15%);
  }
}

.micromodal-slide {
  display: none;
}

.micromodal-slide.is-open {
  display: block;
}

.micromodal-slide[aria-hidden="false"] .modal__overlay {
  animation: mmfadeIn 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.micromodal-slide[aria-hidden="false"] .modal__container {
  animation: mmslideIn 0.3s cubic-bezier(0, 0, 0.2, 1);
}

.micromodal-slide[aria-hidden="true"] .modal__overlay {
  animation: mmfadeOut 0.15s cubic-bezier(0, 0, 0.2, 1);
}

.micromodal-slide[aria-hidden="true"] .modal__container {
  animation: mmslideOut 0.15s cubic-bezier(0, 0, 0.2, 1);
}

.micromodal-slide .modal__container,
.micromodal-slide .modal__overlay {
  will-change: transform;
}
</style>
