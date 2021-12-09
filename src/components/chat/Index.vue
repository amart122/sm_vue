<template>
  <div class="_root">
    <div class="chat_sidebar column-flex">
      <FriendList></FriendList>
    </div>
    <div class="chat_main column-flex">
      <ul>
        <li v-for="chat in getChatList" v-bind:key="chat.id">
          <UserMessagePreview :chat_message="chat"></UserMessagePreview>
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
  created() {
    document.getElementById("navbar-title").innerHTML = "Chat"
    this.$store.dispatch('chat/updateChatList')
  },
  computed: {
    getChatList() {
      return this.$store.getters['chat/getChatList']
    }
  }
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

    ::v-deep .friend_list {
      width: inherit;
      padding: 0px 5px;

      li i {
        margin-left: 0.5em;
      }
    }
  }

  ul {
    list-style-type: none;
    width: 100%;
  }

  li {
    height: 5em;
    margin: 0.6em;
  }
</style>