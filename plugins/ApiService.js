class ApiController {
  constructor($axios) {
    this.$axios = $axios;
  }

  /**
   * Route : User
   */
  me() {
    return this.$axios.get('/user/me');
  }

  async login(payload) {
    const { data } = await this.$axios.post('/auth/signin', payload);
    return data;
  }

  register(payload) {
    return this.$axios.post('/auth/signup', payload);
  }

  getOnlineUsers() {
    return this.$axios.get('/user/online');
  }

  getUserByUsername(username) {
    return this.$axios.get(`/user?username=${username}`);
  }

  getUserConversations() {
    return this.$axios.get('/chat/conversation');
  }

  updateUser(payload) {
    return this.$axios.patch('/user', payload);
  }

  sendMessage(payload) {
    return this.$axios.post('/chat/message', payload);
  }

  /**
   * Route : Memory
   */
  newMemory(instrumentId, payload) {
    return this.$axios.post(`/instrument/${instrumentId}/memory`, payload);
  }

  updateMemory(instrumentId, memoryId, payload) {
    return this.$axios.patch(
      `/instrument/${instrumentId}/memory/${memoryId}`,
      payload
    );
  }

  getMemoryById(instrumentId, memoryId) {
    return this.$axios.get(`/instrument/${instrumentId}/memory/${memoryId}`);
  }

  /**
   * Route : Category
   */
  fetchAllCategories() {
    return this.$axios.get(`/category`);
  }

  /**
   * Route : Instrument
   */
  newInstrument(payload) {
    return this.$axios.post('/instrument', payload);
  }

  getInstruments() {
    return this.$axios.get('/instrument');
  }

  getUserInstruments() {
    return this.$axios.get('/instrument/user');
  }

  getUserInstrumentsByUsername(username) {
    return this.$axios.get(`/instrument/user?username=${username}`);
  }

  getInstrumentById(id) {
    return this.$axios.get(`/instrument/${id}`);
  }

  updateInstrument(id, payload) {
    return this.$axios.patch(`/instrument/${id}`, payload);
  }

  toggleInstrumentToWishlist(id) {
    return this.$axios.patch(`/user/wishlist/${id}`);
  }

  handoverInstrument(id) {
    return this.$axios.patch(`/instrument/${id}/handover`);
  }

  confirmHandoverInstrument(token) {
    return this.$axios.patch(`/instrument/confirm-handover?token=${token}`);
  }

  /**
   * Route : File
   */
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

  getUserMedias() {
    return this.$axios.get('/file/user');
  }

  deleteMedia(id) {
    return this.$axios.delete(`/file/${id}`);
  }

  /**
   * Route : Search
   */
  search(text) {
    return this.$axios.get(`/search?text=${text}`);
  }

  /**
   * Route : Feed
   */
  fetchFeedFavMemories() {
    return this.$axios.get(`/feed`);
  }

  fetchMemoriesCat(categories) {
    return this.$axios.get(`/feed/categories?categories=${categories}`);
  }
}

export default function ({ $axios }, inject) {
  const api = new ApiController($axios);
  inject('api', api);
}
