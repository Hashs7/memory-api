<template>
  <form class="o-page__search search" @submit.prevent="submit">
    <input
      v-model="searchQuery"
      class="search__input"
      type="search"
      placeholder="Rechercher"
      @focus="onSearchFocus"
    />
    <div v-if="hasResults" class="search__results">
      <div v-if="hasInstruments" class="result">
        <p class="result__title">Instruments</p>
        <div
          v-for="ins in results.instruments"
          :key="ins._id"
          class="result__list"
        >
          <NuxtLink :to="instrumentLink(ins.id)" class="result__item">
            {{ ins.brand }} - {{ ins.specification }}
          </NuxtLink>
        </div>
      </div>
      <div v-if="hasMemories" class="result">
        <p class="result__title">Souvenirs</p>
        <div
          v-for="mem in results.memories"
          :key="mem._id"
          class="result__list"
        >
          <NuxtLink
            :to="memoryLink(mem.instrumentId, mem.id)"
            class="result__item"
          >
            {{ mem.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  data() {
    return {
      results: {
        instruments: [],
        memories: [],
      },
    };
  },
  computed: {
    ...mapState('search', { searchActive: 'active' }),
    searchQuery: {
      get() {
        return this.$store.state.search.query;
      },
      set(newValue) {
        this.setQuery(newValue);
        if (newValue.length < 1) this.$store.commit('search/clearResults');
      },
    },
    hasInstruments() {
      return !!this.results.instruments.length;
    },
    hasMemories() {
      return !!this.results.memories.length;
    },
    hasResults() {
      return this.hasInstruments || this.hasMemories;
    },
  },
  methods: {
    ...mapMutations('search', ['setActive', 'setQuery']),
    ...mapActions('search', ['search']),
    async submit() {
      await this.search();
    },
    onSearchFocus() {
      if (!this.searchActive) {
        this.setActive(true);
      }
    },
    instrumentLink(id) {
      return {
        name: 'instrument-id',
        params: { id },
      };
    },
    memoryLink(id, memoryId) {
      return {
        name: 'instrument-id-souvenir-memoryId',
        params: { id, memoryId },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.o-page__search {
  position: relative;
  flex-grow: 1;
}

.search__input {
  width: 100%;
  height: 100%;
  background-color: $background-darker;

  &::placeholder {
    color: $gray-darkest;
  }
}

.search__results {
  z-index: 5;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: left;
  background-color: $white;
  transform: translateY(100%);
  box-shadow: $shadow--third;
}

.result__title {
  padding: 4px 8px;
  font-weight: 500;
}

.result__item {
  padding: 4px 16px;
}
</style>
