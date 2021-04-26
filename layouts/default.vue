<template>
  <div>
    <Header />

    <section class="main-content columns">
      <div class="container column is-10">
        <Nuxt keep-alive />
      </div>
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
