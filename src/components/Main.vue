<template>
  <div id="main-app-container" class="row-flex">
    <SideBar></SideBar>
    <MainStage></MainStage>
  </div>
  <Modal1Container><SearchUser></SearchUser></Modal1Container>
</template>

<script>
import MainStage from "./MainStage.vue";
import SideBar from "./SideBar.vue";
import Modal1Container from "@/components/modals/Modal1Container.vue";
import SearchUser from "@/components/modals/SearchUser.vue";

export default {
  name: "App",
  components: {
    Modal1Container,
    SearchUser,
    MainStage,
    SideBar,
  },
  created() {
    document.getElementById("navbar-title").innerHTML = "Dashboard"
  }
};
</script>

<style lang="scss">
@import "src/assets/scss/sm_global.scss";

#main-app-container {
  height: 95vh;
}
</style>
