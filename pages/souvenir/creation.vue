<template>
  <ContentForm
    v-if="!showSummary"
    @next="showSummary = true"
    @back="$router.back()"
  />
  <Summary
    v-else-if="!showVisibility"
    edit
    @back="showSummary = false"
    @submit="submit"
    @params="showVisibility = true"
  />
  <Visibility v-else @back="showVisibility = false" />
</template>

<router>
path: /souvenir/creation
alias:
 - /instrument/:id/souvenir/creation
</router>

<script>
import { mapState } from 'vuex';
import Summary from '@/components/memories/creation/views/Summary';
import Visibility from '@/components/memories/creation/views/Visibility';
import ContentForm from '../../components/memories/creation/views/ContentForm';

// TODO get instrument id
export default {
  name: 'NewInstrument',
  components: {
    ContentForm,
    Visibility,
    Summary,
  },
  data() {
    return {
      success: false,
      showSummary: false,
      showVisibility: false,
    };
  },
  computed: {
    ...mapState('memory', ['data']),
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
          ...this.data,
        });
        this.createdHandler();
      } catch (e) {
        this.notifyError();
      }
    },

    // Instrument created callback
    createdHandler() {
      this.$router.push({
        name: 'instrument-id',
        params: { id: this.instrumentId },
      });
    },

    notifyError() {
      this.$buefy.toast.open({
        message: 'Le souvenir',
        type: 'is-danger',
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
