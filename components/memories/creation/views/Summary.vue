<template>
  <div class="o-page o-page--summary">
    <div class="o-page__header">
      <button @click="$emit('back')">back</button>
      <span>Enregistrer</span>
      <button @click="$emit('submit')">Poster</button>
    </div>
    <div class="o-page__body">
      <MemoryPreview :memory="memory" />

      <div class="">
        <label>Confidentialité</label>
        <div class="">
          <button @click="$emit('params')">
            Choisissez qui peut voir le souvenir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MemoryPreview from '../../MemoryPreview';

export default {
  name: 'Summary',
  components: {
    MemoryPreview,
  },
  computed: {
    ...mapState({
      name: (state) => state.memory.name,
      date: (state) => state.memory.date,
      type: (state) => state.memory.type,
      contents: (state) => state.memory.contents,
      themes: (state) => state.memory.themes,
    }),
    memory() {
      return {
        name: this.name,
        date: this.date,
      };
    },
  },
};
</script>

<style scoped></style>
