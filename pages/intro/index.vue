<template>
  <div class="o-page">
    <div class="o-page__container">
      <header class="o-page__head">
        <h1>Jamies</h1>
        <p>Votre instrument à tellement à raconter</p>
      </header>
    </div>
    <NuxtLink to="/inscription" class="u-button">Et c'est parti !</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'none',
};
</script>

<style lang="scss" scoped>
.o-page__head {
  max-width: 262px;
  text-align: center;
  margin: auto;
}

.o-page__container {
  margin: auto;
}
</style>
