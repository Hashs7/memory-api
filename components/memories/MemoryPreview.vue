<template>
  <component
    :is="link ? 'nuxt-link' : 'div'"
    :to="linkUrl"
    class="memory-preview"
    @click="$emit('click')"
  >
    <div v-if="thumbnail" class="memory-preview__image-container">
      <img
        class="memory-preview__image"
        :src="thumbnail"
        alt="Image du souvenir"
      />
    </div>
    <div class="memory-preview__body">
      <h4 class="memory-preview__name">{{ data.name }}</h4>
      <p class="memory-preview__date">{{ date }}</p>
      <client-only>
        <nuxt-link v-if="editable && isOwner" :to="editLinkUrl" class="u-link">
          Modifier
        </nuxt-link>
      </client-only>
    </div>
  </component>
</template>

<script>
import dayjs from 'dayjs';
import IconBrush from '@/assets/svg/ic_brush.svg?inline';

export default {
  name: 'MemoryPreview',
  components: { IconBrush },
  props: {
    link: {
      type: Boolean,
      default: false,
    },
    data: {
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
      return `/instrument/${id}/souvenir/${this.data.id}`;
    },
    editLinkUrl() {
      return `${this.linkUrl}/edit`;
    },
    user() {
      return this.$store.state.user;
    },
    isOwner() {
      return this.data.createdBy === this.$auth.$state.user?._id;
    },
    thumbnail() {
      return this.data.contents.find((c) => c.type === 'media')?.file?.path;
    },
    date() {
      return dayjs(this.data.date).format('MMMM YYYY');
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
  text-transform: capitalize;
}
</style>
