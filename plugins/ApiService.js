import AuthService from './AuthService';

class ApiController {
  constructor($axios) {
    this.$axios = $axios;

    const accessToken = AuthService.getJWT();
    if (accessToken) {
      this.setToken(accessToken);
    }
  }

  setToken(accessToken) {
    this.$axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    };
  }

  me() {
    const token = AuthService.getJWT();
    console.log(token);
    if (!token) {
      return null;
    }
    return this.$axios.get('/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async login(payload) {
    const { data } = await this.$axios.post('/auth/signin', { ...payload });
    AuthService.setJWT(data.accessToken);
    this.setToken(data.accessToken);
    return data;
  }

  register(payload) {
    return this.$axios.post('/auth/signup', { ...payload });
  }

  getOnlineUsers() {
    return this.$axios.get('/user/online');
  }

  getUserConversations() {
    return this.$axios.get('/chat/conversation');
  }

  sendMessage(payload) {
    return this.$axios.post('/chat/message', { ...payload });
  }

  newInstrument(payload) {
    return this.$axios.post('/instrument', { ...payload });
  }

  newMemory(instrumentId, payload) {
    return this.$axios.post(`/instrument/${instrumentId}/memory`, {
      ...payload,
    });
  }

  getInstruments() {
    return this.$axios.get('/instrument');
  }

  getUserInstruments() {
    return this.$axios.get('/instrument/user');
  }

  getInstrumentById(id) {
    return this.$axios.get(`/instrument/${id}`);
  }

  getImage(filename) {
    return this.$axios.get(`/file/${filename}`);
  }
}

export default function ({ $axios }, inject) {
  const api = new ApiController($axios);
  inject('api', api);
}
