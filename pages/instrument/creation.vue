<template>
  <div class="create">
    <h1>Ajouter un nouvel instrument</h1>

    <form @submit="submit">
      <div class="form__group">
        <b-field label="Nom">
          <b-input v-model="name" type="text"></b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Type">
          <b-input v-model="type" type="text"></b-input>
        </b-field>
      </div>
      <div class="form__group">
        <b-field label="Spécification">
          <b-input v-model="specification" type="text"></b-input>
        </b-field>
      </div>
      <FileUpload ref="files" />
      <button type="submit" class="button is-primary">Ajouter</button>
    </form>

    <button @click="showSurvey = true">Répondre aux questions</button>
    <Survey v-if="showSurvey" @validate="showSurvey = false" />
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload';
import Survey from '@/components/instrument/Survey';

export default {
  name: 'NewInstrument',
  components: { FileUpload, Survey },
  data() {
    return {
      success: false,
      showSurvey: false,
      name: '',
      type: '',
      specification: '',
    };
  },
  methods: {
    // Form submitted event
    async submit(e) {
      e.preventDefault();
      const file = this.$refs.files.dropFiles;
      try {
        await this.$api.newInstrument({
          name: this.name,
          type: this.type,
          specification: this.specification,
          file,
        });
        this.notifyCreated();
      } catch (e) {
        this.notifyError();
      }
    },

    // Instrument created callback
    notifyCreated() {
      this.$buefy.toast.open({
        message: "L'instrument vient d'être créé",
        type: 'is-success',
      });
    },
    notifyError() {
      this.$buefy.toast.open({
        message: "L'instrument n'a pas été créé",
        type: 'is-danger',
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
