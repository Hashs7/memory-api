<template>
  <div class="o-page o-page--summary">
    <div class="o-page__header o-page__header-nav">
      <button class="o-page__header-btn" @click="$emit('back')">
        <IconChevron />
      </button>
      <span>Paramètres de confidentialité</span>
    </div>
    <div class="o-page__body">
      <div class="o-cells">
        <label class="o-cells__label"
          >Choisissez qui peut voir le souvenir</label
        >
        <div class="o-cells__container">
          <button
            v-for="(item, i) in items"
            :key="i"
            :class="{ selected: i === index }"
            class="o-cells__item"
            @click="select(i)"
          >
            <span class="o-cells__item-content">
              <span class="o-cells__item-text">{{ item.text }}</span>
              <span class="o-cells__item-help">{{ item.helper }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VISIBILITY } from '@/const/memory';
import IconChevron from '~/assets/svg/ic_chevron.svg?inline';

export default {
  name: 'Confidentiality',
  components: {
    IconChevron,
  },
  data() {
    return {
      index: null,
      items: [VISIBILITY.private, VISIBILITY.unlisted, VISIBILITY.public],
    };
  },
  methods: {
    select(index) {
      this.index = index;
      this.$store.commit('memory/updateVisibility', this.items[index].slug);
      this.$emit('back');
    },
  },
};
</script>
