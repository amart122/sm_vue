<template>
    <div class='friend_list'>
        <ul>
            <li v-for="friend in this.$store.getters['user/getFriends'].slice(0, page * 10)" :key="friend.username">
                <router-link :to="{name: 'Message', params: { id: 'new' }, query: { fid: friend.id } }" class="logo-main">
                    <h5>{{ friend.username }}</h5>
                </router-link>
                <i v-on:click="requestMessageRoom($event)" :data-fid="friend.id" class="fas fa-comment-medical"></i>
            </li>
        </ul>
        <div class="search_container column-flex">
            <button v-on:click="openUserSearch()">User Search +</button>
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
                console.log(vm.$store.getters['user/getFriends'].slice(0, vm.$data.page * 10))
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
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    min-height: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

a {
    text-decoration: none;
    color: white;
    width: inherit;
    overflow: hidden;
}
</style>