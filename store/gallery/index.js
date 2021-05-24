export const state = () => ({
  medias: [],
  selected: [],
});

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
