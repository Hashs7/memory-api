<template>
  <div class="memory">
    <div class="memory__container">
      <h1 v-if="memory" class="memory__title">{{ memory.name }}</h1>
    </div>
    <nuxt-link :to="closeMemory" class="memory__background"></nuxt-link>
  </div>
</template>

<router>
  path: /instrument/:id/souvenir/:memoryId
</router>

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
    closeMemory() {
      const { id } = this.$route.params;
      return `/instrument/${id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.memory {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
}

.memory__background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  height: 100vh;
}

.memory__container {
  position: relative;
  z-index: 10;
  padding: 32px;
  height: 100%;
  background-color: #fff;
}

.memory__title {
  font-size: 40px;
}
</style>
