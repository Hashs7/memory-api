<template>
  <form @submit="submit">
    <img
      v-if="user.thumbnail"
      :src="user.thumbnail.path"
      alt=""
      width="100"
      height="100"
      class="user-picture"
    />
    <div class="form__group">
      <b-field label="Prénom">
        <b-input v-model="user.firstName" type="text"> </b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Nom">
        <b-input v-model="user.lastName" type="text"> </b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Pseudo">
        <b-input v-model="user.username" type="text"> </b-input>
      </b-field>
    </div>
    <FileUpload ref="files" :multiple="false" />
    <button type="submit" class="button is-primary">Valider</button>
  </form>
</template>

<script>
import FileUpload from '../FileUpload';

export default {
  name: 'UserForm',
  components: { FileUpload },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        username: null,
      },
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.user = this.$auth.$state.user;
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      const formData = new FormData(this.$refs.form);
      const file = this.$refs.files.dropFiles;
      formData.append('thumbnail', file);
      try {
        await this.$api.updateUser(formData);
        this.notifyCreated();
      } catch (e) {
        this.notifyError();
      }
    },
    notifyCreated() {
      this.$buefy.toast.open({
        message: 'Votre profil a été modifé',
        type: 'is-success',
      });
    },
    notifyError() {
      this.$buefy.toast.open({
        message: 'Impossible de modifier votre profil',
        type: 'is-danger',
      });
    },
  },
};
</script>

<style scoped>
.user-picture {
  display: block;
  margin: 16px auto;
  border-radius: 50%;
}
</style>
