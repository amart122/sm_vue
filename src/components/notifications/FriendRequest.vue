<template>
    <div class="friend_request">
        <div class="img-cont"></div>
        <div v-if="currState == 98"
            class="content received">
            <p> {{notification.message}} </p>
            <div class="btn_container">
                <button :data-id="notification.id" type='button' v-on:click="acceptFriendRequest($event)" class="friend_req_btn confirm">Accept</button>
                <button :data-id="notification.id" type='button' class="friend_req_btn ignore"
                    v-on:click="ignoreNotification($event)">Ignore</button>
            </div>
        </div>
        <div v-else class="content">
            <p> {{notification.message}} </p>
        </div>
        <span v-if="currState != 98" v-on:click="ignoreNotification($event)" :data-id="notification.id"> Ignore </span>
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
        },
        ignoreNotification(event) {
            this.axios.patch("/api/notifications/"+event.target.getAttribute("data-id")+"/",
                            { status: 1 , friend_request: "ignored" },
                            { headers: { User: this.$store.getters['getCurrentUser'] } })
                .then(() => {
                    this.$store.dispatch("user/updateNotifications")
                }).catch((error) =>{
                    if(error['redirect']) {
                        this.$router.replace(error['redirect'])
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sm_variables.scss";
.friend_request {
    display: flex;
    align-items: center;
}

.img-cont {
    min-width: 20%;
    min-height: 20%;
}

.content.received {
    width: 100%;
    margin-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.btn_container {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .friend_req_btn {
        font-size: 0.7em;
        color: white;
        min-height: 1em;
        line-height: 1.75em;
        width: 45%;
        border-radius: 6px;
        margin: 0.4em 0.25em;

        &:hover {
            border-color: white;
        }
    }

    .confirm {
        background-color: $main-orange;
        border: 1px solid $main-orange;
    }

    .ignore {
        background-color: #999999;
        border: 1px solid #999999;
    }
}

.content {
    text-align: left;
    width: 48%;
    overflow: hidden;
    height: 85%;
    padding: 5px 0px;
    
    p {
        color: white;
        font-size: 0.8rem;
        overflow: hidden;
        height: auto;
    }
}

span {
    font-size: 0.65rem;
    margin: auto;
    cursor: pointer;
}
</style>