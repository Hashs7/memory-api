<template>
  <form ref="form" @submit="submit">
    <div class="round-upload">
      <FileUpload ref="files" :multiple="false" />
    </div>
    <div class="form__group">
      <b-field label="Prénom">
        <b-input v-model="user.firstName" name="firstName" type="text">
        </b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Nom">
        <b-input v-model="user.lastName" name="lastName" type="text"> </b-input>
      </b-field>
    </div>
    <div class="form__group">
      <b-field label="Pseudo">
        <b-input v-model="user.username" name="username" type="text"> </b-input>
      </b-field>
    </div>
    <button type="submit" class="u-button u-button--primary">Valider</button>
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
      this.user = { ...this.$auth.$state.user };
    }
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      const formData = new FormData(this.$refs.form);
      const file = this.$refs.files.dropFiles;
      if (file) {
        formData.append('thumbnail', file);
      }
      try {
        await this.$api.updateUser(formData);
        await this.$auth.fetchUser();
        this.redirect();
      } catch (e) {
        this.notifyError();
      }
    },
    redirect() {
      this.$router.push({
        name: 'profil',
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

<style scoped></style>
