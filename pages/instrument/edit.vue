<template>
  <div class="o-page o-page--instrument-edit">
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
};
</script>

<style scoped></style>
