<template>
  <div class="o-page o-page--full with-nav">
    <div class="media-preview">
      <button @click="close">Retour</button>
      <div class="o-page__outside">
        <img class="" :src="media.path" alt="" />
      </div>
      <div class="media-preview__actions">
        <a :href="downloadUrl" class="u-button--action">
          <IconDownload />
        </a>
        <button class="u-button--action" @click="deleteMedia">
          <IconTrash />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconTrash from '@/assets/svg/ic_trash.svg?inline';
import IconDownload from '@/assets/svg/ic_download.svg?inline';

export default {
  name: 'MediaPreview',
  components: {
    IconTrash,
    IconDownload,
  },
  props: {
    media: {
      type: Object,
      required: true,
    },
  },
  computed: {
    downloadUrl() {
      return `${this.media.path}?download=true`;
    },
  },
  methods: {
    close() {
      this.$store.commit('gallery/setPreview', null);
    },
    deleteMedia() {
      // TODO
      // this.$store.commit('gallery/remove', null);
    },
  },
};
</script>

<style scoped>
.media-preview {
  height: 100%;
  position: relative;
}

.media-preview__actions {
  position: absolute;
  bottom: 20px;
  right: 0;
}
</style>
