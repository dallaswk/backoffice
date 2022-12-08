<template>
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
        <el-button>Filtrar por...</el-button>
        <el-button>Nuevo usuario</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="
        tableData.filter(
          (data) =>
            !search || data.nombre.toLowerCase().includes(search.toLowerCase())
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
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "UserDataTable",
  data() {
    return {
      usersData: [],
      tableData: [
        {
          id: "1234",
          nombre: "Álvaro",
          fnac: "1989-05-11",
          peso: "80",
          altura: "178",
        },
        {
          id: "2341",
          nombre: "Miguel",
          fnac: "1985-09-02",
          peso: "90",
          altura: "178",
        },
        {
          id: "3412",
          nombre: "Óscar",
          fnac: "1982-11-12",
          peso: "84",
          altura: "178",
        },
        {
          id: "2347",
          nombre: "Vero",
          fnac: "1983-06-10",
          peso: "65",
          altura: "178",
        },
        {
          id: "1241",
          nombre: "Alberto",
          fnac: "1983-11-21",
          peso: "75",
          altura: "178",
        },
        {
          id: "2344",
          nombre: "Xavi",
          fnac: "1989-10-01",
          peso: "81",
          altura: "178",
        },
        {
          id: "3412",
          nombre: "Marcos",
          fnac: "1981-06-12",
          peso: "86",
          altura: "178",
        },
      ],
      multipleSelection: [],
      search: "",
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
    getUsersData() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          this.usersData = doc.data();
        });
    },
    async getUsersTableData() {
      try {
        var usertabledata = {};

        // Get Users Data
        var resRef = firebase.firestore().collection("users");
        var resSnap = await resRef.doc().get();
        usertabledata = resSnap.data();
        usertabledata.id = resSnap.id;
        console.log(usertabledata);

        return usertabledata;
      } catch (e) {
        return {
          errorMsg: "Something went wrong. Please Try Again.",
        };
      }
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
