<template>
  <CreateForm v-if="!showSummary" @next="showSummary = true" />
  <Summary
    v-else-if="!showConfidentiality"
    @back="showSummary = false"
    @submit="submit"
    @params="showConfidentiality = true"
  />
  <Confidentiality v-else @select="showConfidentiality = false" />
</template>

<router>
  path: /instrument/:id/souvenir/creation
</router>

<script>
import { mapState } from 'vuex';
import CreateForm from '@/components/memories/creation/views/CreateForm';
import Summary from '@/components/memories/creation/views/Summary';
import Confidentiality from '@/components/memories/creation/views/Confidentiality';
import { formatContentType } from '@/const/memory';

export default {
  name: 'NewInstrument',
  components: {
    CreateForm,
    Summary,
    Confidentiality,
  },
  data() {
    return {
      success: false,
      showSummary: false,
      showConfidentiality: false,
    };
  },
  computed: {
    ...mapState({
      name: (state) => state.memory.name,
      date: (state) => state.memory.date,
      type: (state) => state.memory.type,
      contents: (state) => state.memory.contents,
      themes: (state) => state.memory.themes,
    }),
  },
  methods: {
    // Form submitted event
    async submit() {
      try {
        await this.$api.newMemory(this.$route.params.id, {
          name: this.name,
          date: this.date,
          type: this.type,
          contents: formatContentType(this.contents),
        });
        this.createdHandler();
      } catch (e) {
        console.error(e);
      }
    },

    // Instrument created callback
    createdHandler() {
      this.$buefy.toast.open({
        message: "Le souvenir vient d'être créé",
        type: 'is-success',
      });
    },
  },
};
</script>

<style lang="scss">
.o-page__footer {
  display: flex;
  justify-content: space-between;
}
</style>
