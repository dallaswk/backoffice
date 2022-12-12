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
            size="medium"
          ></el-input>
          <el-input
            placeholder="Nombre científico"
            v-model="IngredientData.nombreCientifico"
            size="medium"
          ></el-input>
          <el-input
            placeholder="Foto"
            v-model="IngredientData.photoURL"
            size="medium"
          ></el-input>
          <el-input
            placeholder="Código Foodex"
            v-model="IngredientData.codigoFoodex"
            size="medium"
          ></el-input>
          <el-input
            placeholder="Descripción"
            type="textarea"
            autosize
            v-model="IngredientData.descripcion"
            size="medium"
          ></el-input>
          <el-input-number
            v-model="IngredientData.parteComestible"
            placeholder="% Parte comestible"
            :min="0"
            :max="100"
            size="medium"
          ></el-input-number>

          <div v-for="(item, index) in Componentes" :key="index">
            <el-select v-model="item.tipo" placeholder="Tipo">
              <el-option
                v-for="item in tipoComponentes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button @click="AddField">+</el-button>
          </div>
          <!-- <div v-for="(item, index) in Componentes" :key="index">
            <el-input
              placeholder="Nombre"
              v-model="item.nombre"
              size="medium"
            ></el-input>
            <el-input
              placeholder="Fuente"
              v-model="item.fuente"
              size="medium"
            ></el-input>
            <el-input
              placeholder="Unidad"
              v-model="item.unidad"
              size="medium"
            ></el-input>
            <el-input
              placeholder="Valor"
              v-model="item.valor"
              size="medium"
            ></el-input>
          </div> -->
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
        informacion: {},
      },
      Componentes: [
        {
          tipo: "",
        },
      ],
      tipoComponentes: [
        {
          value: "grasas",
          label: "Grasas",
        },
        {
          value: "hidratosdecarbono",
          label: "Hidratos de Carbono",
        },
        {
          value: "minerales",
          label: "Minerales",
        },
        {
          value: "proximales",
          label: "Proximales",
        },
        {
          value: "vitaminas",
          label: "Vitaminas",
        },
      ],
    };
  },
  computed: {},
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
    AddField: function () {
      this.Componentes.push({
        tipo: "",
      });
    },
  },
};
</script>
