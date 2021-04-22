<template>
  <div class="instrument">
    <div v-if="instrument">
      <div class="instrument__image" v-if="instrument.image">
        <img :src="profilePicture" alt="" />
      </div>

      <h1>Name : {{ instrument.name }}</h1>
      <h3>Type : {{ instrument.type }}</h3>
      <h3>Spec : {{ instrument.specification }}</h3>

      <NuxtLink :to="addMemmory">Ajouter un souvenir</NuxtLink>

      <div class="memories">
        <div v-for="m in instrument.memories" :key="m._id" class="memory">
          {{ m.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $api, params }) {
    const instrument = (await $api.getInstrumentById(params.id))?.data;
    return {
      instrument,
    };
  },
  computed: {
    addMemmory() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/creation`;
    },
    profilePicture() {
      return `http://localhost:3000/file/${this.instrument.image}`;
    },
  },
};
</script>
