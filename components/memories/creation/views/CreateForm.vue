<template>
  <div class="o-page o-page--create">
    <div class="o-page__header o-page__header-nav">
      <button class="o-page__header-btn icon" @click="$emit('back')">
        <IconChevron />
      </button>
      <span>Racontez l'histoire de votre instrument</span>
    </div>

    <form class="o-page__body">
      <div class="slider">
        <SlideIntro />

        <div v-for="(c, i) in contents" :key="i" class="slider__item">
          <component :is="c.component" v-if="c.component" :key="i" :index="i" />
          <button type="button" class="slider__close" @click="removeItem(i)">
            x
          </button>
        </div>

        <SliderAdd />
      </div>
    </form>

    <form v-if="showThemes" class="o-page--full themes">
      <div class="themes__container">
        <h3>Choisissez votre thème</h3>
        <div class="themes__grid">
          <ThemeSelector v-for="(t, i) in themes" :key="i" :theme="t" />
        </div>
      </div>
      <span
        class="o-page--full themes__background"
        @click="showThemes = false"
      ></span>
    </form>

    <div class="o-page__footer actions">
      <button
        type="button"
        class="button u-button u-button--round actions__theme"
        @click="showThemes = !showThemes"
      >
        <IconBrush />
      </button>
      <button
        type="button"
        class="button u-button u-button--round actions__submit"
        @click="$emit('next')"
      >
        <IconCheck />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SlideIntro from '@/components/memories/creation/slider/SlideIntro';
import SliderAdd from '@/components/memories/creation/slider/SliderAdd';
import TextContent from '@/components/memories/creation/contents/TextContent';
import AudioContent from '@/components/memories/creation/contents/AudioContent';
import MediaContent from '@/components/memories/creation/contents/MediaContent';
import ThemeSelector from '@/components/memories/creation/ThemeSelector';
import MemoryPreview from '@/components/memories/MemoryPreview';
import IconCheck from '@/assets/svg/ic_check.svg?inline';
import IconBrush from '@/assets/svg/ic_brush.svg?inline';
import IconChevron from '@/assets/svg/ic_chevron.svg?inline';

export default {
  name: 'CreateForm',
  components: {
    ThemeSelector,
    SlideIntro,
    SliderAdd,
    TextContent,
    AudioContent,
    MediaContent,
    MemoryPreview,
    IconCheck,
    IconBrush,
    IconChevron,
  },
  data() {
    return {
      showThemes: false,
    };
  },
  computed: {
    ...mapState({
      contents: (state) => state.memory.contents,
      themes: (state) => state.memory.themes,
    }),
  },
  methods: {
    // Instrument created callback
    createdHandler() {
      this.$buefy.toast.open({
        message: "Le souvenir vient d'être créé",
        type: 'is-success',
      });
    },

    removeItem(index) {
      this.$store.commit('memory/removeContent', index);
    },
  },
};
</script>

<style lang="scss">
.o-page--create {
  background-color: $gray-lightest;
}

.o-page__footer {
  display: flex;
  justify-content: space-between;
}

.form__group {
  max-width: 300px;
  margin: 0 auto 16px auto;

  label {
    text-align: left;
    display: block;
  }

  input {
    width: 100%;
  }
}

.slider {
  display: flex;
  overflow: auto;
  padding: 8px 24px;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
}

.slider__item {
  position: relative;
  min-width: calc(100vw - 60px);
  height: calc((100vw - 60px) * (16 / 9));
  margin: 20px 12px;
  box-shadow: $shadow--first;
  border-radius: $radius;
  background-color: $white;
}

.slider__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: $white;
  box-shadow: $shadow--second;
  border: none;
  transform: translate(25%, -25%);
}

.themes {
  z-index: 20;
  margin-top: 124px;
}

.themes__container {
  position: relative;
  z-index: 20;
  padding: 22px;
  border-radius: 24px 24px 0 0;
  box-shadow: $shadow--first;
  background-color: $white;
}

.themes__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
}

.actions {
  margin-bottom: 17px;
  padding: 0 19px;
  &__submit,
  &__theme {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 5px solid white;
    width: 48px;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.13);
    height: 48px;

    svg {
      width: 18px;
    }
  }
  &__theme {
    background-color: $secondary;
  }

  &__submit {
    background-color: $primary;
  }
}
</style>
