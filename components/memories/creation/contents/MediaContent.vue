<template>
  <div class="media-content">
    <div v-if="previewSrc" class="preview">
      <img :src="previewSrc" alt="" class="preview__img" />
    </div>
    <label v-else-if="showChoices" class="media-content__container">
      <Gallery @selected="previewImg" />
    </label>
  </div>
</template>

<script>
import Gallery from '../../../gallery/Gallery';

export default {
  name: 'MediaContent',
  components: {
    Gallery,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showChoices: true,
      file: null,
    };
  },
  computed: {
    previewSrc() {
      if (this.value && this.value.file) {
        return this.value.file.path;
      }
      return null;
    },
  },
  methods: {
    /*
    previewImg() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.file.files[0]);
      fileReader.addEventListener('loadend', (e) => this.uploadImg(e));
    },
    */
    previewImg() {
      this.$store.dispatch('memory/addSelectedMedia', this.index);
      this.showChoices = false;
    },

    async uploadImg(event) {
      // this.previewSrc = event.target.result;
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
.media-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: $radius;
  overflow: hidden;
}

.media-content__container {
  padding: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
