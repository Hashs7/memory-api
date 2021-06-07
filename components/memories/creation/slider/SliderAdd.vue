<template>
  <div class="slider__item slider__add">
    <div class="slider__container">
      <button
        class="u-button u-button--round"
        type="button"
        @click="addContent('media')"
      >
        <IconMedia />
      </button>
      <button
        class="u-button u-button--round"
        type="button"
        @click="addContent('audio')"
      >
        <IconAudio />
      </button>
      <button
        class="u-button u-button--round"
        type="button"
        @click="addContent('text')"
      >
        Txt
      </button>
    </div>
  </div>
</template>

<script>
import IconAudio from '~/assets/svg/ic_audio.svg?inline';
import IconMedia from '~/assets/svg/ic_media.svg?inline';

export default {
  name: 'SliderAdd',
  components: { IconAudio, IconMedia },
  methods: {
    addContent(type) {
      this.$store.commit('memory/addContent', type);
    },
  },
};
</script>

<style lang="scss" scoped>
.slider__add {
  padding: 8px;

  .u-button {
    margin: 8px;
    background-color: $background;
  }
}

.slider__container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $background-darker;
  border-radius: 4px;
}
</style>
