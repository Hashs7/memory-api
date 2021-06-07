<template>
  <div class="search-modal">
    <ResultsView v-if="query.length > 0" />
    <SearchView v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ResultsView from '@/components/search/views/ResultsView';
import SearchView from '@/components/search/views/SearchView';
export default {
  name: 'SearchModal',
  components: { SearchView, ResultsView },
  computed: {
    ...mapState('search', ['query']),
  },
};
</script>

<style lang="scss" scoped>
.search-modal {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100vh - 72px - 86px);
  background: $background;
  z-index: 100;
  overflow-y: auto;
}
</style>
