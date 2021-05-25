<template>
  <div class="o-page">
    <div class="o-page__header">
      <input class="o-page__search" type="text" placeholder="Rechercher" />
      <div class="profile">
        <NuxtLink to="/profil" class="">Profil</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.o-page__header {
  display: flex;
  justify-content: space-between;
}

.o-page__search {
  flex-grow: 1;
}

.profile {
  width: 50px;
  height: 50px;
  margin-left: 16px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
