<template>
  <div :class="[theme.slug]" class="theme" @click="select">
    <span class="theme__title">{{ theme.title }}</span>
    <span class="theme__subtitle">{{ theme.subtitle }}</span>
    <div v-if="theme.selected" class="theme__checked"></div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSelector',
  props: {
    theme: {
      type: Object,
      required: true,
    },
  },
  methods: {
    select() {
      this.$store.commit('memory/selectTheme', this.theme.slug);
    },
  },
};
</script>

<style lang="scss" scoped>
.theme {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 122px;
  padding: 12px;
  border: 4px solid $white;
  border-radius: 6px;
  box-shadow: $shadow--second;
}

.theme__checked {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: #85eea2;
}

.theme__title {
  font-size: 24px;
  font-weight: 700;
  line-height: 0.9;
  margin-bottom: 12px;
}

.theme__subtitle {
  font-size: 14px;
  line-height: 1;
}

.theme {
  &.black {
    color: $white;
    background-color: $black;
  }
  &.pianiste {
    color: $black;
    background-color: $gray-lightest;
  }
  &.vie-rose {
    color: #457ec3;
    background-color: #fcd9dd;
  }
  &.banana-split {
    color: $white;
    background-color: #fbc250;
  }
  &.santiano {
    color: #3764e5;
    background-color: $gray-lightest;
  }
  &.sardines {
    color: #fcf2de;
    background-color: #3764e5;
  }
  &.aime-mourir {
    color: #ffc7e5;
    background-color: #fa7755;
  }
  &.surfing-usa {
    color: #0e403e;
    background-color: #cfc8ed;
  }
  &.playa {
    color: #dd2303;
    background-color: #fbf4df;
  }
  &.south {
    color: #f8d266;
    background-color: #f39527;
  }
  &.mint {
    color: #0e403e;
    background-color: #b3f5e7;
  }
}
</style>
