class AuthService {
  getJWT() {
    if (process.server) return;
    return JSON.parse(localStorage.getItem('jwt'));
  }

  setJWT(token) {
    if (process.server) return;
    localStorage.setItem('jwt', JSON.stringify(token));
  }

  deleteJWT() {
    if (process.server) return;
    localStorage.removeItem('jwt');
  }
}

export default new AuthService();
