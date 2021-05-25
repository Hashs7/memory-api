<template>
  <div :class="[memory.template]" class="o-page o-page--memory">
    <div class="o-page__container">
      <div class="memory-slider">
        <MemoryCard :class="[getClass(0)]" class="memory" @swipe="next">
          <h1 v-if="memory" class="memory__title">{{ memory.name }}</h1>
        </MemoryCard>
        <MemoryCard
          v-for="(c, i) in contents"
          :key="i"
          :class="[c.type, mediaType(c.file), getClass(i + 1), c.component]"
          class="memory memory--content"
          @swipe="next"
        >
          <img v-if="mediaType(c.file) === 'image'" :src="c.file.path" alt="" />
          <video
            v-if="mediaType(c.file) === 'video'"
            :src="c.file.path"
            controls
          />
          <span v-if="c.type !== 'media'">{{ c.type }}</span>
        </MemoryCard>
      </div>
    </div>
    <nuxt-link :to="closeMemory" class="memory__background"></nuxt-link>
  </div>
</template>

<router>
  path: /instrument/:id/souvenir/:memoryId
</router>

<script>
import MemoryCard from '@/components/memories/MemoryCard';

export default {
  components: { MemoryCard },
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      index: 0,
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

    contents() {
      return this.memory.contents;
    },
  },
  mounted() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    console.log(this.memory);
  },
  methods: {
    mediaType(file) {
      return file.mimetype.split('/')[0];
    },

    previous() {
      if (this.index === 0) return;
      this.index--;
    },

    next() {
      if (this.index >= this.contents.length) {
        this.removeBodyStyle();
        this.$router.push(this.closeMemory);
        return;
      }
      this.index++;
    },

    removeBodyStyle() {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    },

    select(index) {
      this.index = index;
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
  overflow: hidden;
  border-radius: 8px;

  &.media {
    padding: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &.video {
      display: flex;
      align-items: center;
      background-color: #000;
    }
  }

  &.active {
    z-index: 10;
  }
  &.next {
    transform: scale(0.98) translateX(24px);
    z-index: 9;
  }
  &.next--second {
    transform: scale(0.96) translateX(44px);
    z-index: 8;
  }
  &.previous {
    transform: scale(0.98) translateX(-24px);
    z-index: 9;
  }
  &.previous--second {
    transform: scale(0.96) translateX(-44px);
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

// Templates
.o-page--memory {
  &.sardines {
  }
}
</style>
