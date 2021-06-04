<template>
  <div class="o-page o-page--login">
    <div class="o-page__header">
      <div class="logo"><IconLogo /></div>
      <span class="o-page__title">Connexion au compte</span>
      <h1 class="o-page__subtitle">Bon retour parmis nous !</h1>
    </div>

    <form v-if="!$auth.loggedIn" class="register__form" @submit="submit">
      <div class="register__container">
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
      </div>
      <div class="form__actions">
        <button type="submit" class="u-button u-button--primary">
          Me connecter
        </button>
        <NuxtLink to="/inscription" class="u-button u-button--outline"
          >S'inscrire</NuxtLink
        >
      </div>
    </form>
    <Logout v-else type="submit" class="button"> Me déconnecter </Logout>
    <button @click="resetPassword">Mot de passe oublié</button>
  </div>
</template>

<script>
import Logout from '../components/user/Logout';
import IconLogo from '~/assets/svg/ic_logo.svg?inline';

export default {
  name: 'Login',
  components: { Logout, IconLogo },
  layout(ctx) {
    let layout = 'default';
    if (!ctx.$auth.loggedIn) {
      layout = 'none';
    }
    return layout;
  },
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
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.login.username,
            password: this.login.password,
          },
        });
        this.$auth.setUser(response.data.user);
        await this.$auth.fetchUser();
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
