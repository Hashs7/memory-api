<template>
  <div class="o-page">
    <h1>Mes instruments</h1>
    <section class="view view--instrument-list">
      <b-tabs>
        <b-tab-item v-if="instruments.length" label="Actuels">
          <b-table
            :data="instruments"
            :columns="columns"
            :selected.sync="selected"
            focusable
          >
          </b-table>
        </b-tab-item>
        <b-tab-item v-if="instruments.length" label="Passés">
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
  middleware: 'auth',
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
      const res = await this.$api.getUserInstruments();
      instruments = [...res.data];
    } catch (e) {
      console.log(e);
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
