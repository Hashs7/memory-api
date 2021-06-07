<template>
  <div class="o-page o-page--profile-edit">
    <div class="user__header">
      <ButtonBack light class="user-back" />
      <div v-if="isOwner" class="owner">
        <NuxtLink :to="userLink" class="btn-edit fill">Enregistrer</NuxtLink>
      </div>
    </div>
    <div class="user-banner">
      <img src="http://seb-mbp.local:3000/file/guitar1975.jpg" alt="" />
    </div>
    <div class="user-infos">
      <div v-if="user.thumbnail" class="user-thumbnail">
        <img
          :src="user.thumbnail.path"
          :alt="`Photo de profil de ${user.firstName}`"
        />
      </div>
      <h1 v-if="name" class="user-name">
        {{ name }}
      </h1>
      <p class="user-username">
        @<input v-model="user.username" type="text" />
      </p>
    </div>

    <div class="">
      <UserForm />
    </div>
  </div>
</template>

<script>
import UserForm from '../../components/user/UserForm';
import ButtonBack from '../../components/UI/ButtonBack';

export default {
  components: { ButtonBack, UserForm },
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.$state.user;
    },
    userLink() {
      return {
        name: 'user',
        params: { user: this.user.username },
      };
    },
    name() {
      if (!this.user.firstName) return null;
      let txt = this.user.firstName;
      if (this.user.lastName) {
        txt += ` ${this.user.lastName}`;
      }
      return txt;
    },
    isOwner() {
      return this.$auth.$state.user._id === this.user._id;
    },
  },
};
</script>
