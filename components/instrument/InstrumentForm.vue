<template>
  <form ref="form" @submit="submit">
    <section class="o-section">
      <div class="o-section__head">
        <h4 class="o-section__title">Ajouter une photo</h4>
      </div>
      <div class="o-section__pictures o-page__outside">
        <vue-scroll :ops="ops">
          <div class="instrument-picture">
            <FileUpload ref="files" />
          </div>
          <div class="instrument-picture add">
            <IconAdd />
            <button>Ajouter</button>
          </div>
          <div v-if="data" class="">
            <div
              v-for="img in data.images"
              :key="img._id"
              class="instrument-picture"
            >
              <img :src="img.path" alt="" />
            </div>
          </div>
        </vue-scroll>
      </div>
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
import FileUpload from '@/components/FileUpload';
import IconAdd from '@/assets/svg/ic_add.svg?inline';
import ColorsSelector from './ColorsSelector';

export default {
  name: 'InstrumentForm',
  components: {
    ColorsSelector,
    FileUpload,
    IconAdd,
  },
  middleware: 'auth',
  data() {
    return {
      ops: {
        vuescroll: {
          locking: true,
        },
        scrollPanel: {},
        rail: {},
        bar: {},
      },
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
      const formData = new FormData(this.$refs.form);
      const file = this.$refs.files.dropFiles;
      if (file) {
        formData.append('images', file);
      }

      if (this.newInstrument) {
        this.createInstrument(formData);
        return;
      }
      this.updateInstrument(formData);
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

<style lang="scss">
.o-section__pictures {
  .__view {
    display: flex;
    padding: 0 16px;
  }
}

.instrument-picture {
  width: 156px;
  height: 156px;
  margin-right: 12px;
  &.add {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid $black;
  }
}
</style>
