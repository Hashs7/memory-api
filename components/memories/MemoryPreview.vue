<template>
  <component
    :is="link ? 'nuxt-link' : 'div'"
    :to="linkUrl"
    class="memory-preview"
    @click="$emit('click')"
  >
    <div class="memory-preview__image-container">
      <img
        class="memory-preview__image"
        :src="thumbnail"
        alt="Image du souvenir"
      />
    </div>
    <div class="memory-preview__body">
      <h4 class="memory-preview__name">{{ memory.name }}</h4>
      <p class="memory-preview__date">{{ memory.date }}</p>
      <nuxt-link v-if="isOwner" :to="editLinkUrl" class="btn">
        Modifier
      </nuxt-link>
    </div>
  </component>
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
    isOwner() {
      return this.memory.createdBy === this.$auth.$state.user?._id;
    },
    thumbnail() {
      const image = this.memory.contents.find((c) => c.type === 'media')?.file
        .path;
      return image;
    },
  },
};
</script>

<style lang="scss" scoped>
.memory-preview {
  display: block;
  width: 100%;
  margin: 20px 0;
  padding: 16px;
  background-color: $white;
  border-radius: 4px;
  overflow-wrap: break-word;
  box-shadow: $shadow--second;
}
.memory-preview__image-container {
  height: 232px;
  overflow: hidden;
  border-radius: 4px;
}
.memory-preview__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.memory-preview__body {
  padding-top: 12px;
}
.memory-preview__name {
  font-family: $font-secondary;
  font-size: 16px;
}
.memory-preview__date {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 300;
}
</style>
