<template>
  <div :class="[memory.template]" class="o-page--memory">
    <div class="o-page__container">
      <div class="memory__head">
        <div class="memory__title">
          <h1 v-if="memory" class="memory__title">{{ memory.name }}</h1>
        </div>
        <div v-if="isOwner" class="memory__owner">
          <UserPreview :user="instrument.owner" :short="true" />
        </div>
      </div>

      <div class="memory-slider">
        <MemoryCard :class="[getClass(0)]" @swipe="next">
          <p class="memory__description">
            Select your favorite social network and share our icons with your
            contacts or friends, if you do not have these social networks copy
            the link and paste it in the one you use. For more information read
            the
          </p>
          <ul class="memory-card__tag-container">
            <li class="memory-card__tag">Variété</li>
            <li class="memory-card__tag">Concerts</li>
          </ul>
        </MemoryCard>
        <MemoryCard
          v-for="(c, i) in contents"
          :key="i"
          :class="[c.type, mediaType(c.file), getClass(i + 1), c.component]"
          class="memory--content"
          @swipe="next"
        >
          <img v-if="mediaType(c.file) === 'image'" :src="c.file.path" alt="" />
          <video
            v-if="mediaType(c.file) === 'video'"
            :src="c.file.path"
            controls
          />
          <span v-if="c.type !== 'media'">
            <p v-html="c.content"></p>
          </span>
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
import UserPreview from '@/components/user/UserPreview';

export default {
  components: { UserPreview, MemoryCard },
  props: {
    instrument: {
      type: Object,
      required: true,
    },
    isOwner: {
      type: Boolean,
      default: false,
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
      return this.instrument?.memories.find((m) => m.id === memoryId);
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
    // document.body.style.height = '100vh';
  },
  beforeDestroy() {
    this.removeBodyStyle();
  },
  methods: {
    mediaType(file) {
      return file?.mimetype.split('/')[0];
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
  z-index: 200;
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;

  .o-page__container {
    padding: 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }
}

.memory__title {
  font-size: 20px;
  margin-bottom: 12px;
  color: $black;
}
.memory__head {
  text-align: center;
  color: $black;
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
  height: auto;
  flex-grow: 1;
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

// Templates
.o-page--memory {
  &.sardines {
  }
}
</style>
