<template>
  <div>
    <Header />

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
import Header from '@/components/layout/Header';

export default {
  components: {
    Header,
  },
};
</script>
