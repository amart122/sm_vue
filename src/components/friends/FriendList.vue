<template>
    <div class='friend_list'>
        <ul v-if="getFriends.length">
            <li v-for="friend in getFriends"
                :key="friend.username"
                v-on:click="requestMessageRoom($event)"
                :data-fid="friend.id"
                :class="(friend.online ? 'online' : 'offline')">
                <h5
                    v-on:click="requestMessageRoom($event)"
                    :data-fid="friend.id">
                    {{ friend.username }}
                </h5>
                <span class="status"></span>
                <i class="fas fa-comment-medical"></i>
            </li>
        </ul>
        <div class="no-friends" v-else>
            <div class="message">
                <span> {{ getNoFriendMessage() }}</span>
            </div>
        </div>
        <div class="column-flex">
            <button class="search" v-on:click="openUserSearch()">Search users</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "FriendList",
    data() {
        return {
            page: 0,
        }
    },
    created() {
        const vm = this;
        if(this.$store.getters['user/getFriends'].length == 0) {
            this.$store.dispatch("user/updateFriends", this.$data.page)
            .then( (response) => {
                vm.$data.page += 1;
            });
        } else {
            vm.$data.page += 1;
        }
    },
    methods: {
        requestMessageRoom(event) {
            const fid = event.target.dataset.fid
            if(fid) {
                this.axios.get(
                    "api/friends/"+ fid +"/chat",{
                    headers: { User: this.$store.getters['getCurrentUser'] }
                }).then( (response) => {
                    if(response.data.room_uid) {
                        this.$router.push({name: 'Message', params: { id: response.data.room_uid }})
                    }
                })
            }
        },
        openUserSearch() {
            document.querySelector('.modal_container').classList.add('open')
        },
        getNoFriendMessage() {
            if(this.$props.status == "online") return "No Online Friends"
            return "No Friends"
        }
    },
    props: ['status'],
    computed: {
        getFriends() {
            let friends = this.$store.getters['user/getFriends']
            if(this.$props.status == "online") {
                friends = friends.filter( f => f.online )
            }
            friends = friends.slice(0, this.$data.page * 10)
            return friends;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/sm_variables.scss";

li {
    min-height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.75em 0;
    padding: 0 0.75em;
    color: $main-orange;
    cursor: pointer;

    &:hover {
        background-color: rgba($color: #FFF, $alpha: 0.1);
    }

    &.offline span.status {
        background-color: rgb(99, 91, 91);
    }

    &.online span.status {
        background-color: green;
    }
}

a {
    text-decoration: none;
    color: white;
    width: inherit;
    overflow: hidden;
}

.search {
    background: none;
    border-radius: 15px;
    color: $main-orange;
    font-size: 0.75em;
    padding: 7px;
    border: 0.5px solid #FFF;
    min-height: 25px;
    cursor: pointer;

    &:hover {
        background-color: rgba($color: #FFF, $alpha: 0.1);
    }
}

span.status {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
}

.no-friends {
    text-align: center;
    padding: 2em;
}
</style>