<template>
  <div
    ref="media"
    :class="{ selected }"
    class="gallery-media"
    @click="$emit('select')"
  >
    <img class="gallery-media__img" :src="path" alt="" />
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
  computed: {
    path() {
      return `${this.media.path}?w=100`;
    },
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
.gallery-media {
  position: relative;
  overflow: hidden;
  cursor: pointer;

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
}

.gallery-media__img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
}
</style>
