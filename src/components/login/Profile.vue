<template>
  <div class="vue-template flex h-full flex-col justify-center px-5 py-6">
    <form @submit.prevent="updateProfileData">
      <div
        class="form-group mx-auto flex w-1/3 flex-col gap-2 bg-white px-5 py-6"
      >
        <el-input placeholder="Email" v-model="userProfile.email"></el-input>
        <el-input
          placeholder="displayName"
          v-model="userProfile.displayName"
        ></el-input>
        <el-input
          placeholder="Phone"
          v-model="userProfile.phoneNumber"
        ></el-input>
        <el-input
          placeholder="PhotoUrl"
          v-model="userProfile.photoURL"
        ></el-input>
        <el-input
          placeholder="Fecha Nacimiento"
          v-model="userProfile.fnac"
        ></el-input>
        <el-input placeholder="Nombre" v-model="userProfile.nombre"></el-input>
        <el-input placeholder="Peso" v-model="userProfile.peso"></el-input>
        <el-input placeholder="Altura" v-model="userProfile.altura"></el-input>
      </div>
      <el-button native-type="submit">Actualizar perfil</el-button>
    </form>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";

export default {
  name: "ProfileComponent",
  data() {
    return {
      userProfile: null,
    };
  },
  computed: {
    userData() {
      if (this.$store.getters.user) {
        this.getProfileData();
        return this.$store.getters.user?.multiFactor?.user;
      } else {
        return null;
      }
    },
  },
  methods: {
    getProfileData() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          this.userProfile = doc.data();
        });
    },
    updateProfileData() {
      console.log("actualizado");
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          email: this.userProfile.email,
          phoneNumber: this.userProfile.phoneNumber,
          photoURL: this.userProfile.photoURL,
          nombre: this.userProfile.name,
          fnac: this.userProfile.fnac,
          displayName: this.userProfile.displayName,
          peso: this.userProfile.peso,
          altura: this.userProfile.altura,
          id: Date.now(),
          uid: firebase.auth().currentUser.uid,
        });
    },
  },
};
</script>
