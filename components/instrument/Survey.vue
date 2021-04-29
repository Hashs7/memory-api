<template>
  <div :class="[questions[index].template]" class="o-page--full survey">
    <div class="survey__indicator">
      <span
        v-for="(q, i) in questions"
        :key="q"
        :class="{ active: index === i }"
        class="survey__indicator-item"
      ></span>
    </div>
    <p class="survey__title">
      {{ questions.length }} questions pour un champion
    </p>
    <div class="survey__container">
      <div class="question">
        <p class="question__title">{{ questions[index].title }}</p>
        <label class="question__response">
          <textarea
            v-model="questions[index].response"
            placeholder="Répondre"
          ></textarea>
        </label>
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
          template: 'black',
        },
        {
          title: 'Ce petit “je ne sais quoi” qui vous a fait craquer ? 😏',
          response: '',
          template: 'pink',
        },
        {
          title: 'Une chanson préférée à jouer avec ? 🎶',
          response: '',
          template: 'blue-light',
        },
        {
          title: 'Une chanson préférée à jouer avec ? 🎶',
          response: '',
          template: 'blue-dark',
        },
        {
          title: 'Une chanson préférée à jouer avec ? 🎶',
          response: '',
          template: 'yellow',
        },
        {
          title: 'Une chanson préférée à jouer avec ? 🎶',
          response: '',
          template: 'brown',
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
    validate() {
      this.$emit('validate', true);
    },
  },
};
</script>

<style lang="scss" scoped>
.survey {
  padding-top: 100px;
  text-align: center;
}

.survey__title {
  margin-top: 32px;
  font-size: 15px;
  font-weight: 700;
}

.survey__indicator {
  display: flex;
  justify-content: center;
}

.survey__indicator-item {
  max-width: 48px;
  width: 100%;
  height: 4px;
  background-color: $white;
  opacity: 0.5;
  margin: 0 2px;
  border-radius: 4px;

  &.active {
    opacity: 1;
  }
}

.question__title {
  margin-top: 58px;
  font-size: 24px;
}

.question__response {
  display: block;
  margin: 52px 28px;
}

.survey {
  &.black {
    color: white;
    background-color: black;
  }

  &.pink {
    color: white;
    background-color: pink;
  }

  &.blue-light {
    color: white;
    background-color: #68beed;
  }

  &.blue-dark {
    color: white;
    background-color: #3764e5;
  }

  &.yellow {
    color: white;
    background-color: #fbc250;
  }

  &.brown {
    color: #dd2303;
    background-color: #fbf4df;
  }
}
</style>
