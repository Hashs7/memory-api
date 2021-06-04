<template>
  <div class="o-page o-page--create">
    <h1 class="o-page__title">Ajouter un instrument</h1>

    <InstrumentForm />

    <button @click="showSurvey = true">Répondre aux questions</button>
    <Survey v-if="showSurvey" @validate="showSurvey = false" />
  </div>
</template>

<script>
import Survey from '@/components/instrument/Survey';
import InstrumentForm from '@/components/instrument/form/InstrumentForm';

export default {
  name: 'NewInstrument',
  components: { InstrumentForm, Survey },
  data() {
    return {
      success: false,
      showSurvey: false,
    };
  },
  created() {
    this.$store.commit('instrument/resetState');
  },
};
</script>

<style lang="scss">
.form__group {
  max-width: 300px;
  margin: 0 auto 16px auto;

  label {
    text-align: left;
    display: block;
  }

  input {
    width: 100%;
  }
}
</style>
