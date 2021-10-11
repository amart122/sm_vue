<template>
  <div class="_root">
    <h1>INDEX CHAT</h1>

    <div class="chat_sidebar column-flex">
      <FriendList></FriendList>
    </div>
    <div class="chat_main column-flex">
      <ul>
        <li>
          <UserMessagePreview></UserMessagePreview>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FriendList from "@/components/friends/FriendList.vue"
import UserMessagePreview from "@/components/chat/UserMessagePreview"

export default {
  name: "Index",
  components: {
    FriendList,
    UserMessagePreview
  },
};
</script>

<style lang="scss" scoped>
  ._root {
    width: 100%;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
  }

  h1 {
    width: 100%;
  }

  .chat_main {
    width: 83vw;
  }

  .chat_sidebar {
    width: 15vw;
  }

  ul {
    list-style-type: none;
    width: 100%;
  }
</style>