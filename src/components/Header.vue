<template>
    <header>
        <div id='navbar_main' class='row-flex'>
            <div class="logo-container nav-left col-2">
                <router-link to="/dashboard" class="logo-main">
                    <img src="/static/site/images/logo.png" alt="Home">
                </router-link>
            </div>
            <div class="nav-fill col-6">
                <h2 id="navbar-title" class="title">TITLE</h2>
            </div>
            <div class="nav-right col-3">
                <div class="dropdown_container bell">
                    <input type="checkbox" class="dropdown_btn fas fa-bell" :class="{ active: (getNotifications.length > 0)}"
                        :data-value="getNotifications.length">
                    <div class="dropdown_list">
                        <ul>
                            <li class="row-flex notification-cont" v-for="notification in getNotifications" v-bind:key="notification.id">
                                <FriendRequest v-if="notification.content_type == 11" :notification="notification"></FriendRequest>
                                <MessageNotification v-if="notification.content_type == 17 && notification.status == 0" :notification="notification"></MessageNotification>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown_container profile" aria-hidden="true">
                    <input id="user_profile_options" type="checkbox" class="dropdown_btn user">
                    <div class="dropdown_list">
                        <ul>
                            <li class="account_option">
                                <a> Account </a>
                            </li>
                            <li class="account_option">
                                <a> Settings </a>
                            </li>
                            <li class="account_option">
                                <router-link to="/account/logout" class="logo-main">
                                    Log Out
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <label for="user_profile_options"></label>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import FriendRequest from "./notifications/FriendRequest.vue";
import MessageNotification from "./notifications/MessageNotification.vue";

export default {
    name: "Header",
    components: {
        FriendRequest,
        MessageNotification,
    },
    data() {
        return { notifications: [], }
    },
    created() {
        this.$store.dispatch('user/updateNotifications')
    },
    computed: {
        getNotifications() {
            return this.$store.getters['user/getNotifications']
        }
    }
}

</script>

<style lang="scss" scoped>
    .dropdown_container {
        position: relative;
        min-width: 15vw;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 11;
    }

    .bell {
        padding-bottom: 7px;
    }

    .dropdown_btn {
        left: 50%;
        top: 25%;
        background: none;
        border: none;
        color: #FD5430;
        height: 0;
        z-index: 12;

        &::before {
            display: block;
        }
        i {
            font-size: inherit;
        }
        &:checked {
            &+ .dropdown_list {
                display: block;
            }
        }

        &::before {
            margin: -50%;
        }
    }

    .dropdown_btn + .dropdown_list {
        position: absolute;
        top: 125%;
        display: none;
    }

    .dropdown_list {
        min-height: 20vh;
        width: 22vw;
        min-width: 125px;
        z-index: 11;

        ul {
            list-style: none;
			text-align: center;
			color: #FD5430;
			background-color: #1D2952;
			border-radius: 8px;
			border: 1.5px solid #FD5430;
			min-height: 5rem;
            max-height: 15rem;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-evenly;
			overflow: auto;
            background-color: #1D2952;
            
            scrollbar-width: thin;          /* "auto" or "thin" */
            scrollbar-color: #1D2952 orange;

            &::-webkit-scrollbar {
                width: 8px;
                background-color: #1D2952;
                border-left: 1px solid #FD5430;
                border-bottom: 1px solid #FD5430;
                opacity: 0.1;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
            }

            &::-webkit-scrollbar-thumb {
                background: #FD5430;
                border-radius: 8px;
            }
        }

        li {
            width: 100%;
            border-bottom: 1px solid #FD5430;
            height: 4rem;
            justify-content: space-between;
            align-items: center;

            
            &:last-of-type {
				border: none;
			}

            a {
                text-decoration: none;
                text-align: left;
                color: #FD5430;

                &:hover {
                    color: white;
                }
            }

            span {
                margin-left: 10px;
            }
        }

        &::before {
            content: "";
            position: absolute;
            border: 1rem solid #FD5430;
            border-top-color: transparent;
            border-right-color: transparent;
            border-left-color: transparent;
            left: calc(50% - 1rem);
            top: -1.5em;
            z-index: -1;
        }
    }

    .notification-cont {
        width: 20vw;
        padding: 5px 0px;

        &> div {
            width: 100%;
            height: 100%;
            
            &:hover {
                background-color: #313e6c;
            }
        }
    }

    // Num Notifications
    .dropdown_btn.fas.fa-bell.active::after {
        content: attr(data-value);
        color: white;
        font-size: 0.5em;
        position: absolute;
        top: 15px;
        z-index: 12;
        left: 50%;
        border: 0.5px solid white;
        background: blue;
        border-radius: 4px;
    }

    .fas.fa-bell {
        font-size: 3vh;
    }
    

    .profile {
        min-height: 5vh;

        .dropdown_list {
            top: 6vh;
        }
    }

    .user {
        padding-top: 7px;
        font-size: 3.5vh;
		font-weight: 100;
		color: #FD5430;
        display: none;

        &::before {
            position: absolute;
            top: 1vh;
            left: 7vh;
            margin: auto;
        }

        & + .dropdown_list {
            width: 100%;


            & + label {
                background-image: url("../assets/images/icons/user.png");
                background-size: 90%;
                background-position: right center;
                background-repeat: no-repeat;
                height: 2pc;
                width: 2pc;
            }
        }

        
    }
</style>