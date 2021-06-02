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

export const getters = {
  getImagesId(state) {
    return state.data.images.map((img) => img._id);
  },
};

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

  addImage(state, value) {
    state.data.images.push(value);
  },

  removeImage(state, _id) {
    const index = state.data.images.findIndex((img) => img._id === _id);
    if (index < 0) return;
    state.data.images.splice(index, 1);
  },
};
