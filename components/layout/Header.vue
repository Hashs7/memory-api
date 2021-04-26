<template>
  <b-navbar>
    <template #start>
      <b-navbar-item v-for="(item, key) of items" :key="key" tag="div">
        <nuxt-link :to="item.to" exact-active-class="is-active">
          <b-icon :icon="item.icon" /> {{ item.title }}
        </nuxt-link>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item v-for="(item, key) of userLinks" :key="key" tag="div">
        <nuxt-link :to="item.to" exact-active-class="is-active">
          <b-icon :icon="item.icon" /> {{ item.title }}
        </nuxt-link>
      </b-navbar-item>
    </template>

    <div class="navbar-brand">
      <div class="navbar-burger">
        <span />
        <span />
        <span />
      </div>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
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
      ],
      userLinks: [
        {
          title: 'Connexion',
          icon: 'account',
          to: { name: 'connexion' },
        },
        {
          title: 'Inscription',
          icon: 'account',
          to: { name: 'inscription' },
        },
        {
          title: 'Mon compte',
          icon: 'account',
          to: { name: 'profil' },
        },
      ],
    };
  },
};
</script>
