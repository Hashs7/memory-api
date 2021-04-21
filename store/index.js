import ApiService from "~/helpers/ApiService";

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
	},
	setChatUserId(state, value) {
		state.chatUserId = value;
	}
};

export const actions = {
	async initStore({ commit, dispatch }) {
		try {
			dispatch('getUser');
		} catch (e) {
			console.error(e);
		}
	},

	async getUser({ commit }) {
		const res = await ApiService.me();
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
	}
};