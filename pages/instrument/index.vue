<template>
  <section class="view view--instrument-list">
    <b-tabs>
      <b-tab-item label="Liste des instruments public">
        <b-table
          :data="instruments"
          :columns="columns"
          :selected.sync="selected"
          focusable
        >
        </b-table>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
export default {
  async asyncData({ $api }) {
    const res = await $api.getInstruments();
    return {
      instruments: [...res.data],
    };
  },
  data() {
    return {
      instruments: [],
      selected: null,
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
        },
        {
          field: 'name',
          label: 'Nom',
        },
        {
          field: 'specification',
          label: 'Spécification',
        },
        {
          field: 'type',
          label: 'Type',
        },
      ],
    };
  },
  watch: {
    async selected(newVal) {
      await this.$router.push({
        name: 'instrument-id',
        params: { id: newVal.id },
      });
    },
  },
};
</script>
