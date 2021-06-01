const emptyState = {
  data: {
    name: '',
    type: '',
    specification: '',
    brand: '',
    colors: [],
    images: [],
  },
};
// Add memory store
export const state = () => ({
  ...emptyState,
});

export const getters = {};

export const mutations = {
  resetState(state) {
    state = { ...emptyState };
  },
  setInstrumentData(state, payload) {
    state.data = {
      ...emptyState.data,
      ...payload,
    };
  },
  updateProps(state, { prop, value }) {
    state.data[prop] = value;
  },
  toggleColor(state, color) {
    const index = state.data.colors.indexOf(color);
    if (index === -1) {
      state.data.colors.push(color);
      return;
    }
    state.data.colors.splice(index, 1);
  },
};
