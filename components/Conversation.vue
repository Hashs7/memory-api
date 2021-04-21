<template>
  <div class="conversation">
    <div class="message-container">
      <div class="message"></div>
    </div>
    <div class="conversation-input">
      <label>
        <input type="text" v-model="text">
      </label>
      <button @click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Conversation",
		props: {
			conversation: {
				id: {
					type: String,
					required: true,
        }
			},
		},
    data() {
			return {
				text: null,
      }
    },
		methods: {
			sendMessage() {
				console.log();
			}
		},
	}
</script>

<style scoped>

</style>