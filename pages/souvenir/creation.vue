<template>
  <ContentForm
    v-if="!showSummary"
    @next="showSummary = true"
    @back="$router.back()"
  />
  <Summary v-else @back="showSummary = false" @submit="submit" />
</template>

<router>
path: /instrument/:id/souvenir/creation
</router>

<script>
import { mapState } from 'vuex';
import Summary from '@/components/memories/creation/views/Summary';
import ContentForm from '../../components/memories/creation/views/ContentForm';

export default {
  name: 'NewInstrument',
  components: {
    ContentForm,
    Summary,
  },
  data() {
    return {
      success: false,
      showSummary: false,
    };
  },
  computed: {
    ...mapState('memory', ['memory']),
    selectedTheme() {
      return this.themes.find((el) => el.selected)?.slug;
    },
    instrumentId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.$store.commit('memory/resetState');
  },
  methods: {
    // Form submitted event
    async submit() {
      try {
        await this.$api.newMemory(this.instrumentId, {
          ...this.memory,
        });
        this.createdHandler();
      } catch (e) {
        throw new Error(e);
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
