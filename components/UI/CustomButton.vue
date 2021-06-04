<template>
  <component
    :is="link ? 'nuxt-link' : 'button'"
    :to="link"
    :class="{ light: outline, dark: !outline }"
    :type="!link ? 'button' : ''"
    class="u-button u-button--background"
  >
    <div class="u-button__content">
      <slot></slot>
    </div>
    <BtnBackground v-if="!outline" class="u-button__bg" />
    <BtnOutline v-else class="u-button__bg" />
  </component>
</template>

<script>
import BtnBackground from '@/assets/svg/button/btn_background.svg?inline';
import BtnOutline from '@/assets/svg/button/btn_outline.svg?inline';

export default {
  name: 'CustomButton',
  components: {
    BtnBackground,
    BtnOutline,
  },
  props: {
    type: {
      type: String,
      default: 'button',
    },
    link: {
      type: String,
      default: undefined,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
