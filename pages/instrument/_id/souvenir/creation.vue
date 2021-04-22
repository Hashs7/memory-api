<template>
  <div class="create">
    <h1>Ajouter un nouveau souvenir</h1>

    <form @submit="submit">
      <div class="form__group">
        <b-field label="Titre">
          <b-input type="text" v-model="name"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Date">
          <b-datepicker
            ref="datepicker"
            v-model="date"
            expanded
            placeholder="Select a date"
          >
          </b-datepicker>
          <b-button
            @click="$refs.datepicker.toggle()"
            icon-left="calendar-today"
            type="is-primary"
          />
        </b-field>
      </div>
      <div class="form__group"></div>
      <button type="submit" class="button is-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewInstrument',
  data() {
    return {
      success: false,
      name: '',
      date: [],
      type: 'Concert',
    };
  },
  methods: {
    // Form submitted event
    async submit(e) {
      e.preventDefault();
      try {
        console.log(this.title, this.date, this.$route.params.id);
        const res = await this.$api.newMemory(this.$route.params.id, {
          name: this.name,
          date: this.date,
          type: this.type,
        });
        console.log('created callback', res);
        this.createdHandler();
      } catch (e) {
        console.error(e);
      }
    },

    // Instrument created callback
    createdHandler() {
      this.$buefy.toast.open({
        message: "Le souvenir vient d'être créé",
        type: 'is-success',
      });
    },
  },
};
</script>

<style lang="scss">
.form__group {
  max-width: 300px;
  margin: 0 auto 16px auto;

  label {
    text-align: left;
    display: block;
  }

  input {
    width: 100%;
  }
}
</style>
