<template>
  <div class="gallery">
    <div class="gallery__container">
      <GalleryMedia
        v-for="m in medias"
        :key="m._id"
        :media="m"
        @select="select(m._id)"
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
    <MediaPreview v-if="preview && mediaSelected" :media="mediaSelected" />
  </div>
</template>

<script>
import MediaPreview from './MediaPreview';
import GalleryMedia from './GalleryMedia';

export default {
  name: 'Gallery',
  components: { GalleryMedia, MediaPreview },
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    medias() {
      return this.$store.state.gallery.medias;
    },
    mediaSelected() {
      return this.$store.getters['gallery/getPreview'];
    },
  },
  mounted() {
    this.getMedias();
    this.$store.commit('gallery/resetSelected');
    this.$store.commit('gallery/setPreview', null);
  },
  methods: {
    select(fileId) {
      if (this.preview) {
        this.$store.commit('gallery/setPreview', fileId);
        return;
      }
      this.$store.commit('gallery/addSelected', fileId);
      this.$emit('selected');
    },

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
</style>
