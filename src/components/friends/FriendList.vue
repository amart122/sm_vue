<template>
    <div>
        <ul>
            <li v-for="friend in this.$store.getters['user/getFriends'].slice(0, page * 10)" :key="friend.username">
                <a href="#">
                    <h5>{{ friend.username }}</h5>
                </a>
            </li>
        </ul>
        <div class="search_container column-flex">
            <button>Add Friend +</button>
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
}
</script>

<style lang="scss" scoped>
li {
    min-height: 2rem;
}

a {
    text-decoration: none;
    color: white;
}
</style>