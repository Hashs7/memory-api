<template>
  <form ref="form" @submit="submit">
    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Ajouter une photo</h4>
      </div>
      <InstrumentImagesForm @showGallery="showGallery = true" />
      <GalleryView v-if="showGallery" @close="selectImage" />
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
      <div class="">
        <ColorsSelector />
      </div>
    </section>

    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Anciens propriétaires</h4>
      </div>
      <div class=""></div>
    </section>

    <button type="submit" class="u-button u-button--primary">
      {{ newInstrument ? 'Ajouter' : 'Modifier' }}
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import GalleryView from '../../gallery/GalleryView';
import ColorsSelector from '../ColorsSelector';
import InstrumentImagesForm from './InstrumentImagesForm';

export default {
  name: 'InstrumentForm',
  components: {
    InstrumentImagesForm,
    GalleryView,
    ColorsSelector,
  },
  middleware: 'auth',
  data() {
    return {
      showGallery: false,
    };
  },
  computed: {
    ...mapState('instrument', ['data']),
    newInstrument() {
      return !this.$route.params.id;
    },
    name: {
      get() {
        return this.data.name;
      },
      set(value) {
        this.$store.commit('instrument/updateProps', { prop: 'name', value });
      },
    },
    type: {
      get() {
        return this.data.type;
      },
      set(value) {
        this.$store.commit('instrument/updateProps', { prop: 'type', value });
      },
    },
    specification: {
      get() {
        return this.data.specification;
      },
      set(value) {
        this.$store.commit('instrument/updateProps', {
          prop: 'specification',
          value,
        });
      },
    },
    brand: {
      get() {
        return this.data.brand;
      },
      set(value) {
        this.$store.commit('instrument/updateProps', { prop: 'brand', value });
      },
    },
  },
  methods: {
    // Form submitted event
    submit(e) {
      e.preventDefault();
      const formData = {
        ...this.$store.state.instrument.data,
        images: this.$store.getters['instrument/getImagesId'],
      };

      if (this.newInstrument) {
        this.createInstrument(formData);
        return;
      }
      this.updateInstrument(formData);
    },

    selectImage() {
      this.showGallery = false;
      const selected = this.$store.getters['gallery/getLastSelected'];
      if (!selected) return;
      this.$store.commit('instrument/addImage', selected);
      this.$store.commit('gallery/removeSelected', selected._id);
    },

    redirect(id) {
      this.$router.push({
        name: 'instrument-id',
        params: { id },
      });
    },

    async createInstrument(form) {
      try {
        const res = await this.$api.newInstrument(form);
        this.redirect(res.data.id);
      } catch (e) {
        this.notifyError("L'instrument n'a pas été créé");
      }
    },

    async updateInstrument(form) {
      try {
        await this.$api.updateInstrument(this.data.id, form);
        this.redirect(this.data.id);
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
