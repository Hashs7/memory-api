<template>
  <div class="o-page">
    <h1 class="o-page__title">Passation</h1>
    <div class="step-container">
      <div v-show="step === 0" class="step step-1">
        <p class="">Racontez nous !</p>
      </div>
      <div v-show="step === 1" class="step step-2">
        <img :src="illuSrc" alt="" />
        <canvas ref="canvas"></canvas>
        <p class="">Invitez le nouveau propriétaire</p>
        <ClipboardCopy v-if="url" :value="url">Copier le lien</ClipboardCopy>
      </div>
    </div>
    <button
      v-if="step !== 0"
      class="u-button u-button--outline"
      @click="stepBack"
    >
      Retour
    </button>
    <button
      v-if="step !== MAX_STEP"
      class="u-button u-button--primary"
      @click="requestHandover"
    >
      Suivant
    </button>
    <button v-else class="u-button u-button--primary">Terminer</button>
  </div>
</template>

<router>
path: /instrument/:id/passation
</router>

<script>
import QRCode from 'qrcode';
import illuSrc from '@/assets/img/illu_handover.gif';
import ClipboardCopy from '../../components/layout/ClipboardCopy';

export default {
  components: { ClipboardCopy },
  data() {
    return {
      illuSrc,
      MAX_STEP: 1,
      step: 0,
      token: null,
      url: null,
    };
  },
  computed: {
    instrumentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    stepBack() {
      this.step -= 1;
    },
    async requestHandover() {
      this.step = 1;
      try {
        const res = await this.$api.handoverInstrument(this.instrumentId);
        this.token = res.data.token;
        await this.showQRCode();
      } catch (e) {
        // console.error(e);
      }
    },
    async showQRCode() {
      this.url = `${window.location.href}/reception?token=${this.token}`;
      await QRCode.toCanvas(this.$refs.canvas, this.url);
    },
  },
};
</script>

<style scoped></style>
