<template>
  <div class="o-page o-page--signin">
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
      <Logout v-else type="submit" class="button"> Me déconnecter </Logout>
      <button @click="resetPassword">Mot de passe oublié</button>

      <div>
        <h2>Hint</h2>
        <div>Password98015</div>
      </div>
    </div>
  </div>
</template>

<script>
import Logout from '../components/user/Logout';

export default {
  name: 'Login',
  components: { Logout },
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
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.login.username,
            password: this.login.password,
          },
        });
        // TODO get more user infos
        this.$auth.setUser(response.data.user);
        this.redirect();
      } catch (err) {}
    },

    submit(e) {
      e.preventDefault();
      this.userLogin();
    },

    resetPassword() {
      // TODO remove password field and send request to api
    },

    async redirect() {
      if (this.$store.getters['handover/pendingHandover']) {
        // user came from handover
        const id = this.$store.state.handover.instrumentId;
        const { token } = this.$store.state.handover;
        await this.$router.push({
          name: 'passation-reception',
          params: { id },
          query: { token },
        });
        return;
      }
      // Redirect to personal instruments
      await this.$router.push({
        name: 'instrument',
      });
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
