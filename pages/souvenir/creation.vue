<template>
  <div class="o-page o-page--create">
    <div class="o-page__header">
      <h1>Création</h1>
      <span>Racontez l'histoire de votre instrument</span>
    </div>

    <form class="o-page__body">
      <div class="slider">
        <div class="slider__item slider__intro">
          <div>
            <b-field label="Titre">
              <b-input v-model="name" type="text"> </b-input>
            </b-field>
            <b-field label="Date">
              <b-datepicker v-model="date" placeholder="Select a date" />
            </b-field>
          </div>
        </div>

        <div v-for="(c, i) in contents" :key="i" class="slider__item">
          <component v-bind:is="c.template" v-if="c.template" :key="i" />
          <button type="button" class="slider__close" @click="removeItem(i)">
            x
          </button>
        </div>

        <div class="slider__item slider__add">
          Ajouter
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
  path: /instrument/:id/souvenir/creation
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
      contents: [],
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

    removeItem(index) {
      this.contents.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.o-page--create {
  background-color: $white;
}

.o-page__footer {
  display: flex;
  justify-content: space-between;
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
  position: relative;
  min-width: 260px;
  height: 460px;
  margin: 20px 12px;
  box-shadow: $shadow--first;
  border-radius: $radius;
  background-color: $white;
}

.slider__intro {
  padding: 8px;
}

.slider__add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  background-color: transparent;

  .u-button {
    margin: 8px;
  }
}

.slider__close {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: $white;
  box-shadow: $shadow--second;
  border: none;
  transform: translate(25%, -25%);
}
</style>
