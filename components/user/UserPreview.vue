<template>
  <NuxtLink :to="link" class="user">
    <div v-if="user.thumbnail" class="user__picture">
      <img
        :src="user.thumbnail.path"
        :alt="`Photo de profil de ${user.firstName}`"
      />
    </div>
    <div v-if="user.firstName || user.lastName" class="user__infos">
      {{ user.firstName }} {{ user.lastName }}
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'UserPreview',
  props: {
    user: {
      type: Object,
      required: true,

      thumbnail: {
        type: Object,
        required: false,
      },

      username: {
        type: String,
        required: true,
      },

      firstName: {
        type: String,
        required: false,
      },

      lastName: {
        type: String,
        required: false,
      },
    },
  },
  computed: {
    link() {
      return `/${this.user.username}`;
    },
  },
};
</script>

<style scoped>
.user {
  display: flex;
  align-items: center;
}

.user__picture {
  width: 50px;
  height: 50px;
  margin-right: 12px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
