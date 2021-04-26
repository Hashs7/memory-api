<template>
  <div class="create">
    <h1>S'inscrire</h1>
    <form @submit="submit">
      <div class="form__group">
        <b-field label="Surnom">
          <b-input v-model="username" type="text"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Email">
          <b-input v-model="email" type="email"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Mot de passe">
          <b-input v-model="password" type="password" password-reveal>
          </b-input>
        </b-field>
      </div>
      <button type="submit" class="button is-primary">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import AuthService from '~/plugins/AuthService';

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
        const res = await this.$api.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });
        AuthService.setJWT(res.data.accessToken);
      } catch (err) {
        // console.log(err);
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
