<template>
  <div class="gallery">
    <div class="gallery__container">
      <GalleryMedia
        v-for="m in medias"
        :key="m._id"
        :media="m"
        :selectable="true"
      />
    </div>
    <div class="u-button u-button--outline media-content">
      <span>Importer une photo</span>
      <input
        ref="file"
        class="media-content__input"
        type="file"
        accept="audio/*,video/*,image/*"
        style="opacity: 0"
        @change="previewImg"
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
    previewImg() {
      const fileReader = new FileReader();
      [...this.$refs.file.files].forEach((f) => {
        fileReader.readAsDataURL(f);
        fileReader.addEventListener('loadend', (e) => this.uploadImg(e, f));
      });
    },
    async uploadImg(event, file) {
      this.previewSrc = event.target.result;
      this.showChoices = false;
      const formData = new FormData();
      formData.append('file', file);
      try {
        const { data } = await this.$api.uploadFile(formData);
        this.$store.commit('gallery/addMedia', data.response);
      } catch (e) {
        console.log(e);
      }
    },
    async getMedias() {
      await this.$store.dispatch('gallery/getMedias');
    },
  },
};
</script>

<style>
.gallery__container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  grid-auto-rows: 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
}

.gallery__container::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.gallery__container > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.gallery__container > * {
  background: rgba(0, 0, 0, 0.1);
  border: 1px white solid;
}

.media-content {
  position: relative;
}
.media-content__input {
  z-index: 5;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
