<template>
  <ContentForm
    v-if="currentView === 'ContentForm'"
    edit
    @back="currentView = 'Summary'"
  />
  <Summary
    v-else-if="currentView === 'Summary'"
    edit
    @back="onBack"
    @submit="onSubmit"
    @open-form="currentView = 'ContentForm'"
  />
</template>

<router>
  path: /instrument/:id/souvenir/:memoryId/edit
</router>

<script>
import { mapState } from 'vuex';
import ContentForm from '@/components/memories/creation/views/ContentForm';
import Summary from '@/components/memories/creation/views/Summary';

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
    ...mapState('memory', { memory: 'data' }),
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
      }
    },
    updatedHandler() {
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
