<template>
  <div class="instrument">
    <div v-if="instrument">
      <h1>Name : {{ instrument.name }}</h1>
      <h3>Type : {{ instrument.type }}</h3>
      <h3>Spec : {{ instrument.specification }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $api, params }) {
    const res = await $api.getInstrumentById(params.id);
    return {
      instrument: res.data,
    };
  },
  data() {
    return {
      instrument: null,
    };
  },
};
</script>
