<template>
  <div class="components h-full w-full px-5 py-6">
    <div
      class="flex w-full flex-row items-center justify-between gap-2 bg-white"
    >
      <form @submit.prevent="newIngredient" class="mx-auto pb-6">
        <div
          class="form-group mx-auto flex w-full flex-col gap-2 bg-white px-5 py-6"
        >
          <el-input
            placeholder="Nombre"
            v-model="IngredientData.nombre"
          ></el-input>
          <el-input
            placeholder="Nombre científico"
            v-model="IngredientData.nombreCientifico"
          ></el-input>
          <el-input
            placeholder="% Parte comestible"
            v-model="IngredientData.parteComestible"
          ></el-input>
          <el-input
            placeholder="Foto"
            v-model="IngredientData.photoURL"
          ></el-input>
          <el-input
            placeholder="Código Foodex"
            v-model="IngredientData.codigoFoodex"
          ></el-input>
          <el-input
            placeholder="Descripción"
            v-model="IngredientData.descripcion"
          ></el-input>
        </div>
        <el-button native-type="submit">Crear Ingrediente</el-button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";

export default {
  name: "NewIngredient",
  data() {
    return {
      IngredientData: {
        nombre: "",
        nombreCientifico: "",
        parteComestible: "",
        descripcion: "",
        codigoFoodex: "",
        photoURL: "",
      },
    };
  },
  computed: {
    userID() {
      return Date.now();
    },
  },
  methods: {
    newIngredient() {
      firebase
        .firestore()
        .collection("ingredientes")
        .add({
          nombre: this.IngredientData.nombre,
          nombreCientifico: this.IngredientData.nombreCientifico,
          parteComestible: this.IngredientData.parteComestible,
          descripcion: this.IngredientData.descripcion,
          codigoFoodex: this.IngredientData.codigoFoodex,
          photoURL: this.IngredientData.photoURL,
        })
        .then(() => {
          this.IngredientData = {
            nombre: "",
            nombreCientifico: "",
            parteComestible: "",
            descripcion: "",
            codigoFoodex: "",
            photoURL: "",
          };
          this.$router.push({ path: "/recipes/ingredients" });
        });
    },
  },
};
</script>
