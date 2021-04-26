<template>
  <div class="o-page o-page--create">
    <div class="o-page__header">
      <h1>Création</h1>
      <span>Racontez l'histoire de votre instrument</span>
    </div>

    <form class="o-page__body">
      <div class="slider">
        <div class="slider__item slider__intro">
          <div class="form__group">
            <b-field label="Titre">
              <b-input v-model="name" type="text"> </b-input>
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
                type="is-primary"
                icon-left="calendar-today"
                @click="$refs.datepicker.toggle()"
              />
            </b-field>
          </div>
        </div>

        <div v-for="(c, i) in contents" :key="i" class="slider__item">
          <component v-bind:is="c.template" v-if="c.template" :key="i" />
        </div>

        <div class="slider__item slider__add">
          <button
            class="u-button u-button--round"
            type="button"
            @click="addContent('media')"
          >
            Ajouter media
          </button>
          <button
            class="u-button u-button--round"
            type="button"
            @click="addContent('audio')"
          >
            Ajouter audio
          </button>
          <button
            class="u-button u-button--round"
            type="button"
            @click="addContent('text')"
          >
            Ajouter texte
          </button>
        </div>
      </div>
    </form>

    <div class="o-page__footer">
      <button type="button" class="button is-primary">Personnaliser</button>
      <button type="submit" class="button is-primary" @click="submit">
        Valider
      </button>
    </div>
  </div>
</template>

<router>
{
  path: '/instrument/:id/souvenir/creation'
}
</router>

<script>
import TextContent from '@/components/memories/creation/TextContent';
import AudioContent from '@/components/memories/creation/AudioContent';
import MediaContent from '@/components/memories/creation/MediaContent';

const CONTENT_TYPE = {
  media: {
    template: 'MediaContent',
    content: '',
  },
  audio: {
    template: 'AudioContent',
    content: '',
  },
  text: {
    template: 'TextContent',
    content: '',
  },
};

export default {
  name: 'NewInstrument',
  components: {
    TextContent,
    AudioContent,
    MediaContent,
  },
  data() {
    return {
      success: false,
      name: '',
      date: [],
      type: 'Concert',
      contents: [
        {
          ...CONTENT_TYPE.text,
        },
      ],
    };
  },
  methods: {
    // Form submitted event
    async submit() {
      try {
        await this.$api.newMemory(this.$route.params.id, {
          name: this.name,
          date: this.date,
          type: this.type,
        });
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

    addContent(type) {
      this.contents.push(CONTENT_TYPE[type]);
    },
  },
};
</script>

<style lang="scss">
.o-page--create {
  background-color: $white;
}

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

.slider {
  display: flex;
  overflow: auto;
  padding: 8px;
}

.slider__item {
  min-width: 260px;
  height: 460px;
  margin: 8px;
  box-shadow: $shadow;
}

.slider__add {
  display: flex;
  flex-direction: column;

  .u-button {
    margin: 8px;
  }
}
</style>
