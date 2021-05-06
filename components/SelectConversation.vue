<template>
  <div class="conversation">
    <div class="conversation__user">{{ usernames }}</div>
    <div class="conversation__message">{{ lastMessage }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectConversation',
  props: {
    users: {
      type: Array,
      required: true,
    },
    lastMessage: {
      type: String,
      required: true,
    },
  },
  computed: {
    usernames() {
      return this.users.reduce((acc, cur, i) => {
        if (this.$store.state.user.username === cur.username) return acc;
        acc += cur.username;
        if (i !== this.users.length - 1) {
          acc += ', ';
        }
        return acc;
      }, '');
    },
  },
};
</script>

<style scoped>
.conversation {
  margin: 0 auto 10px auto;
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
