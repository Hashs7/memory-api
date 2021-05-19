export const state = () => ({
  token: null,
  instrumentId: null,
});

export const getters = {
  pendingHandover(state) {
    return state.token && state.instrumentId;
  },
};

export const mutations = {
  setToken(state, value) {
    state.token = value;
  },
  setInstrumentId(state, value) {
    state.instrumentId = value;
  },
};

export const actions = {};
