<template>
  <client-only>
    <wysiwyg v-model="html" />
  </client-only>
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

<style>
.editr {
  height: 100%;
  border: none;
}
</style>
