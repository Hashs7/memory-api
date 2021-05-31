<template>
  <div class="o-page o-page--instrument-edit">
    <h1 class="o-page__title">Modifier {{ name }}</h1>
    <InstrumentForm :data="instrument" />
  </div>
</template>

<router>
path: /instrument/:id/edit
</router>

<script>
import InstrumentForm from '@/components/instrument/InstrumentForm';

export default {
  components: { InstrumentForm },
  async asyncData({ $api, params }) {
    const instrument = (await $api.getInstrumentById(params.id))?.data;
    return {
      instrument,
    };
  },
  computed: {
    name() {
      if (this.instrument.name) {
        return this.instrument.name;
      }
      return `${this.instrument.brand} ${this.instrument.specification}`;
    },
  },
};
</script>

<style scoped></style>
