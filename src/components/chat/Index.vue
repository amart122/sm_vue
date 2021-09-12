<template>
  <div class="_root">
    <h1>INDEX CHAT</h1>

    <div class="chat_sidebar column-flex">
      <OnlineList></OnlineList>
    </div>
  </div>
</template>

<script>
import OnlineList from "@/components/friends/OnlineList.vue"

export default {
  name: "Index",
  components: {
    OnlineList,
  },
};
</script>

<style lang="scss" scoped>
  ._root {
    width: 100%;
    text-align: center;
  }

  .chat_sidebar {
    width: 15%;
  }
</style>