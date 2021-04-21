class AuthService {
	constructor() {}

	getJWT() {
		return JSON.parse(localStorage.getItem('jwt'));
	}

	setJWT(token) {
		localStorage.setItem('jwt', JSON.stringify(token));
	}

	deleteJWT() {
		localStorage.removeItem('jwt');
	}
}

export default new AuthService();