<template>
  <div class="create">
    <h1>S'inscrire</h1>
    <form @submit="submit">
      <div class="form__group">
        <b-field label="Surnom">
          <b-input type="text" v-model="username"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Email">
          <b-input type="email" v-model="email"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Mot de passe">
          <b-input type="password" v-model="password" password-reveal>
          </b-input>
        </b-field>
      </div>
      <button type="submit" class="button is-primary">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import AuthService from '~/plugins/AuthService';
import ApiService from '~/plugins/ApiService';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      try {
        const res = await ApiService.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        console.log('signed up', res);
        AuthService.setJWT(res.data.accessToken);
      } catch (err) {
        console.log(err);
        console.log(err.response?.data.message);
      }
    },
  },
};
</script>

<style lang="scss">
.form__group {
  max-width: 300px;
  margin: 0 auto 16px auto;

  label {
    text-align: left;
    display: block;
  }

  input {
    width: 100%;
  }
}
</style>
