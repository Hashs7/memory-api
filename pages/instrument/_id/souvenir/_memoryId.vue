<template>
  <div class="o-page o-page--memory">
    <div class="o-page__container">
      <div class="memory-slider">
        <div :class="[getClass(0)]" class="memory">
          <h1 v-if="memory" class="memory__title">{{ memory.name }}</h1>
        </div>
        <div
          v-for="(c, i) in contents"
          :key="i"
          :class="[getClass(i + 1)]"
          class="memory memory--content"
        >
          {{ c.component }}
        </div>
      </div>
      <button
        class="memory-slider__control memory-slider__previous"
        @click="previous"
      ></button>
      <button
        class="memory-slider__control memory-slider__next"
        @click="next"
      ></button>
    </div>
    <nuxt-link :to="closeMemory" class="memory__background"></nuxt-link>
  </div>
</template>

<router>
  path: /instrument/:id/souvenir/:memoryId
</router>

<script>
export default {
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
      contents: [
        {
          component: 'audio',
        },
        {
          component: 'media',
        },
        {
          component: 'text',
        },
      ],
    };
  },
  computed: {
    memory() {
      const { memoryId } = this.$route.params;
      return this.instrument?.memories.find((m) => m._id === memoryId);
    },

    closeMemory() {
      const { id } = this.$route.params;
      return `/instrument/${id}`;
    },
  },
  methods: {
    previous() {
      if (this.index === 0) return;
      this.index--;
    },

    next() {
      if (this.index >= this.contents.length) return;
      this.index++;
    },

    getClass(contentIndex) {
      let setClass = '';
      switch (contentIndex) {
        case this.index:
          setClass = 'active';
          break;
        case this.index - 1:
          setClass = 'previous';
          break;
        case this.index - 2:
          setClass = 'previous--second';
          break;
        case this.index + 1:
          setClass = 'next';
          break;
        case this.index + 2:
          setClass = 'next--second';
          break;
      }
      return setClass;
    },
  },
};
</script>

<style lang="scss" scoped>
.o-page--memory {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
}

.memory__background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
}

.o-page__container {
  position: relative;
  z-index: 10;
  height: 100%;
}

.memory-slider {
  position: relative;
  height: 100%;
}

.memory {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  padding: 32px;
  background-color: #fff;
  box-shadow: $shadow--first;

  &.active {
    z-index: 10;
  }
  &.next {
    transform: scale(0.95) translateX(24px);
    z-index: 9;
  }
  &.next--second {
    transform: scale(0.9) translateX(48px);
    z-index: 8;
  }
  &.previous {
    transform: scale(0.95) translateX(-24px);
    z-index: 9;
  }
  &.previous--second {
    transform: scale(0.9) translateX(-48px);
    z-index: 8;
  }
}

.memory-slider__control {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25%;
  z-index: 20;
  opacity: 0;
}

.memory-slider__previous {
  left: 0;
}

.memory-slider__next {
  right: 0;
}

.memory__title {
  font-size: 40px;
}
</style>
