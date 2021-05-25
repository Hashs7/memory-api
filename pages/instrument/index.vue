<template>
  <div class="o-page">
    <h1>Mes instruments</h1>
    <section class="view view--instrument-list">
      <b-tabs>
        <b-tab-item v-if="userInstruments.length" label="Actuels">
          <b-table
            :data="userInstruments"
            :columns="columns"
            :selected.sync="selected"
            focusable
          >
          </b-table>
        </b-tab-item>
        <b-tab-item v-if="oldInstruments.length" label="Passés">
          <b-table
            :data="oldInstruments"
            :columns="columns"
            :selected.sync="selected"
            focusable
          >
          </b-table>
        </b-tab-item>
        <b-tab-item v-if="wishInstruments.length" label="Favoris">
          <b-table
            :data="wishInstruments"
            :columns="columns"
            :selected.sync="selected"
            focusable
          >
          </b-table>
        </b-tab-item>
      </b-tabs>
    </section>
    <NuxtLink to="/instrument/creation" class="u-button u-button--primary"
      >Ajouter un instrument</NuxtLink
    >
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      userInstruments: [],
      oldInstruments: [],
      wishInstruments: [],
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
    try {
      const res = await this.$api.getUserInstruments();
      console.log(res.data);
      const { userInstruments, oldInstruments, wishInstruments } = res.data;
      console.log(userInstruments, oldInstruments, wishInstruments);
      this.userInstruments = userInstruments;
      this.oldInstruments = oldInstruments;
      this.wishInstruments = wishInstruments;
    } catch (e) {
      console.log(e);
    }
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
