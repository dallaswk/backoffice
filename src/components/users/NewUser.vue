<template>
  <div class="usercrud h-full w-full px-5 py-6">
    <div
      class="flex w-full flex-row items-center justify-between gap-2 bg-white"
    >
      <form @submit.prevent="newUser" class="mx-auto pb-6">
        <div
          class="form-group mx-auto flex w-full flex-col gap-2 bg-white px-5 py-6"
        >
          <el-input placeholder="Email" v-model="userData.email"></el-input>
          <el-input
            placeholder="Username"
            v-model="userData.displayName"
          ></el-input>
          <el-input
            placeholder="Phone"
            v-model="userData.phoneNumber"
          ></el-input>
          <el-input
            placeholder="PhotoUrl"
            v-model="userData.photoURL"
          ></el-input>
          <el-input
            placeholder="Fecha Nacimiento"
            v-model="userData.fnac"
          ></el-input>
          <el-input placeholder="Nombre" v-model="userData.name"></el-input>
          <el-input placeholder="Peso" v-model="userData.peso"></el-input>
          <el-input placeholder="Altura" v-model="userData.altura"></el-input>
        </div>
        <el-button native-type="submit">Crear usuario</el-button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.usercrud {
  background-color: #f5f7fa;
}
</style>

<script>
import firebase from "firebase/compat/app";
const userData = {
  email: "",
  phoneNumber: "",
  photoURL: "",
  nombre: "",
  fnac: "",
  displayName: "",
  peso: "",
  altura: "",
};
export default {
  name: "NewUser",
  data() {
    return {
      userData: userData,
    };
  },
  computed: {
    userID() {
      return Date.now();
    },
  },
  methods: {
    newUser() {
      firebase.firestore().collection("users").doc(this.userID).set({
        email: this.userData.email,
        phoneNumber: this.userData.phoneNumber,
        photoURL: this.userData.photoURL,
        nombre: this.userData.name,
        fnac: this.userData.fnac,
        displayName: this.userData.displayName,
        peso: this.userData.peso,
        altura: this.userData.altura,
        id: this.userID,
        uid: "",
      });
    },
  },
};
</script>
