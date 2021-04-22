export const state = () => ({
  authenticated: false,
  user: null,
  chatUserId: null,
});

export const mutations = {
  setAuthenticated(state, value) {
    state.authenticated = value;
  },

  setUser(state, value) {
    state.user = value;
    console.log('user', value);
  },

  setChatUserId(state, value) {
    state.chatUserId = value;
  },
};

export const actions = {
  nuxtClientInit({ dispatch }) {
    console.log('client init');
    try {
      dispatch('getUser');
    } catch (e) {
      console.error(e);
    }
  },

  async getUser({ commit }) {
    const res = await this.$api.me();
    if (!res) return;
    commit('setAuthenticated', !!res.data);
    commit('setUser', res.data);
  },

  setUser({ commit }, user) {
    commit('setAuthenticated', !!user);
    commit('setUser', user);
  },

  logout({ commit }) {
    commit('setUser', null);
    commit('setAuthenticated', false);
  },
};
