<template>
  <div class="u-dropdown">
    <div class="u-dropdown__current">
      <div v-if="!value" class="u-dropdown__option">
        <div class="u-dropdown__icon"></div>
        <div class="u-dropdown__text">
          <span class="u-dropdown__label">{{ value.label }}</span>
          <p v-if="value.helper" class="u-dropdown__helper">
            {{ value.helper }}
          </p>
        </div>
      </div>
      <span class="u-dropdown__empty-label">
        {{ emptyLabel }}
      </span>
    </div>
    <div class="u-dropdown__options">
      <div v-for="(o, i) in options" :key="i" class="u-dropdown__option">
        <div class="u-dropdown__icon"></div>
        <div class="u-dropdown__text">
          <span class="u-dropdown__label">{{ o.label }}</span>
          <p v-if="o.helper" class="u-dropdown__helper">{{ o.helper }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    emptyLabel: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: null,
    },
  },

  computed: {
    selected() {
      return this.value !== null;
    },
  },
};
</script>

<style lang="scss" scoped></style>
