export const state = () => ({
  active: false,
  query: '',
  results: {},
  showResults: false,
  history: [],
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
  clearResults(state) {
    state.results = {};
  },
  setShowResults(state, value) {
    state.showResults = value;
  },
  setHistory(state, value) {
    state.history = value;
  },
  setLoading(state, value) {
    state.loading = value;
  },
};

export const actions = {
  addToHistory({ state, dispatch }, value) {
    dispatch('readLocalHistory');
    const newHistory = [...state.history];
    if (!newHistory.includes(value)) newHistory.push(value);
    if (newHistory.length > 6) newHistory.shift();
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    dispatch('readLocalHistory');
  },
  readLocalHistory({ commit }) {
    let history = localStorage.getItem('searchHistory');
    history = !history ? [] : JSON.parse(history);
    commit('setHistory', history);
  },
  async search({ state, commit, dispatch }) {
    try {
      commit('setResults', true);
      const results = await this.$api.search(state.query);
      commit('setResults', results.data);
      commit('setShowResults', true);
      dispatch('addToHistory', state.query);
    } catch (e) {
      console.error(e);
    } finally {
      commit('setLoading', false);
    }
  },
};
