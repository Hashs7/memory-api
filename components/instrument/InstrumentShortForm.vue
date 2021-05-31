<template>
  <form ref="form" class="instrument-short-form">
    <div class="round-upload">
      <FileUpload ref="files" :label="false" />
    </div>

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
  </form>
</template>

<script>
import FileUpload from '@/components/FileUpload';

export default {
  name: 'InstrumentShortForm',
  components: {
    FileUpload,
  },
  data() {
    return {
      name: '',
      type: '',
      specification: '',
      brand: '',
    };
  },
  methods: {
    submit() {
      const formData = new FormData(this.$refs.form);
      if (this.$refs.files.dropFiles) {
        const file = this.$refs.files.dropFiles[0];
        formData.append('image', file);
      }
      return this.$api.newInstrument(formData);
    },
  },
};
</script>
