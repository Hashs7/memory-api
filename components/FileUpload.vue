<template>
  <section>
    <b-field class="file-field">
      <b-upload v-model="dropFiles" :multiple="multiple" drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="camera" size="is-large"> </b-icon>
            </p>
          </div>
        </section>
      </b-upload>
      <p v-if="label">{{ labelText }}</p>
    </b-field>

    <div class="tags">
      <div v-if="multiple" class="multiples">
        <span
          v-for="(file, index) in dropFiles"
          :key="index"
          class="tag is-primary"
        >
          {{ file.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile"
          ></button>
        </span>
      </div>
      <div v-else class="">
        <span v-if="dropFiles" class="tag is-primary">
          {{ dropFiles.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile(index)"
          ></button>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    label: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dropFiles: null,
    };
  },
  computed: {
    labelText() {
      return this.multiple ? 'Ajouter' : 'Déposez votre fichier';
    },
  },
  methods: {
    deleteDropFile(index) {
      if (this.multiple) {
        this.dropFiles.splice(index, 1);
        return;
      }
      this.dropFiles = null;
    },
  },
};
</script>

<style lang="scss">
.file-field {
  text-align: center;

  .upload {
    display: block;
  }
  .field.has-addons {
    display: block;
  }
}
</style>
