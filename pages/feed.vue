<template>
  <div class="o-page">
    <div class="o-page__header">
      <input class="o-page__search" type="text" placeholder="Rechercher" />
      <div class="profile">
        <NuxtLink to="/profil" class="">
          <span v-if="!$auth.loggedIn">Profil</span>
          <img v-else :src="profilePicture" alt="photo de profil" />
        </NuxtLink>
      </div>
    </div>

    <h1 class="o-page__title">Explorer</h1>

    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Actualités des instruments favoris</h4>
        <button class="u-link">Voir tout</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      const res = await this.$api.getInstruments();
      this.instruments = res.data;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    profilePicture() {
      return this.$auth.user?.thumbnail.path;
    },
  },
};
</script>

<style lang="scss" scoped>
.o-page__header {
  display: flex;
  justify-content: space-between;
}

.o-page__title {
  margin-top: 20px;
}

.o-page__search {
  flex-grow: 1;
}

.profile {
  width: 50px;
  height: 50px;
  margin-left: 16px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
