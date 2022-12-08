<template>
  <div class="vue-template flex h-full flex-col justify-center px-5 py-6">
    <form @submit.prevent="userLogin">
      <div
        class="form-group mx-auto flex w-1/3 flex-col gap-2 bg-white px-5 py-6"
      >
        <div class="flex flex-row items-center justify-center pb-6">
          <img src="@/assets/img/logo.svg" />
          <h1 class="ml-2 font-bold">FoodApp</h1>
        </div>
        <el-input
          placeholder="Email"
          v-model="user.email"
          prefix-icon="el-icon-message"
        ></el-input>
        <el-input
          placeholder="Password"
          v-model="user.password"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
        <div class="flex flex-row">
          <el-button type="primary" native-type="submit" class="w-full"
            >Login</el-button
          >
          <el-button type="primary" @click="googleSignIn" class="w-full"
            >Login con Google</el-button
          >
        </div>
        <p class="forgot-password mt-2 mb-4">
          <router-link to="/forgot-password">Forgot password?</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
.vue-template {
  background-color: #f5f7fa;
}
</style>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("signInAction", user);
    },
    googleSignIn: function () {
      this.$store.dispatch("googleSignInAction");
    },
  },
};
</script>
