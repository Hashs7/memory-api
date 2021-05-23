<template>
  <div class="o-page">
    <h1>Nouveau</h1>

    <div class="action" role="button" @click="newInstant">
      <h3 class="action__title">Capturer un moment</h3>
      <p>
        Cum abnoba manducare, omnes menses examinare magnum, superbus terrores.
      </p>
    </div>

    <div class="action" role="button" @click="newMemory">
      <h3 class="action__title">Écrire un souvenir</h3>
      <p>Heu, secundus abaculus!</p>
    </div>

    <Gallery />
  </div>
</template>

<script>
import Gallery from '../components/user/gallery/Gallery';

export default {
  name: 'Capture',
  components: {
    Gallery,
  },
  methods: {
    newMemory() {
      // TODO Open instrument selector then open instrument memory creation
    },
    newInstant() {
      // TODO Open camera and save image to gallery
    },
  },
};
</script>

<style scoped></style>
