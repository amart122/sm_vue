<template>
  <div class="chat_container row-flex">
    <router-view></router-view>
    <Modal1Container><SearchUser></SearchUser></Modal1Container>
  </div>
</template>

<script>
import Modal1Container from "@/components/modals/Modal1Container.vue";
import SearchUser from "@/components/modals/SearchUser.vue";


export default {
  name: "Chat",
  components: {
    Modal1Container,
    SearchUser,
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sm_variables.scss";
</style>
