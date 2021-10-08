<template>
    <div class="friend_request">
        <p> {{notification.message}} </p>
        <div v-if="currState == 98">
            <button :data-id="notification.id" type='button' v-on:click="acceptFriendRequest($event)" class="friend_req_btn">Confirm</button>
            <button :data-id="notification.id" type='button' class="friend_req_btn">Ignore</button>
        </div>
        <span></span>
        <span> X </span>
    </div>
</template>

<script>

export default {
    name: 'FriendRequest',
    props: ['notification'],
    data() {
        return {
            state: null,
        }
    },
    mounted() {
        this.$data.state = this.notification.friend_request.state
    },
    computed: {
        currState() {
            return this.$data.state;
        }
    },
    methods: {
        acceptFriendRequest($event) {
            this.axios.patch("/api/notifications/"+$event.target.getAttribute("data-id")+"/",
                            { status: 1, friend_request: "accepted" },
                            { headers: { User: this.$store.getters['getCurrentUser'] } })
                .then((response) => {
                    this.$data.state = 1 
                }).catch((error) =>{
                    if(error['redirect']) {
                        this.$router.replace(error['redirect'])
                    }
                })
        }
    }
}
</script>
