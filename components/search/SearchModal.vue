<template>
  <div class="search-modal">
    <SearchResultsView v-if="showResults && query.length > 0" />
    <SearchHistoryView v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchResultsView from '@/components/search/views/SearchResultsView';
import SearchHistoryView from '@/components/search/views/SearchHistoryView';
export default {
  name: 'SearchModal',
  components: { SearchHistoryView, SearchResultsView },
  computed: {
    ...mapState('search', ['query', 'showResults']),
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
