<template>
  <div class="media-content">
    <div v-if="showChoices" class="media-content__container">
      <button type="button" class="u-button u-button--primary">
        Prendre une photo
      </button>
      <label>
        <input
          ref="file"
          type="file"
          accept="audio/*,video/*,image/*"
          class="u-button u-button--primary"
          @change="previewImg"
        />
      </label>
    </div>
    <div v-if="showGallery" class="gallery">
      <span>Galerie</span>
      <MediaGallery />
    </div>
    <div v-if="previewSrc" class="preview">
      <img :src="previewSrc" alt="" class="preview__img" />
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
      file: null,
      previewSrc: null,
    };
  },
  methods: {
    selectGallery() {
      this.showChoices = false;
      this.showGallery = true;
    },

    previewImg() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.file.files[0]);

      fileReader.addEventListener('loadend', (oFREvent) => {
        this.previewSrc = oFREvent.target.result;
        this.showChoices = false;
      });
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

.preview {
  width: 100%;
  height: 100%;
}

.preview__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
