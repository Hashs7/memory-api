export const state = () => ({
  results: [],
});

export const getters = {};

export const mutations = {
  setResults(state, results) {
    state.results = results;
  },
};
