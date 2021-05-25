<template>
  <div
    ref="media"
    :class="{ selected }"
    class="gallery__media"
    @click="selectHandler"
  >
    <img :src="media.path" alt="" />
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
      console.log('click');
      if (!this.selectable) return;
      this.selected = !this.selected;
      if (this.selected) {
        this.showTransition();
      } else {
        this.hideTransition();
      }
      console.log('clicked', this.selected);
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
</style>
