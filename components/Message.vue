<template>
  <div :class="{sender, 'is-primary': sender}" class="message">
    <span>{{ text }}</span>
  </div>
</template>

<script>
	export default {
		name: "Message",
		props: {
			text: {
				type: String,
				required: true,
			},
      sender: {
				type: Boolean,
        default: false,
      }
		},
	}
</script>

<style lang="scss" scoped>
  .message {
    padding: 4px 8px;
    margin: 0 auto 8px 8px;

    &:first-child {
      margin-top: 8px;
    }
  }
  .message.sender {
    margin-left: auto;
    margin-right: 8px;
  }
</style>