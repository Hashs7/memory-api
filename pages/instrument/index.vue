<template>
  <div class="o-page">
    <h1>Mon motel</h1>
    <section class="view view--instrument-list">
      <nav class="instrument-nav">
        <button
          v-for="(s, i) in sections"
          :key="i"
          :class="{ current: selectedSection === s.name }"
          class="instrument-nav__item"
          @click="showSection(s.name)"
        >
          {{ s.nav }}
        </button>
      </nav>
      <div class="">
        <section
          v-for="(s, i) in sections"
          :key="i"
          :class="[s.class]"
          class="instruments-container"
        >
          <div v-show="selectedSection === s.name" class="">
            <NuxtLink
              v-if="selectedSection === 'user'"
              to="/instrument/creation"
              class="u-button u-button--primary create-instrument"
              >Ajouter un instrument</NuxtLink
            >
            <InstrumentPreview
              v-for="ins in instruments[s.name]"
              :key="ins.id"
              :instrument="ins"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import InstrumentPreview from '@/components/instrument/InstrumentPreview';

export default {
  components: { InstrumentPreview },
  middleware: 'auth',
  data() {
    return {
      selectedSection: null,
      sections: [
        {
          name: 'user',
          nav: 'Actuels',
          class: 'user-instrument',
        },
        {
          name: 'old',
          nav: 'Anciens',
          class: 'old-instrument',
        },
        {
          name: 'wish',
          nav: 'Favoris',
          class: 'wish-instrument',
        },
      ],
      instruments: {
        user: [],
        old: [],
        wish: [],
      },
    };
  },
  async fetch() {
    try {
      const res = await this.$api.getUserInstruments();
      const { userInstruments, oldInstruments, wishInstruments } = res.data;
      this.instruments.user = userInstruments;
      this.instruments.old = oldInstruments;
      this.instruments.wish = wishInstruments;
      if (userInstruments.length) {
        this.showSection('user');
      }
    } catch (e) {
      console.log(e);
    }
  },
  fetchOnServer: false,
  watch: {
    async selected(newVal) {
      await this.$router.push({
        name: 'instrument-id',
        params: { id: newVal.id },
      });
    },
  },
  methods: {
    showSection(name) {
      this.selectedSection = name;
    },
  },
};
</script>

<style lang="scss" scoped>
.create-instrument {
  margin-bottom: 8px;
}
.instrument-nav {
  display: flex;
  margin: 20px 0;
  font-weight: 500;
  border-bottom: 1px solid $gray-dark;
}
.instrument-nav__item {
  height: 32px;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid transparent;

  &.current {
    border-color: $gray-darkest;
  }
}
</style>
