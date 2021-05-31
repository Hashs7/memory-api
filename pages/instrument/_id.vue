<template>
  <div class="instrument">
    <div v-if="instrument">
      <div v-if="instrument.image" class="instrument__image-container">
        <img class="instrument__image" :src="instrument.image.path" alt="" />
      </div>
      <div class="instrument__container o-page__container">
        <div class="instrument__head">
          <h1 class="instrument__title">{{ instrument.name }}</h1>
          <h2
            v-if="instrument.brand || instrument.specification"
            class="instrument__description"
          >
            <span v-if="instrument.brand">{{ instrument.brand }}</span>
            <span v-if="instrument.brand && instrument.specification"> - </span>
            <span v-if="instrument.specification">
              {{ instrument.specification }}
            </span>
          </h2>
        </div>

        <div class="instrument__owner">
          <UserPreview :user="instrument.owner" />
        </div>

        <div v-if="isOwner">
          <NuxtLink :to="addMemory" class="u-button u-button--primary"
            >Ajouter un souvenir</NuxtLink
          >

          <NuxtLink :to="handover" class="u-button u-button--primary"
            >Vendre</NuxtLink
          >
        </div>
        <div v-else class="instrument__not-owner">
          <button
            :class="[isFavorite]"
            class="u-button"
            @click.prevent="addToWish"
          >
            {{ !isFavorite ? 'Ajouter aux favoris' : 'Enlever des favoris' }}
          </button>
        </div>
      </div>

      <MemorySection
        :memories="instrument.memories"
        class="o-page__container"
      />
    </div>

    <NuxtChild :is-owner="isOwner" :instrument="instrument" />
  </div>
</template>

<script>
import UserPreview from '../../components/user/UserPreview';
import MemorySection from '../../components/memories/MemorySection';

export default {
  components: { MemorySection, UserPreview },
  layout(ctx) {
    let layout = 'default';
    if (ctx.route.params.memoryId) {
      layout = 'none';
    }
    return layout;
  },
  async asyncData({ $api, params }) {
    const instrument = (await $api.getInstrumentById(params.id))?.data;
    return {
      instrument,
    };
  },
  fetchOnServer: false,
  computed: {
    addMemory() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/creation`;
    },
    handover() {
      const { id } = this.$route.params;
      return `/instrument/${id}/passation`;
    },
    isOwner() {
      return this.instrument.owner._id === this.$auth.$state.user?._id;
    },
    isFavorite() {
      if (this.isOwner) return false;
      return this.$auth.$state.user?.wishList?.includes(this.instrument._id);
    },
  },
  methods: {
    async addToWish() {
      try {
        const res = await this.$api.toggleInstrumentToWishlist(
          this.instrument._id
        );
        this.$auth.setUser(res.data);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style lang="scss">
.instrument__container {
  position: relative;
  z-index: 1;
  padding-top: 22px;
}
.instrument__head {
  text-align: center;
  margin-bottom: 20px;
}
.instrument__image-container {
  height: 100vw;
  max-height: 500px;
}
.instrument__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.instrument__title {
  font-size: 26px;
}
.instrument__description {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 400;
  font-family: $font-primary;
}
.instrument__owner {
  text-align: center;
  margin-bottom: 20px;
}
</style>
