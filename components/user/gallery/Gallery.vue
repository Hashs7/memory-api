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
  data() {
    return {
      medias: [],
    };
  },
  mounted() {
    this.getMedias();
  },
  methods: {
    async getMedias() {
      try {
        const res = await this.$api.getUserMedias();
        this.medias = res.data;
        console.log(res.data);
      } catch (e) {}
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
