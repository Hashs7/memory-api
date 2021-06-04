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

      <TabSections
        :sections="[
          {
            nav: 'Paramètres de confidentialité',
          },
        ]"
      />
      <Visibility />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Visibility from '@/components/memories/creation/form/Visibility';
import MemoryPreview from '@/components/memories/MemoryPreview';
import IconChevron from '@/assets/svg/ic_chevron.svg?inline';
import TabSections from '../../../layout/TabSections';

export default {
  name: 'Summary',
  components: {
    TabSections,
    Visibility,
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
    ...mapState('memory', { memory: 'data' }),
  },
  methods: {
    ...mapMutations('memory', ['updateDate']),
  },
};
</script>

<style scoped>
.o-page__body {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
