<template>
  <div class="slider__item slider__intro">
    <div>
      <label class="title">
        <textarea
          v-model="name"
          class="title__input"
          placeholder="Comment voulez-vous nommer ce souvenir ?"
        ></textarea>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideIntro',
  computed: {
    name: {
      get() {
        return this.$store.state.memory.name;
      },
      set(value) {
        this.$store.commit('memory/updateName', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.slider__intro {
  padding: 8px;
}
.title__input {
  font-size: 36px;
  font-weight: 700;
  resize: none;

  &::placeholder {
    font-size: 36px;
    font-weight: 700;
  }
}
</style>
