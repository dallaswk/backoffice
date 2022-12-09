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
            <router-link to="/recipes/ingredients/new"
              ><el-button icon="el-icon-document-add"
                >Nuevo Ingrediente</el-button
              ></router-link
            >
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="
            ingredientsData.filter(
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
          <el-table-column label="Foto">
            <template slot-scope="scope">
              <img :src="scope.row.photoURL" class="h-11 w-auto" /> </template
          ></el-table-column>
          <el-table-column property="nombre" label="Nombre" sortable>
          </el-table-column>
          <el-table-column property="descripcion" label="Descripción" sortable>
          </el-table-column>
          <el-table-column
            property="parteComestible"
            label="Parte comestible (%)"
            sortable
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.parteComestible > '80' ? 'primary' : 'success'"
                disable-transitions
                >{{ scope.row.parteComestible }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column property="codigofoodex" label="Cod. Foodex" sortable>
          </el-table-column>
          <el-table-column label="Operaciones">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >Editar</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Eliminar</el-button
              >
            </template>
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
  name: "IngredientsDataTable",
  data() {
    return {
      componentKey: 0,
      ingredientsData: [],
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
    },
    handleEdit(row) {
      console.log(row.uid);
    },
    handleDelete(index) {
      db.collection("ingredientes")
        .doc(this.ingredientsData[index].uid)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.forceRerender();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    async getIngredientsTableData() {
      const ingredientesRef = await db.collection("ingredientes").get();
      ingredientesRef.forEach((doc) => {
        const data = doc.data();
        data["uid"] = doc.id;
        this.ingredientsData.push(data);
      });
    },
    async getIngredient(id) {
      const queryIngredient = await getDocs(collection(db, "ingredientes", id));
      queryIngredient.forEach((doc) => {
        this.ingredientsData.push(doc.data());
      });
    },
    forceRerender() {
      this.componentKey += 1;
      this.$emit("rerender", this.componentKey);
    },
  },
  created() {
    this.getIngredientsTableData().then((response) => {
      if (response && response.errorMsg) {
        this.error = response.errorMsg;
      } else {
        this.usertabledata = response;
      }
    });
  },
};
</script>
