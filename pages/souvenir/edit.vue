<template>
  <Summary
    v-if="currentView === 'Summary'"
    edit
    @back="onBack"
    @submit="onSubmit"
    @open-form="currentView = 'ContentForm'"
  />
  <ContentForm
    v-else-if="currentView === 'ContentForm'"
    v-model="memory"
    edit
    @back="currentView = 'Summary'"
  />
</template>

<router>
{
  path: '/instrument/:id/souvenir/:memoryId/edit'
}
</router>

<script>
import ContentForm from '@/components/memories/creation/views/ContentForm';
import Summary from '@/components/memories/creation/views/Summary';
import { mapState } from 'vuex';

export default {
  components: { Summary, ContentForm },
  middleware: 'auth',
  async asyncData({ $api, store, params }) {
    const memory = (await $api.getMemoryById(params.id, params.memoryId))?.data;
    await store.commit('memory/setMemory', memory);
  },
  data() {
    return {
      currentView: 'Summary',
    };
  },
  computed: {
    ...mapState('memory', ['memory']),
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
  beforeRouteLeave(to, from, next) {
    this.$store.commit('memory/resetState');
    next();
  },
};
</script>

<style lang="scss" scoped></style>
