<template>
  <nav class="tabbar">
    <nuxt-link
      v-for="navItem in nav"
      :key="navItem.path"
      :to="navItem.path"
      class="tabbar__item"
      :class="{ 'tabbar__item--current': $route.path === navItem.path }"
    >
      <span class="tabbar__icon"></span>
      <span class="tabbar__text">{{ navItem.label }}</span>
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      nav: [
        {
          label: 'Découvrir',
          path: '/feed',
        },
        {
          label: 'Capture',
          path: '/capture',
        },
        {
          label: 'Instruments',
          path: '/instrument',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0 env(safe-area-inset-bottom, 0) 0; // Avoid iOS notch
  background-color: white;
  box-shadow: 0px -0.3rem 0.5rem 0 rgba(100, 100, 100, 0.05);

  &__item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--current {
      .tabbar__icon {
        background-color: gray;
      }
    }
  }

  &__icon {
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 100%;
    background-color: lightgray;
  }

  &__text {
    font-size: 0.6rem;
  }
}
</style>
