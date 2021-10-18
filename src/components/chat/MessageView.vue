<template>
  <div class="_root">
    <h1>{{this.messages}}</h1>
  </div>
</template>

<script>

export default {
  name: "MessageView",
  data() {
    return {
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
      console.log(response.data);
    })
  },
};
</script>
