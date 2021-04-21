<template>
  <section class="section">
    <div class="columns is-mobile">
      <card title="Modern" icon="alert-decagram">
        Built with <a href="https://vuejs.org/"> Vue.js </a> and
        <a href="http://bulma.io/"> Bulma </a>
      </card>

      <card title="Lightweight" icon="arrange-bring-to-front">
        No other internal dependency
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card';

export default {
  name: 'HomePage',

  components: {
    Card,
  },
};
</script>
