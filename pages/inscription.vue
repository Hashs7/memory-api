<template>
  <div class="o-page o-page--register">
    <div class="o-page__header">
      <div class="logo"><IconLogo /></div>
      <span class="o-page__title">Création de compte</span>
      <h1 class="o-page__subtitle">Commençons par vous !</h1>
    </div>
    <form class="register__form" @submit="submit">
      <div class="register__container">
        <div class="form__group">
          <b-field>
            <b-input
              v-model="username"
              type="text"
              placeholder="Surnom"
            ></b-input>
          </b-field>
        </div>
        <div class="form__group">
          <div class="form__field form__field--half">
            <b-field>
              <b-input v-model="firstName" type="text" placeholder="Prénom">
              </b-input>
            </b-field>
          </div>
          <div class="form__field form__field--half">
            <b-field>
              <b-input v-model="lastName" placeholder="Nom" type="text">
              </b-input>
            </b-field>
          </div>
        </div>
        <div class="form__group">
          <b-field>
            <b-input v-model="email" placeholder="Email" type="email">
            </b-input>
          </b-field>
        </div>
        <div class="form__group">
          <b-field>
            <b-input
              v-model="password"
              placeholder="Mot de passe"
              type="password"
              password-reveal
            >
            </b-input>
          </b-field>
        </div>
      </div>
      <div class="form__actions">
        <button type="submit" class="u-button u-button--primary">
          S'inscrire
        </button>
        <NuxtLink to="/connexion" class="u-button u-button--outline"
          >J'ai déjà un compte</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<script>
import IconLogo from '~/assets/svg/ic_logo.svg?inline';

export default {
  name: 'Register',
  components: {
    IconLogo,
  },
  layout: 'none',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      try {
        await this.$api.register({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
        });
        const response = await this.$auth.loginWith('local', {
          data: {
            username: this.email,
            password: this.password,
          },
        });
        this.$auth.setUser(response.data.user);
        this.redirect();
      } catch (err) {}
    },

    redirect() {
      if (this.$store.getters['handover/pendingHandover']) {
        this.redirectHandover();
        return;
      }
      // Redirect to personal instruments
      this.$router.push({
        name: 'instrument',
      });
    },
    redirectHandover() {
      // user came from handover
      const id = this.$store.state.handover.instrumentId;
      const { token } = this.$store.state.handover;
      this.$router.push({
        name: 'passation-reception',
        params: { id },
        query: { token },
      });
    },
  },
};
</script>
