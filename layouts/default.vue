<template>
  <div>
    <section class="main-content o-layout--default">
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

<style>
.o-layout--default {
  margin: 0 0 72px 0;
}
</style>
