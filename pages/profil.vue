<template>
  <div class="profile">
    <Header />
    <h1>Mon compte</h1>
    <div class="user">
      <p>{{ user.firstName }} {{ user.lastName }}</p>
    </div>
  </div>
</template>

<script>
import Header from '../components/layout/Header';

export default {
  name: 'Login',
  components: { Header },
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.$state.user;
    },
  },
};
</script>
