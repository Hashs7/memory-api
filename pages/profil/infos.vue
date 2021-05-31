<template>
  <div class="o-page o-page--profile-infos">
    <div class="infos-heading">
      <span>{{ heading[currentStep].title }}</span>
      <h1>{{ heading[currentStep].subtitle }}</h1>
    </div>

    <div class="">
      <UserInfoForm v-if="currentStep === 0" class="step-0" />
      <InstrumentShortForm
        v-if="currentStep === 1"
        ref="stepInstrument"
        class="step-1"
      />
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
import UserInfoForm from '@/components/user/UserInfoForm';
import InstrumentShortForm from '@/components/instrument/InstrumentShortForm';

const STEPS = {
  CATEGORIES: 'categories',
  FIRST_INSTRUMENT: 'first-instrument',
  THIRD: 'third',
};

export default {
  components: { InstrumentShortForm, UserInfoForm },
  middleware: 'auth',
  data() {
    return {
      MAX_STEPS: 2,
      steps: [STEPS.CATEGORIES, STEPS.FIRST_INSTRUMENT, STEPS.THIRD],
      currentStep: 0,
      heading: [
        {
          title: 'Bienvenue !',
          subtitle: 'Quels sont vos centres d’intérêts ?',
        },
        {
          title: 'Construisons votre Motel',
          subtitle: 'Ajoutez votre premier instrument !',
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
    previousStep() {
      this.currentStep -= 1;
    },
    async nextStep() {
      if (this.steps[this.currentStep] === STEPS.FIRST_INSTRUMENT) {
        try {
          await this.$refs.stepInstrument.submit();
          this.currentStep += 1;
        } catch (e) {
          this.notifyError();
        }
        return;
      }
      this.currentStep += 1;
    },
    validate() {
      this.$router.push({
        name: 'feed',
      });
    },
    notifyError() {
      this.$buefy.toast.open({
        message: "L'instrument n'a pas été créé",
        type: 'is-danger',
      });
    },
  },
};
</script>

<style lang="scss">
.infos-heading {
  text-align: center;
  max-width: 500px;
  padding: 0 54px;
  margin: 60px auto;
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
