<template>
  <div class="o-page o-page--summary">
    <div class="o-page__header o-page__header-nav">
      <button class="o-page__header-btn icon" @click="$emit('back')">
        <IconChevron />
      </button>
      <span>Résumé</span>
      <button class="o-page__header-btn primary" @click="$emit('submit')">
        <template v-if="!edit">Poster</template>
        <template v-else>Enregistrer</template>
      </button>
    </div>
    <div class="o-page__body">
      <MemoryPreview v-if="edit" :memory="memory" @click="$emit('open-form')" />
      <MemoryPreview v-else :memory="memory" />

      <div class="o-cells">
        <label class="o-cells__label">Date</label>
        <client-only>
          <b-field>
            <b-datepicker
              :value="new Date(memory.date)"
              locale="fr"
              placeholder="Sélectionner une date"
              icon="calendar-today"
              trap-focus
              @input="updateDate($event.toISOString())"
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

      <div v-if="!edit" class="o-cells">
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
import { mapMutations } from 'vuex';
import { VISIBILITY } from '@/const/memory';
import MemoryPreview from '../../MemoryPreview';
import IconChevron from '~/assets/svg/ic_chevron.svg?inline';

export default {
  name: 'Summary',
  components: {
    MemoryPreview,
    IconChevron,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    memory: {
      get() {
        return this.$store.state.memory.memory;
      },
      set(value) {
        this.$store.commit('memory/updateMemory', value);
      },
    },
    visibilityItem() {
      if (!this.visibility) return null;
      return VISIBILITY[this.visibility];
    },
  },
  methods: {
    ...mapMutations('memory', ['updateDate']),
    handleChanges(value) {
      this.$store.commit('memory/updateMemory', value);
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
