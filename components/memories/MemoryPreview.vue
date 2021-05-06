<template>
  <nuxt-link v-if="link" :to="linkUrl" class="memory-preview">
    <h4>{{ memory.name }}</h4>
  </nuxt-link>
  <div v-else class="memory-preview">
    <h4>{{ memory.name }}</h4>
    <div v-if="user" class="memory-preview__user">
      <span>Souvenir de {{ user.firstName }} {{ user.lastName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoryPreview',
  props: {
    link: {
      type: Boolean,
      default: false,
    },
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
    linkUrl() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/${this.memory._id}`;
    },
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.memory-preview {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 260px;
  height: 280px;
  margin: auto;
  padding: 16px 24px;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
  color: #3764e5;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow-wrap: break-word;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.memory-preview__user {
  font-size: 13px;
}
</style>
