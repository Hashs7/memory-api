<template>
  <div class="">
    <vue-glide
      v-model="active"
      :options="options"
      class="instrument__image-container"
    >
      <vue-glide-slide
        v-for="(image, i) in data"
        :key="i"
        class="instrument__image-container"
      >
        <img class="instrument__image" :src="image.path" alt="" />
      </vue-glide-slide>
      <template slot="control" class="instrument__controls">
        <button
          v-for="(img, i) in data"
          :key="i"
          :data-glide-dir="`=${i}`"
          :class="{ selected: active === i }"
          class="instrument__control"
        ></button>
      </template>
    </vue-glide>
  </div>
</template>

<script>
export default {
  name: 'ImagesCarousel',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      active: 0,
      options: {
        perView: 1,
        gap: 0,
        rewind: false,
      },
    };
  },
};
</script>

<style lang="scss">
[data-glide-el='controls'] {
  z-index: 5;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
}

.instrument__control {
  width: 18px;
  height: 4px;
  border-radius: 4px;
  background-color: rgba($background, 0.5);
  border: none;
  margin: 0 2px;

  &.selected {
    width: 36px;
    background-color: rgba($background, 1);
  }
}

.instrument__image-container {
  height: 100vw;
  max-height: 500px;
  position: relative;
}

.instrument__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
