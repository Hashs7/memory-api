import axios from 'axios';
import AuthService from './AuthService';

class ApiService {
	constructor() {
		this.instance = axios.create({
			baseURL: process.env.VUE_APP_API_URL,
			timeout: 1000,
		});
		const accessToken = AuthService.getJWT();
		if (accessToken) {
			this.setToken(accessToken);
		}
	}

	setToken(accessToken) {
		this.instance.defaults.headers = {
			'Accept' : 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + accessToken
		};
	}

	me() {
		const token = AuthService.getJWT();
		if (!token) {
			return null
		}
		return this.instance.get('/user/me', { headers: {"Authorization" : `Bearer ${token}`} });
	}

	async login(payload) {
		const { data } = await this.instance.post('/auth/signin', { ...payload });
		AuthService.setJWT(data.accessToken);
		this.setToken(data.accessToken);
		return data
	}

	register(payload) {
		return this.instance.post('/auth/signup', { ...payload  });
	}

	getOnlineUsers() {
		return this.instance.get('/user/online');
	}

	getUserConversations() {
		return this.instance.get('/chat/conversation');
	}

	sendMessage(payload) {
		return this.instance.post('/chat/message', { ...payload });
	}


	newInstrument(payload) {
		return this.instance.post('/instrument', { ...payload });
	}

	getInstruments() {
		return this.instance.get('/instrument');
	}

	getInstrumentById(id) {
		return this.instance.get(`/instrument/${id}`);
	}
}

export default new ApiService();