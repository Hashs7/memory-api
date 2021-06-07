<template>
  <div class="o-page o-page--intro">
    <div class="logo"><IconLogo /></div>
    <div class="o-page__container">
      <header class="o-page__head">
        <h1 class="title">Memory Motel</h1>
        <h2 class="subtitle">Votre instrument à tellement à raconter</h2>
      </header>
    </div>
    <IconPartition class="icon--partition" />
    <div class="o-page__actions">
      <NuxtLink
        v-if="!$auth.loggedIn"
        to="/connexion"
        class="u-button u-button--outline half"
        >Se connecter</NuxtLink
      >
      <NuxtLink
        v-if="!$auth.loggedIn"
        to="/inscription"
        class="u-button u-button--primary half"
        >S'inscrire</NuxtLink
      >
      <NuxtLink
        v-if="$auth.loggedIn"
        to="/profil/infos"
        class="u-button u-button--primary"
        >C'est parti</NuxtLink
      >
    </div>
  </div>
</template>

<script>
import IconLogo from '~/assets/svg/ic_logo.svg?inline';
import IconPartition from '~/assets/svg/ic_partition.svg?inline';

export default {
  components: {
    IconLogo,
    IconPartition,
  },
  layout: 'none',
  created() {
    if (!this.$auth.loggedIn) return;
    this.$router.push({
      name: 'feed',
    });
  },
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

.o-page__actions {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 44px;
  left: 28px;
  right: 28px;
}

.logo {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  width: 64px;
  margin: auto;
}

.o-page--intro .u-button {
  width: 100%;
  margin-top: 0 !important;
}

.o-page--intro .u-button.half {
  width: calc(50% - 4px);
  padding: 0;
}

.icon--partition {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  margin: auto;
  transform: translateY(20px);
}

.title {
  display: block;
  margin-bottom: 12px;
  font-size: 18px;
  font-family: $font-primary;
  font-weight: 300;
}
.subtitle {
  margin-top: 0 !important;
  font-size: 24px;
}
</style>
