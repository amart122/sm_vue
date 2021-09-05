<template>
  <div class="chat_container row-flex">
    <div class="chat_sidebar column-flex">
      <OnlineList></OnlineList>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import OnlineList from "@/components/friends/OnlineList.vue"
export default {
  name: "Chat",
  components: {
    OnlineList,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sm_variables.scss";

.chat_sidebar {
  width: 15%;
}
</style>
