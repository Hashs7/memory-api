<template>
  <div class="create">
    <h1>Ajouter un nouvel instrument</h1>

    <form @submit="submit">
      <div class="form__group">
        <b-field label="Nom">
          <b-input type="text" v-model="name"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Type">
          <b-input type="text" v-model="type"> </b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Spécification">
          <b-input type="text" v-model="specification"> </b-input>
        </b-field>
      </div>
      <button type="submit" class="button is-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import ApiService from '~/plugins/ApiService';

export default {
  name: 'NewInstrument',
  data() {
    return {
      success: false,
      name: '',
      type: '',
      specification: '',
    };
  },
  methods: {
    // Form submitted event
    async submit(e) {
      e.preventDefault();
      try {
        console.log(this.name);
        const res = await ApiService.newInstrument({
          name: this.name,
          type: this.type,
          specification: this.specification,
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
        message: "L'instrument vient d'être créé",
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
