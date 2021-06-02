export const state = () => ({
  medias: [],
  selected: [],
  preview: null,
});

export const getters = {
  getPreview(state) {
    if (!state.preview) return;
    return state.medias.find((m) => m._id === state.preview);
  },

  getLastSelected(state) {
    if (!state.selected[0]) return;
    return state.medias.find((m) => m._id === state.selected[0]);
  },
};

export const mutations = {
  setMedias(state, value) {
    state.medias = value;
  },

  addMedia(state, media) {
    state.medias.push(media);
  },

  resetSelected(state) {
    state.selected = [];
  },

  addSelected(state, media) {
    state.selected.push(media);
  },

  setPreview(state, id) {
    state.preview = id;
  },

  removeSelected(state, _id) {
    const index = state.selected.indexOf(_id);
    state.selected.splice(index, 1);
  },
};

export const actions = {
  async getMedias({ commit }) {
    try {
      const res = await this.$api.getUserMedias();
      commit('setMedias', res.data);
    } catch (e) {}
  },
};
