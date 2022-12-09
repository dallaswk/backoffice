<template>
  <div class="components h-full px-5 py-6">
    <div class="flex bg-white px-5 pt-6 pb-5">
      <div class="w-full">
        <div class="flex flex-row items-center justify-between gap-2">
          <el-input
            v-model="search"
            size="medium"
            placeholder="Buscar..."
            width="220"
            prefix-icon="el-icon-search"
            @selection-change="handleSelectionChange"
          >
          </el-input>
          <div class="flex flex-row">
            <el-button icon="el-icon-set-up">Filtrar por...</el-button>
            <router-link to="/users/new"
              ><el-button icon="el-icon-document-add"
                >Nuevo usuario</el-button
              ></router-link
            >
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="
            usersData.filter(
              (data) =>
                !search ||
                data.nombre.toLowerCase().includes(search.toLowerCase())
            )
          "
          :default-sort="{ prop: 'id', order: 'ascending' }"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="id" label="ID" sortable> </el-table-column>
          <el-table-column property="nombre" label="Nombre" sortable>
          </el-table-column>
          <el-table-column property="fnac" label="F.Nacimiento" sortable>
          </el-table-column>
          <el-table-column property="peso" label="Peso (kg)" sortable>
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.peso < '80' ? 'success' : 'primary'"
                disable-transitions
                >{{ scope.row.peso }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column property="altura" label="Altura (cm)" sortable>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import { collection, getDocs } from "firebase/firestore";

const db = firebase.firestore();

export default {
  name: "ProfileDataTable",
  data() {
    return {
      usersData: [],
      multipleSelection: [],
      search: "",
      userProfiles: [],
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    async getUsersTableData() {
      const profilesRef = await db.collection("users").get();

      profilesRef.forEach((doc) => {
        this.getUserProfile(doc.id);
      });
    },
    async getUserProfile(id) {
      const queryProfile = await getDocs(
        collection(db, "users/" + id + "/Perfiles")
      );
      queryProfile.forEach((doc) => {
        this.usersData.push(doc.data());
      });
    },
  },
  created() {
    this.getUsersTableData().then((response) => {
      if (response && response.errorMsg) {
        this.error = response.errorMsg;
      } else {
        this.usertabledata = response;
      }
    });
  },
};
</script>
