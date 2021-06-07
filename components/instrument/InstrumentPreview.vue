<template>
  <NuxtLink :to="link" class="instrument-preview">
    <Asset v-if="thumbnail" :data="thumbnail" class="instrument-preview__img" />
    <div class="instrument-preview__content">
      <p class="instrument-preview__name">{{ instrumentName }}</p>
      <p v-if="data.createdAt" class="instrument-preview__date">
        Ajouté en {{ date }}
      </p>
    </div>
    <button
      v-if="showFavorite"
      :class="{ selected: isFavorite }"
      class="instrument-preview__fav"
      @click.prevent.stop="toggleFav"
    >
      <IconHeart />
    </button>
  </NuxtLink>
</template>

<script>
import IconHeart from '@/assets/svg/ic_heart.svg?inline';
import Asset from '../layout/Asset';

export default {
  name: 'InstrumentPreview',
  components: {
    Asset,
    IconHeart,
  },
  props: {
    showFavorite: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,

      _id: {
        type: String,
        required: true,
      },

      id: {
        type: String,
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      images: {
        type: Array,
        default: () => [],
      },
    },
  },
  computed: {
    link() {
      return {
        name: 'instrument-id',
        params: { id: this.data.id },
      };
    },
    isFavorite() {
      return this.$auth.$state.user.wishList.includes(this.data._id);
    },
    date() {
      const date = new Date(this.data.createdAt);
      const year = date.getFullYear();
      const month =
        date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
      return `${month}/${year}`;
    },
    thumbnail() {
      return this.data.images[0];
    },
    instrumentName() {
      if (this.data.name) {
        return this.data.name;
      }
      return `${this.data.brand} ${this.data.specification}`;
    },
  },
  methods: {
    async toggleFav() {
      try {
        const res = await this.$api.toggleInstrumentToWishlist(this.data._id);
        this.$auth.setUser(res.data);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.instrument-preview {
  position: relative;
  display: block;
  width: 100%;
  height: 248px;
  background-color: $gray-lightest;
  border-radius: 4px;
  overflow: hidden;
  color: $white;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  &:after {
    content: '';
    z-index: 1;
    position: absolute;
    height: 70%;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.5018382352941176) 100%
    );
  }
}

.instrument-preview__content {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
}

.instrument-preview__name {
  line-height: 1.2;
  font-weight: 700;
  text-transform: capitalize;
}

.instrument-preview__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.instrument-preview__date {
  font-size: 14px;
  line-height: 1;
}
.instrument-preview__fav {
  z-index: 3;
  position: absolute;
  top: 12px;
  right: 8px;
  padding: 0;
  border: none;
  background-color: transparent;
  width: 32px;
  height: 32px;

  &.selected {
    path {
      fill: $background;
    }
  }
}
</style>
