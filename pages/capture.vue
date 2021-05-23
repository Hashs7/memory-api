<template>
  <div class="o-page">
    <h1 class="o-page__title">Nouveau</h1>

    <div class="action" role="button" @click="newInstant">
      <h3 class="action__title">Capturer un moment</h3>
      <p class="action__description">
        Cum abnoba manducare, omnes menses examinare magnum, superbus terrores.
      </p>
      <input
        ref="file"
        class="media-content__input"
        type="file"
        accept="audio/*,video/*,image/*"
        style="opacity: 0"
        @change="previewImg"
      />
    </div>

    <div class="action" role="button" @click="newMemory">
      <h3 class="action__title">Écrire un souvenir</h3>
      <p class="action__description">Heu, secundus abaculus!</p>
    </div>

    <Gallery />
  </div>
</template>

<script>
import Gallery from '../components/user/gallery/Gallery';

export default {
  name: 'Capture',
  components: {
    Gallery,
  },
  methods: {
    newMemory() {
      // TODO Open instrument selector then open instrument memory creation
    },
    newInstant() {
      // TODO Open camera and save image to gallery
    },
    previewImg() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.file.files[0]);
      // fileReader.addEventListener('loadend', (e) => this.uploadImg(e));
    },
    async uploadImg(event) {
      this.previewSrc = event.target.result;
      this.showChoices = false;
      const formData = new FormData();
      formData.append('file', this.$refs.file.files[0]);
      const { data } = await this.$api.uploadFile(formData);
      this.$store.commit('memory/updateContent', {
        index: this.index,
        file: data.response._id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.action {
  position: relative;
  padding: 8px;
  background-color: #fff;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}
.action__title {
  margin-bottom: 16px;
}
.action__description {
  line-height: 1.2;
}
.media-content__input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
