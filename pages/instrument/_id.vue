<template>
  <div class="instrument">
    <div v-if="instrument">
      <div v-if="instrument.image" class="instrument__image">
        <img :src="instrument.image.path" alt="" />
      </div>
      <div class="instrument__container">
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
          <div class="user">
            <div class="user__picture">
              <img
                :src="instrument.owner.thumbnail.path"
                alt="photo de profile"
              />
            </div>
            <div class="user__infos">
              {{ instrument.owner.firstName }} {{ instrument.owner.lastName }}
            </div>
          </div>
        </div>

        <div v-if="isOwner">
          <NuxtLink :to="addMemmory" class="u-button u-button--primary"
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

      <div class="memories">
        <h3>Souvenirs ({{ memoriesCount }})</h3>
        <MemoryPreview
          v-for="m in instrument.memories"
          :key="m._id"
          :link="true"
          :memory="m"
        />
      </div>
    </div>

    <NuxtChild :instrument="instrument" />
  </div>
</template>

<script>
import MemoryPreview from '@/components/memories/MemoryPreview';

export default {
  components: { MemoryPreview },
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
  computed: {
    addMemmory() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/creation`;
    },
    handover() {
      const { id } = this.$route.params;
      return `/instrument/${id}/passation`;
    },
    memoriesCount() {
      return this.instrument.memories.length;
    },
    isOwner() {
      console.log(this.instrument.owner._id, this.$auth.$state);
      return this.instrument.owner._id === this.$auth.$state.user._id;
    },
    isFavorite() {
      if (this.isOwner) return false;
      console.log(this.$auth.$state.user);
      return this.$auth.$state.user.wishList?.includes(this.instrument._id);
      // return true;
    },
  },
  methods: {
    async addToWish() {
      try {
        const res = await this.$api.addInstrumentToWishlist(
          this.instrument._id
        );
        this.$auth.setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
.instrument__container {
  position: relative;
  z-index: 1;
  margin-top: -32px;
  padding-top: 22px;
  border-radius: 32px 32px 0 0;
  background-color: #fff;
}
.instrument__head {
  text-align: center;
  margin-bottom: 20px;
}
.instrument__title {
  font-size: 26px;
}
.instrument__description {
  font-size: 16px;
  font-weight: 400;
}
.instrument__owner {
  text-align: center;
  margin-bottom: 20px;
}

.user {
  display: flex;
  align-items: center;
}

.user__picture {
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
