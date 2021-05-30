<template>
  <div class="conversation">
    <div class="message-container">
      <div class="message"></div>
    </div>
    <div class="conversation-input">
      <label>
        <input v-model="text" type="text" />
      </label>
      <button @click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conversation',
  props: {
    conversation: {
      id: {
        type: String,
        required: true,
      },
    },
  },
  data() {
    return {
      text: null,
    };
  },
  methods: {
    sendMessage() {
      // TODO
    },
  },
};
</script>

<style scoped></style>
