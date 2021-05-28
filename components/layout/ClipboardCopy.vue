<template>
  <div class="clipboard-copy" @click="copy">
    <slot></slot>
    <button
      class="button button--icon button--small clipboard-copy__button"
      aria-label="Copier"
    >
      <IcCopy />
    </button>
    <input
      class="clipboard-copy__input"
      type="text"
      :value="value"
      ref="input"
      aria-hidden="true"
    />
    <transition name="clipboard-copy-tooltip">
      <span v-if="showTooltip" class="clipboard-copy__tooltip">Copié</span>
    </transition>
  </div>
</template>

<script>
import IcCopy from '@/assets/svg/ic_copy.svg?inline';

export default {
  components: { IcCopy },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showTooltip: false,
    };
  },
  methods: {
    copy() {
      this.$refs.input.select();
      this.$refs.input.setSelectionRange(0, 99999);
      this.$refs.input.blur();
      document.execCommand('copy');
      if (this.showTooltip) {
        return;
      }
      setTimeout(() => (this.showTooltip = false), 500);
      this.showTooltip = true;
    },
  },
};
</script>

<style lang="scss">
.clipboard-copy {
  position: relative;
  cursor: pointer;

  @include hover() {
    background-color: transparentize($black, 0.98);

    .clipboard-copy__button {
      visibility: visible;
    }
  }
}

.clipboard-copy__button {
  visibility: hidden;

  svg {
    width: 24px;
    fill: transparentize($black, 0.4);
  }
}

.clipboard-copy__input {
  position: absolute;
  left: -9999px;
  pointer-events: none;
}

.clipboard-copy__tooltip {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: $gray-darkest;
  color: #fff;
  padding: 4px 8px;
  font-size: 10px;
  line-height: 10px;
  border-radius: 4px;
}

/**
 * Transition
 */
.clipboard-copy-tooltip-enter-active,
.clipboard-copy-tooltip-leave-active {
  transition: opacity 0.15s ease-out, transform 0.1s ease-out;
}

.clipboard-copy-tooltip-enter-from,
.clipboard-copy-tooltip-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

//@media all and (max-width: $breakpoint-tablet-m) {
.clipboard-copy__button {
  visibility: visible;
}
//}
</style>
