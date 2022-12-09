<template>
  <div class="sidenav border-r border-gray-300">
    <div class="flex flex-row items-center py-5 pl-5">
      <img src="@/assets/img/logo.svg" />
      <h1 v-if="!isCollapse" class="ml-2 font-bold">FoodApp</h1>
    </div>
    <el-menu
      default-active="1"
      unique-opened="true"
      router="true"
      class="el-menu-vertical flex flex-col"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <button @click="isCollapse = !isCollapse">
        <i v-if="isCollapse" class="el-icon-s-unfold"></i>
        <i v-if="!isCollapse" class="el-icon-s-fold"></i>
      </button>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">Usuarios</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" route="/users">
            <i class="el-icon-user"></i>
            <span slot="title">Usuarios</span>
          </el-menu-item>
          <el-menu-item index="1-2" route="/users/profiles">
            <i class="el-icon-user-solid"></i>
            <span slot="title">Perfiles</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-takeaway-box"></i>
          <span slot="title">Recetario</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">Recetas</el-menu-item>
          <el-menu-item index="2-2">Acciones</el-menu-item>
          <el-menu-item index="2-3">Utensilios</el-menu-item>
          <el-menu-item index="2-4" route="/recipes/ingredients"
            >Alimentos</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-date"></i>
        <span slot="title">Menús</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item {
  display: flex;
  justify-content: start;
  align-items: center;
}

li.el-submenu > div {
  display: flex;
}
</style>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
