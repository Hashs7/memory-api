<template>
  <div class="create">
    <h1>Connexion</h1>

    <form v-if="!$auth.loggedIn" @submit="submit">
      <div class="form__group">
        <b-field label="Email">
          <b-input v-model="login.username" type="email"></b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Mot de passe">
          <b-input v-model="login.password" type="password" password-reveal>
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
export default {
  name: 'Login',
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    console.log(this.$auth);
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },

    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.login.username,
            password: this.login.password,
          },
        });
        this.$auth.setUser(response.data.user);
      } catch (err) {
        // console.log(err);
      }
    },

    submit(e) {
      e.preventDefault();
      this.userLogin();
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
