<template>
  <div class="o-page search-results-view">
    <div class="o-page__body">
      <h1>Résultats</h1>
      <TabSections
        :sections="[
          {
            name: 'instruments',
            nav: `Instruments`,
            component: 'InstrumentPreview',
            data: instrumentsResults,
          },
          {
            name: 'memories',
            nav: `Souvenirs`,
            component: 'MemoryPreview',
            data: memoriesResults,
          },
        ]"
        :show-index="true"
      />
    </div>
  </div>
</template>

<script>
import TabSections from '@/components/layout/TabSections';
import { mapState } from 'vuex';
export default {
  name: 'SearchResultsView',
  components: { TabSections },
  computed: {
    ...mapState('search', ['results']),
    instrumentsResults() {
      return this.results?.instruments ? this.results.instruments : [];
    },
    memoriesResults() {
      return this.results?.memories ? this.results.memories : [];
    },
    usersResults() {
      return this.results?.users ? this.results.users : [];
    },
  },
};
</script>

<style lang="scss" scoped></style>
