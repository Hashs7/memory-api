<template>
  <div :class="{ sender, 'is-primary': sender }" class="message">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
