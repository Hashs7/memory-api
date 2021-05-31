<template>
  <form ref="form" @submit="submit">
    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Ajouter une photo</h4>
      </div>
      <ul class="o-section__pictures">
        <li class="instrument-picture">
          <FileUpload ref="files" />
        </li>
        <li class="instrument-picture">
          <button>Ajouter</button>
        </li>
        <li
          v-for="img in data.images"
          :key="img._id"
          class="instrument-picture"
        >
          <img :src="img.path" alt="" />
        </li>
      </ul>
    </section>

    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Informations</h4>
      </div>
      <div class="">
        <div class="form__group">
          <b-field>
            <b-input
              v-model="type"
              name="type"
              type="text"
              placeholder="Type d'instrument"
            ></b-input>
          </b-field>
        </div>
        <div class="form__group">
          <b-field>
            <b-input
              v-model="brand"
              name="brand"
              type="text"
              placeholder="Marque"
              required
            ></b-input>
          </b-field>
        </div>
        <div class="form__group">
          <b-field>
            <b-input
              v-model="name"
              name="name"
              type="text"
              placeholder="Surnom (optionel)"
            ></b-input>
          </b-field>
        </div>
        <div class="form__group">
          <b-field>
            <b-input
              v-model="specification"
              name="specification"
              type="text"
              placeholder="Modèle (optionnel)"
            ></b-input>
          </b-field>
        </div>
      </div>
    </section>

    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Détails</h4>
      </div>
      <div class=""></div>
    </section>

    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Anciens propriétaires</h4>
      </div>
      <div class=""></div>
    </section>

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
      this.$router.push({
        name: 'instrument-id',
        params: { id: this.data.id },
      });
    },

    async createInstrument(form) {
      try {
        await this.$api.newInstrument(form);
      } catch (e) {
        this.notifyError("L'instrument n'a pas été créé");
      }
    },

    async updateInstrument(form) {
      try {
        await this.$api.updateInstrument(this.data.id, form);
      } catch (e) {
        this.notifyError("L'instrument n'a pas été mis à jour");
      }
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

<style scoped>
.instrument-picture {
  width: 156px;
  height: 156px;
  margin-right: 12px;
}
</style>
