<template>
  <div class="o-page--full survey">
    <div class="survey__indicator"></div>
    <div class="survey__container">
      <div class="question">
        <span class="question__title">{{ questions[index].title }}</span>
      </div>
    </div>
    <div class="survey__controls">
      <button v-if="index !== questions.length - 1" @click="nextQuestion">
        Suivant
      </button>
      <button v-else @click="validate">Valider</button>
      <button v-if="index !== 0" @click="previousQuestion">Retour</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Survey',
  data() {
    return {
      index: 0,
      questions: [
        {
          title: 'Dernier voyage avec ? ✈',
          response: '',
          template: '',
        },
        {
          title: 'Ce petit “je ne sais quoi” qui vous a fait craquer ? 😏',
          response: '',
          template: '',
        },
        {
          title: 'Une chanson préférée à jouer avec ? 🎶',
          response: '',
          template: '',
        },
      ],
    };
  },
  methods: {
    previousQuestion() {
      if (this.index === 0) return;
      this.index -= 1;
    },
    nextQuestion() {
      if (this.index >= this.questions.length - 1) return;
      this.index++;
    },
    validate() {},
  },
};
</script>

<style lang="scss" scoped>
.survey {
  margin-top: 100px;
  background-color: $white;
}
</style>
