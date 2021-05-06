<template>
  <div class="media-content">
    <label v-if="showChoices" class="media-content__container">
      <input
        ref="file"
        class="media-content__input"
        type="file"
        accept="audio/*,video/*,image/*"
        @change="previewImg"
      />
    </label>
    <div v-if="previewSrc" class="preview">
      <img :src="previewSrc" alt="" class="preview__img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaCreation',
  props: {
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
  width: 100%;
  height: 100%;
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

.media-content__input {
  width: 100%;
  height: 100%;
}
</style>
