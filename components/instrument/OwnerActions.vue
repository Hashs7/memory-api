<template>
  <div class="owner-actions">
    <NuxtLink :to="addMemory" class="u-button u-button--primary">
      Ajouter un souvenir
    </NuxtLink>

    <button class="u-button u-button--primary" @click="toggleForSale">
      {{ instrument.forSale ? 'Retirer de la vente' : 'Mettre en vente' }}
    </button>

    <NuxtLink
      v-if="instrument.forSale"
      :to="handover"
      class="u-button u-button--primary"
    >
      Passation
    </NuxtLink>

    <NuxtLink :to="edit" class="u-button u-button--primary">
      Modifier les informations
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'OwnerActions',
  props: {
    instrument: {
      type: Object,
      required: true,
    },
  },
  computed: {
    addMemory() {
      const { id } = this.$route.params;
      return `/instrument/${id}/souvenir/creation`;
    },
    handover() {
      const { id } = this.$route.params;
      return `/instrument/${id}/passation`;
    },
    edit() {
      const { id } = this.$route.params;
      return `/instrument/${id}/edit`;
    },
  },
  methods: {
    async toggleForSale() {
      try {
        const res = await this.$api.updateInstrument(this.instrument.id, {
          forSale: !this.instrument.forSale,
        });
        this.$emit('update', res.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped></style>
