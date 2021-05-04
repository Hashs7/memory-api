<template>
  <div>
    <Header />
    <section class="main-content">
      <nuxt />
    </section>
    <Tabbar />
  </div>
</template>

<script>
import Header from '@/components/layout/Header';
import Tabbar from '../components/Tabbar';

export default {
  components: {
    Tabbar,
    Header,
  },
};
</script>
