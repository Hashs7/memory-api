<template>
  <div class="instrument">
    <ButtonBack class="instrument__back" />

    <div v-if="instrument">
      <ImagesCarousel v-if="thumbnail" :data="instrument.images" />
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

        <OwnerActions
          v-if="isOwner"
          :instrument="instrument"
          @update="updateInstrument"
        />

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

    <NuxtChild v-if="instrument" :is-owner="isOwner" :instrument="instrument" />
  </div>
</template>

<script>
import UserPreview from '../../components/user/UserPreview';
import MemorySection from '../../components/memories/MemorySection';
import ImagesCarousel from '../../components/instrument/ImagesCarousel';
import OwnerActions from '../../components/instrument/OwnerActions';
import ButtonBack from '../../components/UI/ButtonBack';

export default {
  components: {
    ButtonBack,
    OwnerActions,
    ImagesCarousel,
    MemorySection,
    UserPreview,
  },
  layout(ctx) {
    let layout = 'default';
    if (ctx.route.params.memoryId) {
      layout = 'none';
    }
    return layout;
  },
  async asyncData({ $api, params, redirect }) {
    try {
      const instrument = (await $api.getInstrumentById(params.id))?.data;
      return {
        instrument,
      };
    } catch (e) {
      redirect('/404/');
    }
  },
  fetchOnServer: false,
  computed: {
    isOwner() {
      return this.instrument.owner._id === this.$auth.$state.user?._id;
    },
    isFavorite() {
      if (this.isOwner) return false;
      return this.$auth.$state.user?.wishList?.includes(this.instrument._id);
    },
    thumbnail() {
      return this.instrument.images[0]?.path;
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
    back() {
      this.$router.go(-1);
    },
    updateInstrument(data) {
      this.instrument = data;
    },
  },
};
</script>

<style lang="scss">
.instrument {
  position: relative;
}

.instrument__back {
  z-index: 5;
  position: absolute;
  top: 18px;
  left: 18px;
}

.instrument__container {
  position: relative;
  z-index: 1;
  padding-top: 22px;
}

.instrument__head {
  text-align: center;
  margin-bottom: 20px;
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
