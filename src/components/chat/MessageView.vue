<template>
  <div class="message_root">
    <h1 v-if="this.other_participant != null"
      :title="(this.other_participant.online ? 'Online' : 'Offline')">
      {{ this.other_participant.username }}
      <span 
        class="status"
        :class="(this.other_participant.online ? 'online' : 'offline')"></span>
    </h1>
    <div class="message_container">
      <ul class="messages">
        <li
          v-for="message in this.messages"
          :class="'message ' + (message.owner ? 'sent' : 'received')"
          :key="message.id"
        >
          {{ message.content }} || {{ message.updated_at }}
          <span class="sent_at">{{ message.sent_at }}</span>
        </li>
      </ul>
    </div>
    <div class="new_message_container">
      <button class="options" type="button">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <textarea
        class="message_input"
        id="new_message"
        cols="30"
        v-on:keydown.enter.exact.prevent="sendMessage()"
      ></textarea>
      <button class="send" type="button" v-on:click="sendMessage()">
        <i class="fas fa-arrow-circle-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageView",
  data() {
    return {
      other_participant: null,
      messages: [],
      socket: null,
    };
  },
  created() {
    this.axios
      .get("api/message_room/" + this.$route.params.id, {
        headers: { User: this.$store.getters["getCurrentUser"] },
      })
      .then((response) => {
        this.messages = response.data.message_set;
        setTimeout( () => {
          const messages_cont = document.querySelector('.message_container');
          messages_cont.scrollTop = messages_cont.scrollHeight;
        }, 300)
        const user_ids = this.$sm.map_without_duplicates(
          response.data.participant_set,
          "user_id",
          { cond_check: "owner", check_return: null }
        );

        // Get other participant username
        if (this.$store.getters["user/getFriends"].length) {
          const user = this.$store.getters["user/getFriends"].find((f) =>
            user_ids.includes(f.id)
          );
          if (user) {
            this.other_participant = user;
          }
        } else {
          this.$store.dispatch("user/updateFriends").then(() => {
            const user = this.$store.getters["user/getFriends"].find((f) =>
              user_ids.includes(f.id)
            );
            if (user) {
              this.other_participant = user;
            }
          });
        }

        return response.data.id;
      })
      .then((room_id) => {
        const url = "http://api.simple-chat.site:8002";
        const prot = (process.env.NODE_ENV === "development") ? "ws" : "ws";
        const socket = new WebSocket(
          `${prot}:////${url}/ws/sm/chat/${room_id}/?Authentication=${this.$store.getters["getCurrentUser"]}`
        );
        socket.onopen = () => {
          this.socket = socket;
        };
        socket.onclose = (event) => {
          this.socket = null;
          if (event.wasClean) {
            console.log(
              `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
            );
          } else {
            console.log("[close] Connection died");
          }
        };
        socket.onmessage = (event) => {
          const new_message = JSON.parse(event.data);
          this.messages.push(new_message);
          setTimeout( () => {
            const messages_cont = document.querySelector('.message_container');
            messages_cont.scrollTop = messages_cont.scrollHeight;
          }, 300)
        };
      });
  },
  methods: {
    sendMessage() {
      if (this.socket) {
        this.socket.send(
          JSON.stringify({ 
            type: "send",
            msg: document.getElementById("new_message").value 
          })
        );
        document.getElementById("new_message").value = "";
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if(this.socket) {
      this.socket.close(1000);
    }
    next()
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/sm_variables.scss";

.message_root {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
}

h1 {
  color: $main-orange;
  display: flex;
  align-items: center;
  line-height: 1;
  height: 1em;
}

span.status {
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  margin: 0 0.5em;

  &.offline {
    background-color: rgb(99, 91, 91);
  }

  &.online {
    background-color: green;
  }
}

.message_container {
  position: absolute;
  bottom: 3.3vh;
  width: 100vw;
  height: 85vh;
  overflow-y: scroll;
  margin-bottom: 1rem;
  scrollbar-width: thin;          /* "auto" or "thin" */
  scrollbar-color: transparent orange;

  &::-webkit-scrollbar {
    width: 0.1pc;
    background-color: transparent;
    opacity: 0.1;
  }

  &::-webkit-scrollbar-thumb {
    background: #FD5430;
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 0.3rem;
  }
}

.message {
  min-height: 25px;
  display: flex;
  position: relative;
  width: fit-content;
  padding: 5px;
  margin: 10px 15px;
  max-width: 80%;
  border-radius: 8px;

  .sent_at {
    position: absolute;
    font-size: 0.3em;
    bottom: -10px;
    color: gray;
  }
}

.message.sent {
  background-color: #943725;
  align-self: flex-end;
  border-bottom-right-radius: 0px;

  .sent_at {
    right: 0;
  }
}

.message.received {
  background-color: lightblue;
  border-bottom-left-radius: 0px;

  .sent_at {
    left: 0;
  }
}

.new_message_container {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 0px 0px;
  height: 5vh;

  .options {
    background: transparent;
    border: none;
    width: 10%;
  }

  .message_input {
    resize: none;
    border: none;
    background-color: #464c50;
    width: 80%;
    color: white;
  }

  .send {
    width: 18%;
    background-color: $main-orange;
    border: none;
    font-size: 25px;
    opacity: 0.5;
  }
}
</style>
