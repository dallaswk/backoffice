<template>
  <div class="flex flex-row items-center justify-between px-5">
    <div class="flex flex-col items-start">
      <h2 class="text-xl font-bold">{{ this.$route.name }}</h2>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: this.$route.path }">{{
          this.$route.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item>Todos los usuarios</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/crud">CRUD</router-link> |
    </nav>
    <div class="flex flex-row items-center gap-2">
      <router-link to="/user/profile"
        ><el-avatar v-if="userData" :src="this.userData.photoURL"></el-avatar
      ></router-link>
      <el-button v-if="!userData" type="primary" @click="goToLogin()"
        >Login</el-button
      >
      <el-button v-if="userData" type="primary" @click="logoutFromFirebase()"
        >Logout</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  methods: {
    goToLogin() {
      this.$router.push("/user/login");
    },
    logoutFromFirebase() {
      this.$store.dispatch("signOutAction");
    },
  },
  computed: {
    userData() {
      if (this.$store.getters.user) {
        return this.$store.getters.user?.multiFactor?.user;
      } else {
        return null;
      }
    },
  },
};
</script>
