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
    this.axios.get('/chat/message/'+this.$route.params.id)
  },
};
</script>
