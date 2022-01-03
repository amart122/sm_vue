<template>
  <div class="_root">
    <div class="chat_sidebar column-flex">
      <FriendList></FriendList>
    </div>
    <hr>
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
@import "src/assets/scss/sm_variables.scss";

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

  hr {
    display: none;
  }

  ul {
    list-style-type: none;
    width: 100%;
  }

  li {
    height: 5em;
    margin: 0.6em;
  }

  @media screen and (max-width: 415px) {
    .chat_sidebar {
      width: 89vw;
      padding: 0.6em 5vw;

      ::v-deep .friend_list {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        ul {
          display: flex;
          flex-wrap: nowrap;
        }

        li {
          width: 65px;
          padding: 0;
          margin: auto;
          overflow: hidden;
        }

        .fa-comment-medical {
          display: none;
        }
      }
    }

    hr {
      display: block;
      width: 100vw;
      border-color: $main-orange;
    }

    .chat_main {
      width: 100vw;
    }
  }
</style>