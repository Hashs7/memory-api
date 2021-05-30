<template>
  <div class="o-page o-page--user">
    <div v-if="user.thumbnail" class="user-thumbnail">
      <img
        :src="user.thumbnail.path"
        :alt="`Photo de profil de ${user.firstName}`"
      />
    </div>
    <h1>{{ user.firstName }} {{ user.lastName }}</h1>
    <p>@{{ user.username }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  async asyncData({ $api, params, redirect }) {
    try {
      const user = await $api.getUserByUsername(params.user);
      const instruments = await $api.getUserInstrumentsByUsername(params.user);

      return {
        user: user.data,
        instruments: instruments.data.userInstruments,
      };
    } catch (e) {
      redirect(404, '/');
    }
  },
  mounted() {
    console.log(this.instruments);
  },
};
</script>

<style scoped></style>
