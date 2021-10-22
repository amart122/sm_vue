<template>
  <div class="_root">
    <h1 v-if="this.other_participant != null">{{this.other_participant.username}}</h1>
    <ul class="messages">
      <li v-for="message in this.messages" class="message" :key="message.id">
        {{message.content}} || {{message.updated_at}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "MessageView",
  data() {
    return {
      other_participant: null,
      messages: []
    }
  },
  created() {
    this.axios.get(
      'api/message_room/'+this.$route.params.id,
      {
        headers: { User: this.$store.getters['getCurrentUser'] }
      }
    ).then( (response) => {
      this.messages = response.data.message_set;

      const user_ids = this.$sm.map_without_duplicates(
        response.data.message_set,
        "user_id",
        { cond_check: "owner", check_return: null }
      )
      
      // Get other participant username
      if(this.$store.getters['user/getFriends'].length) {
        const user = this.$store.getters['user/getFriends'].find(f => user_ids.includes(f.id))
        if(user) {
          this.other_participant = user
        }
      } else {
        this.$store.dispatch("user/updateFriends")
          .then( () => {
            const user = this.$store.getters['user/getFriends'].find(f => user_ids.includes(f.id))
            if(user) {
              this.other_participant = user
            }
        })
      }
    })
  },
};
</script>
