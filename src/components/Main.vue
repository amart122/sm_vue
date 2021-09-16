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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const _user = document.cookie.split(";").map( (x) => x.split('=')[0] == '_sm_uid' ? x.split('=')[1] : null );
      if (!vm.$store.getters["getCurrentUser"] && !_user.length) {
        vm.$router.push({ path: "/account/login" });
      }
    });
  },
};
</script>

<style lang="scss">
@import "src/assets/scss/sm_global.scss";

#main-app-container {
  height: 95vh;
}
</style>
