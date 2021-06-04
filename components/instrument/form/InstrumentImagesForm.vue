<template>
  <div class="o-section__pictures o-page__outside">
    <vue-scroll :ops="ops">
      <template v-if="data" class="instrument-picture">
        <div
          v-for="img in data.images"
          :key="img._id"
          class="instrument-picture"
        >
          <img :src="img.path" alt="" />
          <button class="instrument-picture__remove" @click="remove(img._id)">
            x
          </button>
        </div>
      </template>
      <ButtonSquare
        class="instrument-picture add"
        @click.native="$emit('showGallery')"
      />
    </vue-scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ButtonSquare from '../../UI/ButtonSquare';

export default {
  name: 'InstrumentImagesForm',
  components: {
    ButtonSquare,
  },
  data() {
    return {
      ops: {
        vuescroll: {
          locking: true,
        },
        scrollPanel: {},
        rail: {},
        bar: {},
      },
    };
  },
  computed: {
    ...mapState('instrument', ['data']),
  },
  methods: {
    remove(_id) {
      this.$store.commit('instrument/removeImage', _id);
    },
  },
};
</script>

<style lang="scss">
.o-section__pictures {
  .__view {
    display: flex;
    padding: 0 16px 8px 16px;
  }
}

.instrument-picture {
  position: relative;
  width: 156px;
  height: 156px;
  margin-right: 12px;
  overflow: hidden;

  &.add {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .instrument-picture__remove {
    z-index: 5;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
