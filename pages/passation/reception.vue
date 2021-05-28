<template>
  <div class="o-page">
    <h1 class="o-page__title">Passation</h1>
    <h2 v-if="validated">
      Vous venez de faire l'acquisition de {{ instrument.name }}
    </h2>
    <div v-if="error.hasError" class="error">
      <p>{{ error.message }}</p>
    </div>

    <div v-if="!$auth.loggedIn" class="">
      <p>Veuillez d'abord vous authentifier</p>
      <NuxtLink :to="signIn" class="u-button u-button--primary"
        >Connexion</NuxtLink
      >
      <NuxtLink :to="signUp" class="u-button u-button--primary"
        >Inscription</NuxtLink
      >
    </div>
  </div>
</template>

<router>
path: /instrument/:id/passation/reception
</router>

<script>
export default {
  data() {
    return {
      error: {
        hasError: null,
        message: '',
      },
      instrument: null,
      validated: null,
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
    instrumentId() {
      return this.$route.params.id;
    },
    signIn() {
      return `/connexion`;
    },
    signUp() {
      return `/inscription`;
    },
  },
  mounted() {
    this.getInstrument();
    if (!this.$auth.loggedIn) {
      this.storeToken();
      return;
    }
    this.validateToken();
  },
  methods: {
    async getInstrument() {
      const res = await this.$api.getInstrumentById(this.instrumentId);
      this.instrument = res.data;
    },
    async validateToken() {
      if (!this.$route.query.token) {
        this.error.message = "Votre jeton n'est pas valide";
        this.validated = false;
        this.error.hasError = true;
        return;
      }

      try {
        const res = await this.$api.confirmHandoverInstrument(this.token);
        console.log(res);
        this.validated = true;
      } catch (e) {
        this.error.message = e.response.data.message;
        this.error.hasError = true;
        this.validated = false;
      }
    },

    storeToken() {
      this.$store.commit('handover/setToken', this.token);
      this.$store.commit('handover/setInstrumentId', this.instrumentId);
    },
  },
};
</script>

<style scoped></style>
