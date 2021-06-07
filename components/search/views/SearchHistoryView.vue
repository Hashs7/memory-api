<template>
  <div class="search-history-view o-page">
    <div class="o-page__body">
      <h1>Recherche</h1>
      <section class="o-section search-history">
        <h4>Historique</h4>
        <div
          v-for="q in reversedHistory"
          :key="q"
          class="search-history__item"
          @click="selectQuery(q)"
        >
          <div class="search-history__item-body">
            <span class="search-history__title">
              <!-- <strong>+{{ q.resultsNumber }}</strong> -->
              {{ q }}
            </span>
          </div>
          <div class="search-history__item-actions"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'SearchHistoryView',
  computed: {
    ...mapState('search', ['history']),
    reversedHistory() {
      const history = [...this.history];
      return history.reverse();
    },
  },
  methods: {
    ...mapMutations('search', ['setQuery']),
    ...mapActions('search', ['search', 'readLocalHistory']),
    selectQuery(query) {
      this.setQuery(query);
    },
  },
  mounted() {
    this.readLocalHistory();
  },
};
</script>

<style lang="scss" scoped>
.search-history {
  &__item {
    margin-top: 10px;
    padding: 10px 14px;
    border: 1px solid $background-darker;
    border-radius: 3px;
  }

  &__title {
    font-size: 16px;
  }
}
</style>
