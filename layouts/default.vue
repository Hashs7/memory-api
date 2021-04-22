<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Login',
          icon: 'account',
          to: { name: 'connexion' },
        },
        {
          title: 'Register',
          icon: 'account',
          to: { name: 'inscription' },
        },
        {
          title: 'Instruments',
          icon: 'format-list-bulleted',
          to: { name: 'instrument' },
        },
        {
          title: 'Ajout instrument',
          icon: 'pencil',
          to: { name: 'instrument-creation' },
        },
        {
          title: 'Chat',
          icon: 'comment',
          to: { name: 'chat' },
        },
      ],
    };
  },
};
</script>
