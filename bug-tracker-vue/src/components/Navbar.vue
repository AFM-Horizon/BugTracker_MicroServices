<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
      <img src="../assets/img/BugtraceLogo.gif" alt="" width="150">
    </a>
    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-end">
    <div class="navbar-item mr-2">
      <Badge :name="username"/>
      <div>Hi {{ username }}!</div>
    </div>

    <div class="navbar-item mr-2">
      <div class="buttons">
        <a @click="logoutHandler" class="button is-small is-danger is-outlined">
          <i class="fas fa-sign-out-alt mr-1"></i>Logout
        </a>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
// import SocialLinks from './SocialLinks.vue';
import Badge from './Badge.vue';

export default {
  components: {
    Badge
    // SocialLinks
  },
  props: {
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'loginForm' });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.navbar {
  background: $background-secondary;
}

.navbar-item {
  padding: 0px;
  max-height: 300;
}

.navbar-item img {
  max-height: 100%;
}

</style>
