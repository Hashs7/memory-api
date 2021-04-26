<template>
  <div class="memory">
    <h1 v-if="memory">{{ memory.name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  computed: {
    memory() {
      const { memoryId } = this.$route.params;
      return this.instrument?.memories.find((m) => m._id === memoryId);
    },
  },
};
</script>
