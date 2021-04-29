<template>
  <div class="slider__item slider__intro">
    <div>
      <label class="title">
        <textarea
          v-model="name"
          type="text"
          class="title__input"
          placeholder="Comment voulez-vous nommer ce souvenir ?"
        ></textarea>
      </label>
      <client-only>
        <b-field label="Date">
          <b-datepicker
            v-model="date"
            locale="fr"
            placeholder="Sélectionner une date"
            icon="calendar-today"
            trap-focus
          >
          </b-datepicker>
        </b-field>
      </client-only>
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
        this.$store.commit('updateName', value);
      },
    },
    date: {
      get() {
        return this.$store.state.memory.date;
      },
      set(value) {
        this.$store.commit('updateDate', value);
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
