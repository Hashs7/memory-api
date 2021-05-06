<template>
  <div class="o-page o-page--summary">
    <div class="o-page__header o-page__header-nav">
      <button class="o-page__header-btn icon" @click="$emit('back')">
        <IconChevron />
      </button>
      <span>Enregistrer</span>
      <button class="o-page__header-btn primary" @click="$emit('submit')">
        Poster
      </button>
    </div>
    <div class="o-page__body">
      <MemoryPreview :memory="memory" />

      <div class="o-cells">
        <label class="o-cells__label">Date</label>
        <client-only>
          <b-field>
            <b-datepicker
              v-model="date"
              locale="fr"
              placeholder="Sélectionner une date"
              icon="calendar-today"
              trap-focus
            >
            </b-datepicker>
          </b-field>
        </client-only>
      </div>

      <div class="o-cells">
        <label class="o-cells__label">Confidentialité</label>
        <div class="o-cells__container">
          <button class="o-cells__item" @click="$emit('params')">
            <span v-if="!visibilityItem"
              >Choisissez qui peut voir le souvenir</span
            >
            <span v-else class="o-cells__item-content">
              <span class="o-cells__item-text">{{ visibilityItem.text }}</span>
              <span class="o-cells__item-help">{{
                visibilityItem.helper
              }}</span>
            </span>
          </button>
        </div>
      </div>

      <div class="o-cells">
        <label class="o-cells__label">Partager</label>
        <div class="o-cells__container">
          <button class="o-cells__item">Facebook</button>
          <button class="o-cells__item">Instagram</button>
          <button class="o-cells__item">Twitter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { VISIBILITY } from '@/const/memory';
import MemoryPreview from '../../MemoryPreview';
import IconChevron from '~/assets/svg/ic_chevron.svg?inline';

export default {
  name: 'Summary',
  components: {
    MemoryPreview,
    IconChevron,
  },
  computed: {
    ...mapState({
      name: (state) => state.memory.name,
      type: (state) => state.memory.type,
      contents: (state) => state.memory.contents,
      themes: (state) => state.memory.themes,
      visibility: (state) => state.memory.visibility,
    }),
    date: {
      get() {
        return this.$store.state.memory.date;
      },
      set(value) {
        this.$store.commit('memory/updateDate', value);
      },
    },
    memory() {
      return {
        name: this.name,
        date: this.date,
      };
    },
    visibilityItem() {
      if (!this.visibility) return null;
      return VISIBILITY[this.visibility];
    },
  },
};
</script>

<style scoped>
.o-page__body {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
