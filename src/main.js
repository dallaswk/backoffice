import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/tailwind.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyDfV0FHojN-L5DLlEFMKl-dmfGRG_0wCxE",
  authDomain: "front-rn.firebaseapp.com",
  projectId: "front-rn",
  storageBucket: "front-rn.appspot.com",
  messagingSenderId: "345941823075",
  appId: "1:345941823075:web:56f7c7d4301ca7b5d13256",
  measurementId: "G-LPFGTS9GR3",
};

firebase.initializeApp(firebaseConfig);

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
