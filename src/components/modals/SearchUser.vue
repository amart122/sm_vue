<template>
    <div class="search_container column-flex">
        <button v-on:click="closeUserSearch()" class="close_btn">X</button>
        <h3> Search Users </h3>
        <div class="input_container">
            <label for="search_username">Username</label>
            <input v-model="search_query" type="text" id="search_username">
        </div>
        <div class="btn_container">
            <button v-on:click="searchUser">SEARCH</button>
        </div>
        <div id="search_user_results" class="result_container">
            <ul>
                <li v-for="user in users" :key="user.username" :data-id="user.user_id">
                    {{ user.username }}
                    <button v-on:click="confirmFriendRequest($event)"><i class="fas fa-plus"></i></button>
                    <div class='confirmation hidden'> 
                        <section>
                            <span> Add Friend? </span> 
                            <button v-on:click="sendFriendRequest($event)">Yes</button>
                            <button v-on:click="cancelFriendRequest($event)">No</button>
                        </section>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

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
                }).catch( (error) => {
                    const auth = getAuth();
                    if(error['redirect']) {
                        this.$router.replace(error['redirect'])
                    }
                })
            }
        },
        confirmFriendRequest(event) {
            const li = event.target.closest("li")
            for(const conf of document.querySelectorAll(".confirmation")) {
                conf.classList.add("hidden")
            };
            li.querySelector(".confirmation").classList.remove("hidden")
        },
        cancelFriendRequest(event) {
            const li = event.target.closest("li")
            li.querySelector(".confirmation").classList.add("hidden")
        },
        sendFriendRequest(event) {
            const user_id = event.target.closest("li").getAttribute("data-id")
            const vm = this;
            this.axios.post(
                `/api/users/${user_id}/friend_request/`, 
                {},
                {
                    headers: { User: this.$store.getters['getCurrentUser'] }
                }
            ).then((response) => {
                if(response && response.data['success']) {
                    this.$sm_helpers.show_alert('error', response.data['success']);
                    event.target.closest(".confirmation").classList.add('hidden');
                }
            }).catch((error) => {
                if(error['status'] == 400) {
                    this.$sm_helpers.show_alert('error', "Friend Request already sent");
                }
            });
        },
        closeUserSearch() {
            document.querySelector('.modal_container').classList.remove('open')
        }
    }
}
</script>

<style lang="scss" scoped>

    .search_container {
        justify-content: center;
        text-align: center;
        padding-top: 2em;
        position: relative;
    }
    .search_container > div {
        width: 75%;
    }

    .result_container {
        ul {
            list-style: none;
        }
    }

    .close_btn {
        position: absolute;
        top: 1em;
        right: 1em;
        font-size: 1.2em;
        background-color: transparent;
        border: none;
    }
</style>