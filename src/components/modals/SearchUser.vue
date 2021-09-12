<template>
    <div class="search_container column-flex">
        <div class="input_container">
            <label for="search_username">Username</label>
            <input v-model="search_query" type="text" id="search_username">
        </div>
        <div class="btn_container">
            <button v-on:click="searchUser">SEARCH</button>
        </div>
        <div id="search_user_results" class="result_container">
            <ul>
                <li v-for="user in users" :key="user.username">
                    {{ user.username }}
                    <button><i class="fas fa-plus"></i></button>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: "SearchUser",
    data() {
        return {
            search_query: "",
            users: []
        };
    },
    methods: {
        searchUser() {
            if(this.$data.search_query) {
                console.log(this.$store.getters['getCurrentUser'])
                this.axios.get("/api/user_profile/", {
                    headers: { "User": this.$store.getters['getCurrentUser'] },
                    params: { "username": this.$data.search_query }
                }).then( (response) => {
                    if (response.data != undefined) {
                        this.$data['users'] = response.data
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    .search_container {
        justify-content: center;
        text-align: center;
    }
    .search_container > div {
        width: 100%;
    }

    .result_container {
        ul {
            list-style: none;
        }
    }
</style>