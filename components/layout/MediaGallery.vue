<template>
  <div class="media-gallery">
    <div v-for="(m, i) in medias" :key="i" class="media-gallery__item">
      {{ m.url }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaGallery',
  data() {
    return {
      medias: [
        {
          url: '/ddd',
        },
        {
          url: '/ddd',
        },
        {
          url: '/ddd',
        },
        {
          url: '/ddd',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.media-gallery {
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
}

.media-gallery__item {
  width: 74px;
  height: 74px;
  background-color: #c4c4c4;
}
</style>
