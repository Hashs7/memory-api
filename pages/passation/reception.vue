<template>
  <div class="o-page">
    <h1 class="o-page__title">Passation</h1>
    <p v-if="error">{{ error }}</p>
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
    };
  },
  mounted() {
    this.validateToken();
  },
  methods: {
    validateToken() {
      if (!this.$route.query.token) {
        this.error = "Votre jeton n'est pas valide";
        return;
      }
      console.log(this.$route.query.token);
      // TODO validate token with api
    },
  },
};
</script>

<style scoped></style>
