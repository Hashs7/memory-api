<template>
  <client-only>
    <audio-recorder
      upload-url="apiUrl"
      :attempts="3"
      :time="2"
      :headers="headers"
      :before-recording="callback"
      :pause-recording="callback"
      :after-recording="callback"
      :select-record="callback"
      :before-upload="callback"
      :successful-upload="callback"
      :failed-upload="callback"
    />
  </client-only>
</template>

<script>
export default {
  name: 'AudioCreation',
  computed: {
    headers() {
      return {};
    },
    apiUrl() {
      return '';
    },
  },
  methods: {
    callback() {},
  },
};
</script>

<style lang="scss">
.ar {
  width: 100% !important;
  height: 100% !important;
  font-family: $font-primary !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

.ar-player {
  display: none !important;
  width: 100%;
}

.ar-content {
  height: 100%;
  justify-content: center;
}

.ar-icon {
  border-color: $secondary !important;
}

.ar-recorder__time-limit {
  display: none !important;
}

.ar-recorder__records-limit {
  display: none !important;
}

.ar-volume {
  display: none !important;
}

.ar-records {
  width: 100% !important;
}

.ar-records__record {
  width: 100% !important;
}
</style>
