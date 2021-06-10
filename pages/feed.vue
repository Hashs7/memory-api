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
          <li
            v-for="category in categories"
            :key="category.id"
            :class="{ selected: category.selected }"
            @click="toggleCategory(category)"
          >
            {{ category.name }}
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
        <FeedMemorySection
          :memories-cat="memoriesCat"
          :memories-fav-instru="results"
        />
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
      const categories = await $api.fetchAllCategories();
      const results = await $api.fetchFeedFavMemories();

      categories.data = categories.data.map((category, i) => {
        if (i < 2) category.selected = true;
        else category.selected = false;
        return category;
      });

      return {
        instruments: res.data,
        results: results.data,
        categories: categories.data,
      };
    } catch (e) {
      throw new Error(e);
    }
  },
  data() {
    return {
      results: {
        instruments: [],
        memories: [],
      },

      memoriesCat: {},
    };
  },
  computed: {
    ...mapState('search', { searchActive: 'active' }),
    profilePicture() {
      return this.$auth.user?.thumbnail?.path;
    },
    selectedCategoriesMapped() {
      const selectedCats = this.categories.filter((c) => {
        return c.selected;
      });
      return selectedCats.map((s) => s._id);
    },
  },
  methods: {
    ...mapMutations('search', {
      setSearchActive: 'setActive',
    }),
    toggleCategory(category) {
      category.selected = !category.selected;
      this.fetchMemoriesCat();
    },
    mounted() {
      this.fetchMemoriesCat();
    },
    async fetchMemoriesCat() {
      try {
        const { data } = await this.$api.fetchMemoriesCat(
          this.selectedCategoriesMapped
        );

        this.memoriesCat = data;
      } catch (e) {
        console.log(e);
      }
    },
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
.categories-filters li.selected {
  background-color: $background-darker;
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
