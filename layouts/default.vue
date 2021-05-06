<template>
  <div>
    <section class="main-content">
      <nuxt />
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar';

export default {
  components: {
    Tabbar,
  },
};
</script>
