<template>
  <div class="media-content">
    <div v-if="previewSrc" class="preview">
      <img :src="previewSrc" alt="" class="preview__img" />
    </div>
    <label v-else-if="showChoices" class="media-content__container">
      <Gallery @selected="$emit('close')" />
    </label>
    <!--    <label v-else-if="showChoices" class="media-content__container">
      <IconMedia class="media-content__icon" />
      <input
        ref="file"
        class="media-content__input"
        type="file"
        accept="audio/*,video/*,image/*"
        style="opacity: 0"
        @change="previewImg"
      />
    </label>-->
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
      previewSrc: null,
    };
  },
  mounted() {
    if (this.value && this.value.file) {
      this.previewSrc = this.value.file.path;
    }
  },
  methods: {
    previewImg() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.$refs.file.files[0]);
      fileReader.addEventListener('loadend', (e) => this.uploadImg(e));
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
