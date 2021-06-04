<template>
  <button type="button" class="u-button u-button--background u-button--square">
    <span class="u-button__content">
      <IconAdd />
      <span>Ajouter</span>
    </span>
    <BtnOutlineSquare class="u-button__bg" />
  </button>
</template>

<script>
import BtnOutlineSquare from '@/assets/svg/button/btn_outline--square.svg?inline';
import IconAdd from '@/assets/svg/ic_add.svg?inline';

export default {
  name: 'ButtonSquare',
  components: {
    BtnOutlineSquare,
    IconAdd,
  },
};
</script>

<style lang="scss">
.u-button--square .u-button__content svg {
  margin-bottom: 8px;
}
</style>
