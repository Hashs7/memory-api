<template>
  <div class="o-page o-page--register">
    <div class="">
      <h1>Création de compte</h1>
      <h2>Commençons par vous !</h2>
    </div>
    <div class="create">
      <form @submit="submit">
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
        <button type="submit" class="button is-primary">S'inscrire</button>
        <NuxtLink to="/connexion">J'ai déjà un compte</NuxtLink>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
        // user came from handover
        const id = this.$store.state.handover.instrumentId;
        const { token } = this.$store.state.handover;
        this.$router.push({
          name: 'passation-reception',
          params: { id },
          query: { token },
        });
        return;
      }
      // Redirect to personal instruments
      this.$router.push({
        name: 'instrument',
      });
    },
  },
};
</script>

<style lang="scss">
.form__group {
  display: flex;
  justify-content: space-between;
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

.field {
  width: 100%;
}

.form__field--half {
  width: calc(50% - 8px);
}
</style>
