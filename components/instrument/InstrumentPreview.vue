<template>
  <NuxtLink :to="link" class="instrument-preview">
    <img
      v-if="instrument.image"
      :src="instrument.image.path"
      alt=""
      class="instrument-preview__img"
    />
    <div class="instrument-preview__content">
      <p class="instrument-preview__name">{{ instrument.name }}</p>
      <p v-if="instrument.buyDate" class="instrument-preview__name">
        Ajouté en {{ instrument.buyDate }}
      </p>
    </div>
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

      name: {
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
  border-radius: 4px;
  overflow: hidden;
  color: $white;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &:after {
    content: '';
    z-index: 1;
    position: absolute;
    height: 70%;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.5018382352941176) 100%
    );
  }
}

.instrument-preview__content {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
}

.instrument-preview__name {
  font-weight: 700;
}

.instrument-preview__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
