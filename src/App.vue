<template>
  <div id="main-container-sm" class="">
    <Header v-if="this.$store.getters['getCurrentUser'] && true"></Header>
    <router-view></router-view>
    <Loaders></Loaders>
    <Alerts></Alerts>
  </div>
</template>

<script>
import Loaders from "./components/Loaders.vue";
import Alerts from "./components/Alerts.vue";
import Header from './components/Header.vue';

export default {
  name: "App",
  components: {
    Loaders,
    Alerts,
    Header,
  },
  mounted: function() {
    this.$sm_helpers.start()
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/sm_global.scss";

#app {
  font-family: Circular, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
