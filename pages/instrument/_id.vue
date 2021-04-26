<template>
  <div class="instrument">
    <div v-if="instrument">
      <div v-if="instrument.image" class="instrument__image">
        <img :src="profilePicture" alt="" />
      </div>

      <h1>{{ instrument.name }}</h1>
      <h2 v-if="instrument.brand || instrument.specification">
        <span v-if="instrument.brand">{{ instrument.brand }}</span>
        <span v-if="instrument.brand && instrument.specification"> - </span>
        <span v-if="instrument.specification">{{
          instrument.specification
        }}</span>
      </h2>

      <div class="instrument__owner">
        {{ instrument.owner.firstName }} {{ instrument.owner.lastName }}
      </div>

      <NuxtLink :to="addMemmory">Ajouter un souvenir</NuxtLink>

      <div class="memories">
        <h3>Souvenirs ({{ memoriesCount }})</h3>
        <MemoryPreview
          v-for="m in instrument.memories"
          :key="m._id"
          :memory="m"
        />
      </div>
    </div>

    <NuxtChild keep-alive :instrument="instrument" />
  </div>
</template>

<script>
import MemoryPreview from '@/components/memories/MemoryPreview';

export default {
  components: { MemoryPreview },
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
    memoriesCount() {
      return this.instrument.memories.length;
    },
  },
};
</script>
