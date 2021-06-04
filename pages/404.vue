<template>
  <div class="o-page">
    <h1>Page introuvable</h1>
    <p>Redirection...</p>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: 'instrument',
      });
    }, 3000);
  },
};
</script>

<style scoped></style>
