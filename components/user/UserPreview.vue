<template>
  <NuxtLink :to="link" class="user">
    <div v-if="user.thumbnail" class="user__picture">
      <img
        :src="user.thumbnail.path"
        :alt="`Photo de profil de ${user.firstName}`"
      />
    </div>
    <div v-if="name" class="user__infos">
      {{ name }}
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'UserPreview',
  props: {
    short: {
      type: Boolean,
      default: false,
    },
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
    name() {
      let txt = '';
      if (!this.user.firstName && !this.user.lastName) {
        return `@${this.user.username}`;
      }
      if (this.user.firstName) {
        txt += this.user.firstName;
      }
      if (this.short) {
        txt += ` ${this.user.lastName.charAt(0)}.`;
        return txt;
      }
      txt += ` ${this.user.lastName}`;
      console.log(this.user);
      return txt;
    },
  },
};
</script>

<style scoped>
.user {
  display: inline-flex;
  align-items: center;
}

.user__picture {
  width: 38px;
  height: 38px;
  margin-right: 8px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
