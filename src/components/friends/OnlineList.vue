<template>
    <div>
        <ul>
            <li v-for="friend in this.$store.getters['user/getOnlineFriends']" :key="friend.username">
                <h5>{{ friend.username }}</h5>
            </li>
        </ul>
        <div class="search_container column-flex">
            <button>Add Friend +</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "OnlineList",
}
</script>

<style lang="scss" scoped>
</style>