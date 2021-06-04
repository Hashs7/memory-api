<template>
  <section class="o-section memories">
    <div class="o-section__head">
      <h3 class="o-section__title">Ses souvenirs</h3>
    </div>
    <template v-if="memoriesCount > 0">
      <MemoryPreview
        v-for="m in memories"
        :key="m._id"
        :link="true"
        :data="m"
        editable
      />
    </template>
    <template v-else>
      <p>Écris l'histoire.</p>
    </template>
  </section>
</template>

<script>
import MemoryPreview from './MemoryPreview';

export default {
  name: 'MemorySection',
  components: { MemoryPreview },
  props: {
    memories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    memoriesCount() {
      return this.memories.length;
    },
  },
};
</script>

<style scoped></style>
