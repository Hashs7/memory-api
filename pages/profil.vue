<template>
  <div class="profile">
    <h1>Mon compte</h1>
    <div class="user">
      <p>{{ user.firstName }} {{ user.lastName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.$state.user;
    },
  },
};
</script>
