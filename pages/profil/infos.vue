<template>
  <div class="o-page o-page--profile-edit">
    <div class="">
      <span>Bienvenue !</span>
      <h1>Quels sont vos centres d’intérêts ?</h1>
    </div>

    <div class="">
      <div v-if="currentStep === 0" class="step-0">
        <h3>Sélectionnez vos centres d'intérêts en cliquant dessus</h3>
        <div class="categories">
          <button
            v-for="(c, i) in categories"
            :key="i"
            :class="{ selected: isSelected(c.slug) }"
            class="categories__item"
            @click="selectCategory(c.slug)"
          >
            <span>{{ c.text }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="indicator">
      <span
        v-for="s in MAX_STEPS + 1"
        :key="s"
        :class="{ current: currentStep + 1 === s }"
        class="indicator__item"
      ></span>
    </div>
    <nav class="navigation">
      <button v-if="currentStep !== 0" @click="previousStep">Retour</button>
      <button v-if="currentStep !== MAX_STEPS" @click="nextStep">
        Suivant
      </button>
      <button v-else @click="validate">Valider</button>
    </nav>
  </div>
</template>

<script>
export default {
  components: {},
  middleware: 'auth',
  data() {
    return {
      MAX_STEPS: 2,
      currentStep: 0,
      selectedSlugs: [],
      categories: [
        {
          slug: 'rennovation',
          text: 'Rennovation',
        },
        {
          slug: 'concerts',
          text: 'Concerts',
        },
        {
          slug: 'repetitions',
          text: 'Répétitions',
        },
        {
          slug: 'rock',
          text: 'Rock',
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$auth.$state.user;
    },
  },
  methods: {
    selectCategory(slug) {
      const index = this.selectedSlugs.indexOf(slug);
      if (index === -1) {
        this.selectedSlugs.push(slug);
        return;
      }
      this.selectedSlugs.splice(index, 1);
    },
    isSelected(slug) {
      return this.selectedSlugs.includes(slug);
    },
    previousStep() {
      this.currentStep -= 1;
    },
    nextStep() {
      this.currentStep += 1;
    },
    validate() {
      this.$router.push({
        name: 'feed',
      });
    },
  },
};
</script>

<style lang="scss">
.categories__item {
  cursor: pointer;
  user-select: none;
  display: inline-block;
  border: 2px solid #e7e0c5;
  border-radius: 4px;
  padding: 0 12px;
  height: 32px;
  line-height: 16px;
  background-color: transparent;

  &.selected {
    background-color: #e7e0c5;
  }
}

.indicator {
  display: flex;
  margin: 20px 0;
}

.indicator__item {
  display: inline-block;
  margin: 0 2px;
  width: 20px;
  height: 4px;
  border-radius: 4px;
  background-color: rgba(#373737, 0.5);

  &.current {
    width: 40px;
    background-color: #373737;
  }
}
</style>
