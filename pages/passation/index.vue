<template>
  <div class="o-page">
    <h1 class="o-page__title">Passation</h1>
    <div class="step-container">
      <div class="step step-1">
        <p class="">Racontez nous !</p>
      </div>
      <div class="step step-2">
        <canvas ref="canvas"></canvas>
        <p class="">Invitez le nouveau propriétaire</p>
      </div>
    </div>
    <button @click="requestHandover">Suivant</button>
    <button>Terminer</button>
  </div>
</template>

<router>
path: /instrument/:id/passation
</router>

<script>
import QRCode from 'qrcode';

export default {
  methods: {
    requestHandover() {
      // TODO on api response show qrcode
      this.showQRCode();
    },
    async showQRCode() {
      await QRCode.toCanvas(this.$refs.canvas, 'https://example.com');
    },
  },
};
</script>

<style scoped></style>
