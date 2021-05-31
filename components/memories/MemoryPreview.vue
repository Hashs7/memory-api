<template>
  <nuxt-link v-if="link" :to="linkUrl" class="memory-preview">
    <div class="memory-preview__header">
      <h4 class="memory-preview__name">{{ memory.name }}</h4>
      <nuxt-link v-if="editable" :to="editLinkUrl" class="btn">
        <IconBrush />
      </nuxt-link>
    </div>
  </nuxt-link>
  <div v-else class="memory-preview" @click="$emit('click')">
    <div class="memory-preview__header">
      <h4 class="memory-preview__name">{{ memory.name }}</h4>
      <nuxt-link v-if="editable" to="">
        <IconBrush />
      </nuxt-link>
    </div>
    <div v-if="user" class="memory-preview__user">
      <span>Souvenir de {{ user.firstName }} {{ user.lastName }}</span>
    </div>
  </div>
</template>

<script>
import IconBrush from '@/assets/svg/ic_brush.svg?inline';

export default {
  name: 'MemoryPreview',
  components: { IconBrush },
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
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    linkUrl() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/${this.memory.id}`;
    },
    editLinkUrl() {
      return `${this.linkUrl}/edit`;
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

  &__header {
    display: flex;
  }

  &__user {
    font-size: 13px;
  }
}
</style>
