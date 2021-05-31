<template>
  <div class="talk-user">
    <span>{{ user.name }}</span>
    <button @click="startConversation">Démarrer une conversation</button>
  </div>
</template>

<script>
export default {
  name: 'TalkUser',
  props: {
    user: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  },
  methods: {
    startConversation() {
      console.log('startConversation with : ', this.user.id);
    },
  },
};
</script>

<style scoped></style>
