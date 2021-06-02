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
};
</script>

<style lang="scss">
.o-section__pictures {
  .__view {
    display: flex;
    padding: 0 16px 8px 16px;
  }
}
</style>
