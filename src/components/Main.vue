<template>
  <div id="main-app-container" class="row-flex">
    <SideBar></SideBar>
    <MainStage></MainStage>
  </div>
</template>

<script>
import MainStage from "./MainStage.vue";
import SideBar from "./SideBar.vue";

export default {
  name: "App",
  components: {
    MainStage,
    SideBar,
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/sm_global.scss";

#main-app-container {
  height: 95vh;
}
</style>
