export const state = () => ({
  active: false,
  query: '',
  results: {},
  showResults: false,
  loading: false,
});

export const getters = {};

export const mutations = {
  setActive(state, value) {
    state.active = value;
  },
  setQuery(state, value) {
    state.query = value;
  },
  setResults(state, results) {
    state.results = results;
  },
  setShowResults(state, value) {
    state.showResults = value;
  },
  setLoading(state, value) {
    state.loading = value;
  },
};

export const actions = {
  async search({ state, commit }) {
    try {
      commit('setResults', true);
      const results = await this.$api.search(state.query);
      commit('setResults', results.data);
      commit('setShowResults', true);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setLoading', false);
    }
  },
};
