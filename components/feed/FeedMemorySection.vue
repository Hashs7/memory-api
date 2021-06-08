<template>
  <div>
    <MemoryPreview v-for="result in data" :key="result.id" :data="result">
    </MemoryPreview>
  </div>
</template>

<script>
import MemoryPreview from '../memories/MemoryPreview';
export default {
  name: 'FeedMemorySection',
  components: { MemoryPreview },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {},
};
</script>

<style scoped></style>
