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
      <div class="instrument-picture add" @click="$emit('showGallery')">
        <IconAdd />
        <button type="button">Ajouter</button>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import IconAdd from '@/assets/svg/ic_add.svg?inline';
import { mapState } from 'vuex';

export default {
  name: 'InstrumentImagesForm',
  components: {
    IconAdd,
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
    border: 1px solid $black;
  }

  .instrument-picture__remove {
    z-index: 5;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
