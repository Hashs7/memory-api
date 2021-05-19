<template>
  <button type="submit" class="button" @click="logout">
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
