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

<style lang="scss">
.editr {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
}

.editr--content {
  flex-grow: 1;
}

.editr--toolbar {
  order: 2;
  border-bottom: none;
  border-radius: 0 0 $radius $radius;
}
</style>
