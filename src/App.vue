<template>
  <div id="main-container-sm" class="">
    <Header></Header>
    <router-view></router-view>
    <Loaders></Loaders>
    <Alerts></Alerts>
  </div>
</template>

<script>
import Loaders from "./components/Loaders.vue";
import Alerts from "./components/Alerts.vue";
import Header from './components/Header.vue';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  components: {
    Loaders,
    Alerts,
    Header,
  },
  mounted: function() {
    const firebaseConfig = {
      apiKey: "AIzaSyDDtrpGfPnE5boJlK4av3fwZql5USuAOXE",
      authDomain: "test-f9158.firebaseapp.com",
      databaseURL: "https://test-f9158.firebaseio.com",
      projectId: "test-f9158",
      storageBucket: "test-f9158.appspot.com",
      messagingSenderId: "793289375155",
      appId: "1:793289375155:web:b3315b0b90f587c7769fc6",
      measurementId: "G-1EL9LFVDLY"
    };
    initializeApp(firebaseConfig);
    
    // Check if user is logged in
    this.createSession(this.axios, this.$store);
  },
  methods: {
    createSession(axios, store) {
      const auth = getAuth();
      onAuthStateChanged(auth, async function(user) {
        if (user) {
          const id_token = await user.getIdToken()
          axios({
            method: "post",
            url: "/api/session/",
            headers: { Authorization: id_token },
          }).then((response) => {
            if (response.data && response.data.username) {
              store.dispatch("setCurrentUser", response.data.username);
              document.cookie = `_sm_uid=${response.data.username};path=/`
            }
          });
        } else {
          store.dispatch("setCurrentUser", null);
          document.cookie = `_sm_uid=XXX;path=/;max-age=0;`
        }
      })
    }
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/sm_global.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
