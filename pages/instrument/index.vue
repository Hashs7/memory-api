<template>
  <div class="o-page">
    <h1>Mon motel</h1>
    <section class="view view--instrument-list">
      <nav class="o-section__head tab-nav">
        <button
          v-for="(s, i) in sections"
          :key="i"
          :class="{ current: selectedSection === s.name }"
          class="tab-nav__item"
          @click="showSection(s.name)"
        >
          {{ s.nav }}
        </button>
      </nav>

      <div class="instrument-sections">
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
              class="u-button u-button--background create-instrument"
            >
              <div class="u-button__content">
                <IconAdd />
                <span>Ajouter</span>
              </div>
              <IconRectangle class="u-button__bg" />
            </NuxtLink>
            <InstrumentPreview
              v-for="ins in instruments[s.name]"
              :key="ins.id"
              :data="ins"
              :show-favorite="s.name === 'wish'"
            />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<router>
  alias:
    - /motel
</router>

<script>
import IconRectangle from '@/assets/svg/ic_rectangle.svg?inline';
import IconAdd from '@/assets/svg/ic_add.svg?inline';
import InstrumentPreview from '@/components/instrument/InstrumentPreview';

export default {
  components: { InstrumentPreview, IconRectangle, IconAdd },
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
      throw new Error(e);
    }
  },
  fetchOnServer: false,
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

.instruments-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  &.user-instrument {
    display: block;
  }
}

.create-instrument {
  width: 100%;
}
</style>
