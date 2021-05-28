<template>
  <div class="o-page">
    <MemoryPreview v-if="memory" :memory="memory" />
  </div>
</template>

<router>
{
  path: '/instrument/:id/souvenir/:memoryId/edit'
}
</router>

<script>
import MemoryPreview from '@/components/memories/MemoryPreview';
export default {
  components: { MemoryPreview },
  middleware: 'auth',
  async asyncData({ $api, params }) {
    const memory = (await $api.getMemoryById(params.id, params.memoryId))?.data;
    return {
      memory,
    };
  },
};
</script>

<style lang="scss" scoped></style>
