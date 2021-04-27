<template>
  <div class="media-content">
    <div class="media-content__container">
      <button class="u-button u-button--primary">Prendre une photo</button>
      <button class="u-button u-button--primary">Choisir une photo</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaCreation',
};
</script>

<style scoped>
.media-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.media-content__container {
  margin: auto;
}

.u-button {
  margin-bottom: 8px;
}
</style>
