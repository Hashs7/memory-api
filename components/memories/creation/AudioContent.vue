<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'AudioCreation',
  computed: {
    headers() {
      return '';
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

<style>
.ar {
  width: 100% !important;
}
</style>
