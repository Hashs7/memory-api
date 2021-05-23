export const state = () => ({
  medias: [],
});

export const mutations = {
  setMedias(state, value) {
    state.medias = value;
  },

  addMedia(state, media) {
    state.medias.push(media);
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
