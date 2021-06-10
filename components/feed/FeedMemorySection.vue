<template>
  <div>
    <MemoryPreview
      v-for="result in memoriesFavInstru"
      :key="result.id"
      :data="result"
    >
    </MemoryPreview>

    <section
      v-for="categoryId in memoriesCat"
      :key="categoryId.id"
      class="o-section"
    >
      <div class="o-section__head">
        <h4 class="o-section__title">{{ categoryId.category.name }}</h4>
      </div>

      <MemoryPreview
        v-for="memory in categoryId.memories"
        :key="memory.id"
        :data="memory"
      >
      </MemoryPreview>
    </section>
  </div>
</template>

<script>
import MemoryPreview from '../memories/MemoryPreview';
export default {
  name: 'FeedMemorySection',
  components: { MemoryPreview },
  props: {
    memoriesFavInstru: {
      type: Array,
      required: true,
    },
    memoriesCat: {
      type: Object,
      required: true,
    },
  },
  computed: {},
};
</script>

<style scoped></style>
