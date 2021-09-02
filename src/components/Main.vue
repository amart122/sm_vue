<template>
  <div id="main-app-container" class="">
    <MainStage></MainStage>
    <SideBar></SideBar>
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.getters["getCurrentUser"]) {
        vm.$router.push({ path: "/account/login" });
      }
    });
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/sm_global.scss";
</style>
