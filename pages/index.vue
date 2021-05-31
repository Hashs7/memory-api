<template>
  <div class="o-page">
    <section class="view view--instrument-list">
      <b-tabs>
        <b-tab-item v-if="instruments.length" label="Instruments">
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
  </div>
</template>

<script>
export default {
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
  async fetch() {
    let instruments = [];
    try {
      const res = await this.$api.getInstruments();
      instruments = [...res.data];
    } catch (e) {
      throw new Error(e);
    }
    this.instruments = [...instruments];
  },
  fetchOnServer: false,
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
