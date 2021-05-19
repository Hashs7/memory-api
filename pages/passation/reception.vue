<template>
  <div class="o-page">
    <h1 class="o-page__title">Passation</h1>
    <h2 v-if="validated">
      Vous venez de faire l'acquisition de {{ instrument.name }}
    </h2>
    <h2 v-else-if="validated === false">La passation a expirée</h2>
    <p>Token : {{ token }}</p>

    <div v-if="!$auth.loggedIn" class="">
      <p>Veuillez d'abord vous authentifier</p>
      <NuxtLink :to="signIn" class="u-button u-button--primary"
        >Connexion</NuxtLink
      >
      <NuxtLink :to="signUp" class="u-button u-button--primary"
        >Inscription</NuxtLink
      >
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
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
      error: null,
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
        this.error = "Votre jeton n'est pas valide";
        this.validated = false;
        return;
      }

      try {
        const res = await this.$api.confirmHandoverInstrument(this.token);
        console.log(res);
        this.validated = true;
      } catch (e) {
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
