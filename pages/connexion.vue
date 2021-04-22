<template>
  <div class="create">
    <h1>Connexion</h1>

    <form v-if="!user" @submit="submit">
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
      <button type="submit" class="button is-primary">Me connecter</button>
    </form>
    <button v-else type="submit" class="button" @click="logout">
      Me déconnecter
    </button>

    <div>
      <h2>Hint</h2>
      <div>seb@admin.com</div>
      <div>Password98015</div>
    </div>
  </div>
</template>

<script>
import AuthService from '~/plugins/AuthService';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      AuthService.deleteJWT();
    },

    async submit(e) {
      e.preventDefault();
      console.log(this.email);
      try {
        const res = await this.$api.login({
          username: this.email,
          password: this.password,
        });
        this.$store.dispatch('setUser', res.data);
        console.log('logged', res);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
.button {
  margin: auto;
  display: inline-block;
}
</style>
