class ApiController {
  constructor($axios) {
    this.$axios = $axios;
  }

  me() {
    return this.$axios.get('/user/me');
  }

  async login(payload) {
    const { data } = await this.$axios.post('/auth/signin', { ...payload });
    return data;
  }

  register(payload) {
    return this.$axios.post('/auth/signup', { ...payload });
  }

  getOnlineUsers() {
    return this.$axios.get('/user/online');
  }

  getUserMedias() {
    return this.$axios.get('/file/user');
  }

  getUserConversations() {
    return this.$axios.get('/chat/conversation');
  }

  updateUser(payload) {
    return this.$axios.patch('/user', payload);
  }

  sendMessage(payload) {
    return this.$axios.post('/chat/message', { ...payload });
  }

  newInstrument(payload) {
    return this.$axios.post('/instrument', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
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

  addInstrumentToWishlist(id) {
    return this.$axios.patch(`/user/wishlist/${id}`);
  }

  handoverInstrument(id) {
    return this.$axios.patch(`/instrument/${id}/handover`);
  }

  confirmHandoverInstrument(token) {
    return this.$axios.patch(`/instrument/confirm-handover?token=${token}`);
  }

  getFile(filename) {
    return this.$axios.get(`/file/${filename}`);
  }

  uploadFile(file) {
    return this.$axios.post('/file', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default function ({ $axios }, inject) {
  const api = new ApiController($axios);
  inject('api', api);
}
