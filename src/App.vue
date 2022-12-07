<template>
  <div id="app">
    <div class="flex flex-row">
      <side-nav />
      <div class="flex w-full flex-col">
        <user-menu />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "@/components/SideNav.vue";
import UserMenu from "@/components/UserMenu.vue";
export default {
  components: {
    SideNav,
    UserMenu,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
