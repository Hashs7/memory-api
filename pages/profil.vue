<template>
  <div class="o-page o-page--profile">
    <div class="">
      <h1>Mon compte</h1>
      <div class="user">
        <p>{{ user.firstName }} {{ user.lastName }}</p>
      </div>
      <Logout>Déconnexion</Logout>
    </div>
  </div>
</template>

<script>
import Logout from '../components/user/Logout';

export default {
  name: 'Login',
  components: { Logout },
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.$state.user;
    },
  },
};
</script>
