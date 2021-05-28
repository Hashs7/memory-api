<template>
  <div class="o-page">
    <EditForm
      :value="memory"
      @input="onInput"
      @back="onBack"
      @submit="onSubmit"
    />
  </div>
</template>

<router>
{
  path: '/instrument/:id/souvenir/:memoryId/edit'
}
</router>

<script>
import EditForm from '@/components/memories/creation/views/EditForm';
export default {
  components: { EditForm },
  middleware: 'auth',
  async asyncData({ $api, params }) {
    const memory = (await $api.getMemoryById(params.id, params.memoryId))?.data;
    return {
      memory,
    };
  },
  computed: {
    instrumentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    onBack() {
      this.$router.push({
        name: 'instrument-id',
        params: { id: this.instrumentId },
      });
    },
    onInput(value) {
      this.memory = { ...value };
    },
    async onSubmit() {
      try {
        await this.$api.updateMemory(
          this.instrumentId,
          this.$route.params.memoryId,
          {
            ...this.memory,
          }
        );
        this.updatedHandler();
      } catch (e) {
        this.$buefy.toast.open({
          message: 'Une erreur est survenue',
          type: 'is-error',
        });
        console.error(e);
      }
    },
    updatedHandler() {
      this.$buefy.toast.open({
        message: 'Le souvenir a bien été modifié',
        type: 'is-success',
      });
      this.$router.push({
        name: 'instrument-id',
        params: { id: this.instrumentId },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
