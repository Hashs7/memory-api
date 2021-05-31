<template>
  <form ref="form" @submit="submit">
    <div class="form__group">
      <b-field label="Nom">
        <b-input v-model="name" name="name" type="text"></b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Type">
        <b-input v-model="type" name="type" type="text"></b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Spécification">
        <b-input
          v-model="specification"
          name="specification"
          type="text"
        ></b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Marque">
        <b-input v-model="brand" name="brand" type="text" required></b-input>
      </b-field>
    </div>
    <FileUpload ref="files" />
    <button type="submit" class="u-button u-button--primary">
      {{ data ? 'Modifier' : 'Ajouter' }}
    </button>
  </form>
</template>

<script>
import FileUpload from '@/components/FileUpload';

export default {
  name: 'InstrumentForm',
  components: {
    FileUpload,
  },
  middleware: 'auth',
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      name: '',
      type: '',
      specification: '',
      brand: '',
    };
  },
  created() {
    if (!this.data) return;
    this.prefill();
  },
  methods: {
    prefill() {
      ['name', 'type', 'specification', 'brand'].forEach((el) => {
        this[el] = this.data[el];
      });
    },

    // Form submitted event
    submit(e) {
      e.preventDefault();
      const formData = new FormData(this.$refs.form);
      if (this.$refs.files.dropFiles) {
        const file = this.$refs.files.dropFiles[0];
        formData.append('image', file);
      }

      if (this.data) {
        this.updateInstrument(formData);
      } else {
        this.createInstrument(formData);
      }

      this.redirect();
    },

    redirect() {
      setTimeout(() => {
        this.$router.push({
          name: 'instrument-id',
          params: { id: this.data.id },
        });
      }, 2000);
    },

    async createInstrument(form) {
      try {
        await this.$api.newInstrument(form);
        this.notifySuccess("L'instrument vient d'être créé");
      } catch (e) {
        this.notifyError("L'instrument n'a pas été créé");
      }
    },

    async updateInstrument(form) {
      try {
        await this.$api.updateInstrument(this.data.id, form);
        this.notifySuccess("L'instrument vient d'être mis à jour");
      } catch (e) {
        this.notifyError("L'instrument n'a pas été mis à jour");
      }
    },

    // Instrument created callback
    notifySuccess(message) {
      this.$buefy.toast.open({
        message,
        type: 'is-success',
      });
    },
    notifyError(message) {
      this.$buefy.toast.open({
        message,
        type: 'is-danger',
      });
    },
  },
};
</script>

<style scoped></style>
