<template>
  <div class="o-page">
    <h1 class="o-page__title">Ajouter</h1>

    <section class="">
      <TabSections :sections="sections">
        <template #section0>
          <CaptureActions />
        </template>
        <template #section1>
          <Gallery preview />
        </template>
      </TabSections>
    </section>
  </div>
</template>

<script>
import Gallery from '../components/gallery/Gallery';
import TabSections from '../components/layout/TabSections';
import CaptureActions from '../components/CaptureActions';

export default {
  name: 'Capture',
  components: {
    CaptureActions,
    TabSections,
    Gallery,
  },
  data() {
    return {
      sections: [
        {
          name: 'new',
          class: 'new',
          nav: 'Nouveau',
        },
        {
          name: 'memories',
          class: 'memories',
          nav: 'Galerie',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
