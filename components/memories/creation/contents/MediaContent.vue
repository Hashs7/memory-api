<template>
  <div class="media-content">
    <div v-if="showChoices" class="media-content__container">
      <button type="button" class="u-button u-button--primary">
        Prendre une photo
      </button>
      <button
        type="button"
        class="u-button u-button--primary"
        @click="selectGallery"
      >
        Choisir une photo
      </button>
    </div>
    <div v-if="showGallery" class="gallery">
      <span>Galerie</span>
      <MediaGallery />
    </div>
  </div>
</template>

<script>
import MediaGallery from '@/components/layout/MediaGallery';

export default {
  name: 'MediaCreation',
  components: {
    MediaGallery,
  },
  data() {
    return {
      showChoices: true,
      showGallery: false,
    };
  },
  methods: {
    selectGallery() {
      this.showChoices = false;
      this.showGallery = true;
    },
  },
};
</script>

<style scoped>
.media-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.media-content__container {
  margin: auto;
}

.u-button {
  margin-bottom: 8px;
}

.gallery {
  margin-top: 0;
}
</style>
