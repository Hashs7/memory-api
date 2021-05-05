<template>
  <div class="o-page o-page--summary">
    <div class="o-page__header">
      <button @click="showConfidentiality = false">back</button>
      <span>Confidentialité</span>
    </div>
    <div class="o-page__body">
      <div class="">
        <label>Choisissez qui peut voir le souvenir</label>
        <div class="">
          <button>
            <span class="__text">Moi seulement</span>
            <span class="__help">Vous seul pouvez voir ce souvenir</span>
          </button>
          <button>
            <span class="__text">Non répertorié</span>
            <span class="__help"
              >Seul les personnes disposant du lien y ont accès</span
            >
          </button>
          <button>
            <span class="__text">Fans seulement</span>
            <span class="__help">Seuls vos amis pourront voir ce souvenir</span>
          </button>
          <button>
            <span class="__text">Tout le monde</span>
            <span class="__help">Votre souvenir est publique</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confidentiality',
};
</script>

<style scoped></style>
