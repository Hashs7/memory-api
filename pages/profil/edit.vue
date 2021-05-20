<template>
  <div class="o-page o-page--profile-edit">
    <div class="">
      <h1>Modifier mon compte</h1>
      <UserForm />
    </div>
  </div>
</template>

<script>
import UserForm from '../../components/user/UserForm';

export default {
  components: { UserForm },
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.$state.user;
    },
  },
};
</script>
