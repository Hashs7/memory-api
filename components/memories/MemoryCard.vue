<template>
  <div
    ref="card"
    class="memory-card"
    v-hammer:pan="pan"
    v-hammer:panend="panEnd"
  >
    <slot />
  </div>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'MemoryCard',
  data() {
    return {
      SWIPE_DISTANCE: 150,
      xMax: null,
      yMax: null,
      origin: {
        x: null,
        y: null,
      },
    };
  },
  mounted() {
    const { x, y, width, height } = this.$refs.card.getBoundingClientRect();
    this.origin = { x, y };
    this.xMax = x + width;
    this.yMax = y + height;
  },
  methods: {
    pan(e) {
      gsap.set(this.$refs.card, {
        x: Math.min(e.deltaX, 0),
        y: e.deltaY,
        rotate: -e.deltaY / 20,
      });
    },
    panEnd(e) {
      if (
        e.additionalEvent === 'panright' ||
        e.distance < this.SWIPE_DISTANCE
      ) {
        // Reset card postion
        gsap.to(this.$refs.card, { x: 0, y: 0, rotate: 0 });
        return;
      }
      this.$emit('swipe');
      gsap.to(this.$refs.card, {
        x: -this.xMax - 50,
        y: e.deltaY * 3,
        rotate: e.deltaY < 0 ? 35 : -35,
        overwrite: true,
      });
    },
  },
};
</script>

<style scoped>
.memory-card {
  transform-origin: center;
}
</style>
