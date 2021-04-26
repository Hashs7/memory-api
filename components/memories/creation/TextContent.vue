<template>
  <div>
    <client-only>
      <wysiwyg v-model="html" />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'TextCreation',
  data() {
    return {
      html: null,
    };
  },
};
</script>
