<template>
  <nuxt-link :to="link" class="memory-preview">
    <h4>{{ memory.name }}</h4>
  </nuxt-link>
</template>

<script>
export default {
  name: 'MemoryPreview',
  props: {
    memory: {
      type: Object,
      required: true,

      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  },
  computed: {
    link() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/${this.memory._id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.memory-preview {
  display: block;
  width: 100%;
  padding: 16px;
  background-color: #f0f0f0;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
