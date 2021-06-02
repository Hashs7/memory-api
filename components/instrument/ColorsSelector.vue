<template>
  <div class="colors-selector">
    <h4>Couleurs ({{ selectedColors.length }})</h4>

    <div class="o-page__outside colors-selector__container">
      <vue-scroll>
        <button
          v-for="c in colors"
          :key="c"
          :class="[c, { selected: selected(c) }]"
          class="color"
          type="button"
          @click.prevent="toggle(c)"
        >
          <span class="color__circle"></span>
        </button>
      </vue-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorsSelector',
  data() {
    return {
      colors: [
        'white',
        'gray',
        'black',
        'red',
        'blue',
        'yellow',
        'green',
        'pink',
        'brown',
      ],
    };
  },
  computed: {
    selectedColors() {
      return this.$store.state.instrument.data.colors;
    },
  },
  methods: {
    selected(slug) {
      return this.selectedColors?.includes(slug);
    },
    toggle(slug) {
      this.$store.commit('instrument/toggleColor', slug);
    },
  },
};
</script>

<style lang="scss">
.color {
  display: block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  padding: 4px;
  border: 2px solid $background-darker;
  background-color: transparent;
  margin-right: 8px;

  .color__circle {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &.selected {
    border-color: $black;
  }
}

.colors-selector__container .__view {
  display: flex;
  padding: 0 16px 8px 16px;
}

.color.white {
  .color__circle {
    background-color: #fff;
  }
}

.color.gray {
  .color__circle {
    background-color: gray;
  }
}

.color.black {
  .color__circle {
    background-color: $black;
  }
}

.color.red {
  .color__circle {
    background-color: red;
  }
}

.color.blue {
  .color__circle {
    background-color: blue;
  }
}

.color.yellow {
  .color__circle {
    background-color: yellow;
  }
}

.color.green {
  .color__circle {
    background-color: green;
  }
}

.color.pink {
  .color__circle {
    background-color: pink;
  }
}

.color.brown {
  .color__circle {
    background-color: saddlebrown;
  }
}
</style>
