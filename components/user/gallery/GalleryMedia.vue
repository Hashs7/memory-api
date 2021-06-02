<template>
  <div
    ref="media"
    :class="{ selected }"
    class="gallery__media"
    @click="selectHandler"
  >
    <img class="gallery__media-img" :src="media.path" alt="" />
  </div>
</template>

<script>
export default {
  name: 'GalleryMedia',
  props: {
    selectable: {
      type: Boolean,
      default: false,
    },
    media: {
      type: Object,
      required: true,

      path: {
        type: String,
        required: true,
      },
      mimetype: {
        type: String,
        required: true,
      },
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    selectHandler() {
      if (!this.selectable) return;
      this.selected = !this.selected;
      if (this.selected) {
        this.showTransition();
      } else {
        this.hideTransition();
      }
    },
    showTransition() {
      // gsap.to(this.$refs.media);
    },
    hideTransition() {},
  },
};
</script>

<style lang="scss" scoped>
.gallery__media {
  position: relative;
  overflow: hidden;

  &.selected:after {
    content: '';
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 4px solid $primary;
  }

  /*&.selected {
    z-index: 1;
    position: fixed;
    left: 20px;
    right: 20px;
    top: 20px;
    bottom: 20px;
    border: 4px solid $primary;
    transition: all 0.3s;
  }*/
}

.gallery__media-img {
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
