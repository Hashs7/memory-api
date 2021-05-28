<template>
  <NuxtLink :to="link" class="instrument-preview">
    <img
      v-if="instrument.image"
      :src="instrument.image.path"
      alt=""
      class="instrument-preview__img"
    />
  </NuxtLink>
</template>

<script>
export default {
  name: 'InstrumentPreview',
  props: {
    instrument: {
      type: Object,
      required: true,

      id: {
        type: String,
        required: true,
      },
    },
  },
  computed: {
    link() {
      return {
        name: 'instrument-id',
        params: { id: this.instrument.id },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.instrument-preview {
  position: relative;
  display: block;
  width: 100%;
  height: 248px;
  background-color: $gray-lightest;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.instrument-preview__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
