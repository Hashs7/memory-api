<template>
  <div class="gallery">
    <h3>Galerie</h3>
    <div class="gallery__container">
      <GalleryMedia
        v-for="m in medias"
        :key="m._id"
        :media="m"
        :selectable="true"
      />
    </div>
  </div>
</template>

<script>
import GalleryMedia from './GalleryMedia';
export default {
  name: 'Gallery',
  components: { GalleryMedia },
  computed: {
    medias() {
      return this.$store.state.gallery.medias;
    },
  },
  mounted() {
    this.getMedias();
  },
  methods: {
    async getMedias() {
      await this.$store.dispatch('gallery/getMedias');
    },
  },
};
</script>

<style scoped>
.gallery__container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
}
.media {
}
</style>
