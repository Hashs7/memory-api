<template>
  <div class="o-page">
    <div class="o-page__header">
      <SearchBar />
      <transition name="fade" mode="out-in">
        <NuxtLink v-if="!searchActive" to="/profil" class="profile">
          <span v-if="!$auth.loggedIn">Profil</span>
          <img
            v-if="profilePicture"
            :src="profilePicture"
            alt="Photo de profil"
          />
        </NuxtLink>
        <button
          v-else
          class="u-button u-button--text"
          @click="setSearchActive(false)"
        >
          Annuler
        </button>
      </transition>
      <SearchModal v-if="searchActive" />
    </div>

    <div class="o-page__body">
      <h1 class="o-page__title">Explorer</h1>

      <section>
        <ul class="categories-filters">
          <li v-for="category in categories" :key="category.id">
            <a href="">{{ category.name }}</a>
          </li>
        </ul>
      </section>
      <section class="o-section">
        <div class="o-section__head">
          <h4 class="o-section__title">Actualités des instruments favoris</h4>
          <button class="u-link">Voir tout</button>
        </div>
      </section>

      <section>
        <FeedMemorySection :data="results.memoriesFavInstru" />
      </section>
    </div>
  </div>
</template>

<router>
  path: /decouvrir
</router>

<script>
import { mapMutations, mapState } from 'vuex';
import SearchBar from '../components/search/SearchBar';
import SearchModal from '../components/search/SearchModal';
import FeedMemorySection from '../components/feed/FeedMemorySection';

export default {
  components: { FeedMemorySection, SearchModal, SearchBar },
  async asyncData({ $api }) {
    try {
      const res = await $api.getInstruments();
      const results = await $api.fetchFeed();
      const categories = await $api.fetchAllCategories();

      return {
        instruments: res.data,
        results: results.data,
        categories: categories.data,
      };
    } catch (e) {
      throw new Error(e);
    }
  },
  computed: {
    ...mapState('search', { searchActive: 'active' }),
    profilePicture() {
      return this.$auth.user?.thumbnail?.path;
    },
  },
  methods: {
    ...mapMutations('search', {
      setSearchActive: 'setActive',
    }),
  },
};
</script>

<style lang="scss" scoped>
.categories-filters {
  display: flex;
  flex-wrap: wrap;
}
.categories-filters li {
  border: solid 1px $background-darker;
  padding: 2px 12px;
  border-radius: 6px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.o-page__header {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.o-page__title {
  margin-top: 20px;
}

.profile {
  width: 36px;
  height: 36px;
  margin-left: 12px;
  background-color: $background-darker;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
