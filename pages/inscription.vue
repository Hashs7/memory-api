<template>
  <div class="o-page o-page--register">
    <div class="create">
      <h1>S'inscrire</h1>
      <form @submit="submit">
        <div class="form__group">
          <b-field label="Prénom">
            <b-input v-model="firstName" type="text"> </b-input>
          </b-field>
        </div>
        <div class="form__group">
          <b-field label="Nom">
            <b-input v-model="lastName" type="text"> </b-input>
          </b-field>
        </div>
        <div class="form__group">
          <b-field label="Pseudo">
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
