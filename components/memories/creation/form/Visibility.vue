<template>
  <v-select
    v-model="visibility"
    class="u-select"
    label="label"
    :searchable="false"
    :options="visibilities"
    :reduce="(v) => v.slug"
    :clearable="false"
    placeholder="Choisissez qui peut voir ce souvenir"
  >
    <template #option="option" class="u-select__option">
      <span class="u-select__option-icon-wrap">
        <component
          :is="option.icon"
          v-if="option.icon"
          class="u-select__option-icon"
        />
      </span>
      <div class="u-select__option-content">
        <span class="u-select__option-label">{{ option.label }}</span>
        <p class="u-select__option-helper">{{ option.helper }}</p>
      </div>
    </template>

    <template #no-options="{ search, searching }">
      <template v-if="searching">
        Aucun résultat pour <em> {{ search }}</em
        >.
      </template>
      <em v-else style="opacity: 0.5">Tapez votre recherche.</em>
    </template>

    <template #open-indicator="{ attributes }">
      <span v-bind="attributes">
        <IconTriangle class="u-select__chevron" />
      </span>
    </template>
  </v-select>
</template>

<script>
import { VISIBILITY } from '@/const/memory';
import IconWorld from '@/assets/svg/ic_world.svg?inline';
import IconPrivate from '@/assets/svg/ic_private.svg?inline';
import IconLink from '@/assets/svg/ic_link.svg?inline';
import IconTriangle from '@/assets/svg/ic_triangle.svg?inline';
import { mapMutations } from 'vuex';

export default {
  name: 'Visibility',
  components: {
    IconPrivate,
    IconLink,
    IconWorld,
    IconTriangle,
  },
  data() {
    return {
      visibilities: Object.values(VISIBILITY),
    };
  },
  computed: {
    visibility: {
      get() {
        return this.$store.state.memory.data?.visibility;
      },
      set(newValue) {
        this.updateVisibility(newValue);
      },
    },
  },
  methods: {
    ...mapMutations('memory', ['updateVisibility']),
  },
};
</script>

<style lang="scss" scoped></style>
