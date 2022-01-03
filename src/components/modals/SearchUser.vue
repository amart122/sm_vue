<template>
    <div class="search_container column-flex">
        <button v-on:click="closeUserSearch()" class="close_btn">X</button>
        <h3> Search Users </h3>
        <div class="input_container">
            <input v-model="search_query" type="text" id="search_username" placeholder="username">
            <button class="search_btn_1" v-on:click="searchUser"></button>
        </div>
        <div id="search_user_results" >
            <ul>
                <li v-for="user in users" :key="user.username" :data-id="user.user_id">
                    <span>{{ user.username }}</span>
                    <button class="add_friend" v-on:click="confirmFriendRequest($event)"><i class="fas fa-plus"></i></button>
                    <div class='confirmation hidden'> 
                        <section>
                            <span> send request? </span> 
                            <button class="btn_confirm_2" v-on:click="sendFriendRequest($event)">Yes</button>
                            <button class="btn_ignore_1" v-on:click="cancelFriendRequest($event)">No</button>
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
    @import "@/assets/scss/sm_variables.scss";

    .search_container {
        justify-content: center;
        text-align: center;
        padding-top: 2em;
        position: relative;
    }
    .search_container > div {
        width: 75%;
    }

    .input_container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        input {
            width: 84%;
        }
    }

    .search_btn_1 {
        background-image: url("../../assets/images/icons/sm-search.png");
        background-size: 50%;
        background-position: center;
        background-repeat: no-repeat;
        height: 2pc;
        width: 15%;
    }

    #search_user_results {
        max-height: 15vh;
        min-height: 10vh;
        height: fit-content;
        overflow-y: auto;
        border: 2.5px solid #DDD;
        background-color: #464c50;
        margin-bottom: 0.6em;
    }
    
    ul {
        list-style: none;
    }

    li {
        margin: 0.6em 1.5em;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        &> span {
            color: white;
        }
    }

    .add_friend {
        width: 25%;
        background-color: transparent;
        border: none;
        color: white;
        border-radius: 5px;

        &:hover {
            background-color: #747f86;
        }
    }

    .confirmation {
        width: 100%;
        background-color: rgba(242, 242, 242, 1);
        padding: 0.15em 0;
        margin-top: 0.3em;
        font-size: 0.9em;

        section {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
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