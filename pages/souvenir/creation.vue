<template>
  <CreateForm v-if="!showSummary" @next="showSummary = true" />
  <Summary
    v-else-if="!showConfidentiality"
    @back="showSummary = false"
    @submit="submit"
    @params="showConfidentiality = true"
  />
  <Confidentiality v-else @back="showConfidentiality = false" />
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
    selectedTheme() {
      return this.themes.find((el) => el.selected)?.slug;
    },
    instrumentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    // Form submitted event
    async submit() {
      try {
        await this.$api.newMemory(this.instrumentId, {
          name: this.name,
          date: this.date,
          type: this.type,
          template: this.selectedTheme,
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
      setTimeout(() => {
        this.$router.push({
          name: 'instrument-id',
          params: { id: this.instrumentId },
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.o-page--create {
  background-color: #fffefa;
}

.o-page__footer {
  display: flex;
  justify-content: space-between;
}
</style>
