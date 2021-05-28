<template>
  <button type="submit" class="u-button u-button--outline" @click="logout">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Logout',
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped></style>
