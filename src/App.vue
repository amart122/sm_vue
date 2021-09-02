<template>
  <div id="main-container-sm" class="">
    <router-view></router-view>
    <Loaders></Loaders>
    <Alerts></Alerts>
  </div>
</template>

<script>
import Loaders from "./components/Loaders.vue";
import Alerts from "./components/Alerts.vue";
import { initializeApp } from 'firebase/app';

export default {
  name: "App",
  components: {
    Loaders,
    Alerts,
  },
  mounted: () => {
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
