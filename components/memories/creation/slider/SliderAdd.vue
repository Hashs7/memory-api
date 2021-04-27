<template>
  <div class="slider__item slider__add">
    Ajouter
    <button
      class="u-button u-button--round"
      type="button"
      @click="addContent('media')"
    >
      Ajouter media
    </button>
    <button
      class="u-button u-button--round"
      type="button"
      @click="addContent('audio')"
    >
      Ajouter audio
    </button>
    <button
      class="u-button u-button--round"
      type="button"
      @click="addContent('text')"
    >
      Ajouter texte
    </button>
  </div>
</template>

<script>
export default {
  name: 'SliderAdd',
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
  }
}
</style>
