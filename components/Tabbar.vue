<template>
  <nav class="tabbar">
    <div class="tabbar__container">
      <nuxt-link
        v-for="navItem in nav"
        :key="navItem.path"
        :to="navItem.path"
        class="tabbar__item"
        :class="[
          navItem.slug,
          { 'tabbar__item--current': $route.path === navItem.path },
        ]"
      >
        <span class="tabbar__icon">
          <component :is="navItem.icon" />
        </span>
        <span class="tabbar__text">{{ navItem.label }}</span>
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import IconMotel from '@/assets/svg/ic_nav-motel.svg?inline';
import IconDiscover from '@/assets/svg/ic_nav-discover.svg?inline';
import IconAdd from '@/assets/svg/ic_add.svg?inline';

export default {
  name: 'Tabbar',
  components: {
    IconMotel,
    IconDiscover,
    IconAdd,
  },
  data() {
    return {
      nav: [
        {
          slug: 'discover',
          label: 'Découvrir',
          path: '/decouvrir',
          icon: 'IconDiscover',
        },
        {
          slug: 'add',
          label: 'Ajouter',
          path: '/capture',
          icon: 'IconAdd',
        },
        {
          slug: 'motel',
          label: 'Mon motel',
          path: '/motel',
          icon: 'IconMotel',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.tabbar {
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  display: flex;
  padding: 0 0 env(safe-area-inset-bottom, 0) 0; // Avoid iOS notch
  background-color: $background;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  &__item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    svg {
      opacity: 0.5;
    }

    &--current:not(.add) {
      position: relative;
      &:after {
        content: '';
        height: 2px;
        position: absolute;
        top: -12px;
        left: 0;
        right: 0;
        margin: auto;
        background-color: $black;
      }
    }
    &--current .tabbar__text,
    &--current svg {
      opacity: 1;
    }
  }

  &__icon {
    width: 1.6rem;
    height: 1.6rem;
    margin-bottom: 8px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__text {
    opacity: 0.5;
    line-height: 1;
    font-size: 12px;
  }
}

.tabbar__container {
  margin: auto;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-around;
}

.tabbar__item.add {
  opacity: 1;

  .tabbar__icon {
    display: flex;
    position: absolute;
    top: 0;
    width: 48px;
    height: 48px;
    background-color: $gray-darkest;
    border-radius: 4px;
    transform: translateY(-24px);

    svg {
      opacity: 1;
      margin: auto;
      width: 22px;
      height: 22px;
    }
    rect {
      fill: $background;
    }
  }
}
</style>
