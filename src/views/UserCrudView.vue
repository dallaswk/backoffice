<template>
  <div class="usercrud h-full px-5 py-6">
    <div class="flex bg-white px-5 pt-6 pb-5">
      <user-data-table />
    </div>
  </div>
</template>

<style scoped>
.usercrud {
  background-color: #f5f7fa;
}
</style>

<script>
import UserDataTable from "@/components/users/DataTable.vue";

export default {
  name: "UserCrudView",
  components: {
    UserDataTable,
  },
};
</script>
