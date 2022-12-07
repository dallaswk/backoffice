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
      <router-link to="/crud">CRUD</router-link>
    </nav>
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    ></el-avatar>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
};
</script>
