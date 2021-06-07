<template>
  <button class="u-button--back" :class="{ light, absolute }" @click="back">
    <IconChevron />
  </button>
</template>

<script>
import IconChevron from '@/assets/svg/ic_chevron.svg?inline';

export default {
  name: 'ButtonBack',
  components: {
    IconChevron,
  },
  props: {
    emit: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    back() {
      if (this.emit) {
        this.$emit('back');
        return;
      }
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
