<template>
  <div class="">
    <h3>Sélectionnez vos centres d'intérêts en cliquant dessus</h3>
    <div class="categories">
      <button
        v-for="(c, i) in categories"
        :key="i"
        :class="{ selected: isSelected(c.slug) }"
        class="categories__item"
        @click="selectCategory(c.slug)"
      >
        <span>{{ c.text }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoForm',
  data() {
    return {
      selectedSlugs: [],
      categories: [
        {
          slug: 'rennovation',
          text: 'Rennovation',
        },
        {
          slug: 'concerts',
          text: 'Concerts',
        },
        {
          slug: 'repetitions',
          text: 'Répétitions',
        },
        {
          slug: 'rock',
          text: 'Rock',
        },
      ],
    };
  },
  methods: {
    selectCategory(slug) {
      const index = this.selectedSlugs.indexOf(slug);
      if (index === -1) {
        this.selectedSlugs.push(slug);
        return;
      }
      this.selectedSlugs.splice(index, 1);
    },
    isSelected(slug) {
      return this.selectedSlugs.includes(slug);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories__item {
  cursor: pointer;
  user-select: none;
  display: inline-block;
  border: 2px solid #e7e0c5;
  border-radius: 4px;
  padding: 0 12px;
  height: 32px;
  line-height: 16px;
  background-color: transparent;

  &.selected {
    background-color: #e7e0c5;
  }
}
</style>
