<template>
  <div @resize.capture="sendSize" class="asset">
    <span
      :style="{ backgroundColor, transform: `translateX(${x})` }"
      class="asset__underlay"
    />
    <img
      ref="asset"
      v-if="isImage"
      v-lazy="{ src: url }"
      :alt="alt"
      class="asset__asset"
    />
    <video
      ref="asset"
      v-else
      :src="url"
      muted
      loop
      autoplay
      playsinline
      class="asset__asset"
    />
  </div>
</template>
<script>
import imageLoaded from 'imagesloaded';
import { throttle } from '@/helpers';

export default {
  props: {
    data: {
      required: true,
      type: Object,
    },
    x: {
      required: false,
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      loaded: false,
      backgroundColor: '#E5F0FB',
      throttleResize: throttle(() => this.sendSize(), 50),
      width: 0,
      height: 0,
    };
  },
  computed: {
    isImage() {
      return this.data.mimetype.split('/')[0] === 'image';
    },
    url() {
      return this.data.path;
    },
    alt() {
      return this.data.description;
    },
    preview() {
      if (!this.isImage) {
        return null;
      }
      return `${this.data.path}?w=10`;
    },
  },
  async mounted() {
    window.addEventListener('resize', () => this.throttleResize(), {
      passive: true,
    });
    this.$Lazyload.$on('loaded', (lazyEvent) => this.loadedHandler(lazyEvent));
    if (!this.isImage) return;
    this.backgroundColor = await this.$color(this.preview);
    console.log(this.backgroundColor);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.throttleResize);
  },
  methods: {
    open(src) {
      if (src === this.url) {
        this.loaded = true;
        if (!this.$refs.asset) return;
        this.backgroundColor = 'transparent';
        this.sendSize();
      }
    },
    loadedHandler(lazyEvent) {
      if (!this.$refs.asset) return;
      imageLoaded(this.$refs.asset).on('progress', (loadedEvent) => {
        if (!loadedEvent.images.length) return;
        this.width = loadedEvent.images[0].img.naturalWidth;
        this.height = loadedEvent.images[0].img.naturalHeight;
        this.open(lazyEvent.src);
      });
    },
    sendSize() {
      if (!this.$refs.asset) return;
      this.$emit('size', {
        natural: {
          width: this.width,
          height: this.height,
        },
        container: {
          width: this.$refs.asset.offsetWidth,
          height: this.$refs.asset.offsetHeight,
        },
      });
    },
  },
};
</script>
<style lang="scss">
.asset {
  position: relative;
  line-height: 0;
  height: 100%;
}

.asset__asset {
  position: relative;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 2;
  text-indent: -10000px;

  &[lazy='shown'] {
    opacity: 1;
  }

  &[lazy='loaded'] {
    opacity: 0;
    animation: fadein 0.1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
    @keyframes fadein {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}

video.asset__asset {
  background: black;
}

/* -------------------- Underlay -------------------- */
.asset__underlay {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: transparentize($primary, 0.9);
  //transition: background-color 0.2s cubic-bezier(0.77, 0, 0.175, 1);
}

/* -------------------- Video -------------------- */
@supports (object-fit: cover) and (-ms-ime-align: auto) {
  video.asset__asset {
    height: auto;
  }
}
</style>
