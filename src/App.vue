<template>
  <div id="main-container-sm" class="">
    <SideBar></SideBar>
    <MainStage></MainStage>
  </div>
</template>

<script>
import MainStage from "./components/MainStage";
import SideBar from "./components/SideBar.vue";

export default {
  name: "App",
  components: {
    SideBar,
    MainStage,
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
