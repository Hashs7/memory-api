<template>
  <div class="slider__item slider__add">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  background-color: transparent;

  .u-button {
    margin: 8px;
    background-color: $gray-lightest;
  }
}
</style>
