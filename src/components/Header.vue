<template>
    <header>
        <div id='navbar_main' class='row-flex'>
            <div class="logo-container nav-left col-2">
                <router-link to="/dashboard" class="logo-main">
                    <img src="/static/site/images/logo.png" alt="Home">
                </router-link>
            </div>
            <div class="nav-fill col-6">
                <h2 class="title">TITLE</h2>
            </div>
            <div class="nav-right col-3">
                <div class="dropdown_container">
                    <input type="checkbox" class="dropdown_btn fas fa-bell">
                    <div class="dropdown_list">
                        <ul>
                            <li class="row-flex" v-for="(notification, index) in notifications" v-bind:key="notification.id">
                                <router-link to="/chat/home" class="logo-main">
                                    {{notification.message}}
                                </router-link>
                                <span> X </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="dropdown_container profile">
                    <input type="checkbox" class="dropdown_btn far fa-user-circle user">
                    <div class="dropdown_list">
                        <ul>
                            <li class="account_option">
                                <a> Account </a>
                            </li>
                            <li class="account_option">
                                <a> Settings </a>
                            </li>
                            <li class="account_option">
                                <a> Log Out </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return { notifications: [], }
    },
    methods: {
        // uncheck() {
        //     setTimeout( () => {
        //         document.querySelector("input.dropdown_btn").checked = false;
        //     }, 250)
        // },
        getNotifications() {
            this.axios({
                method: "get",
                url: "/api/notifications",
                data: {},
                headers: { User: this.$store.getters['getCurrentUser'] },
            }).then((response) => {
                this.$data.notifications = response.data
            })
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters['getCurrentUser'] && true
        },
        noNotifications() {
            return this.$data.notifications.length
        }
    },
    watch: {
        loggedIn: {
            handler (value) {
                this.getNotifications()
            },
            immediate: true
        },
        noNotifications: {
            handler (value) {
                if(value > 0) {
                    document.querySelector('.dropdown_btn.fas.fa-bell').setAttribute('data-value', value)
                }
            },
            immediate: true
        }
    },
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
            padding: 0 10px;
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

    // Num Notifications
    .dropdown_btn.fas.fa-bell::after {
        content: attr(data-value);
        color: white;
        font-size: 0.5em;
        position: absolute;
        top: 35%;
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
            top: 7vh;
            left: -25%;
        }
    }

    .fa-user-circle.user {
        font-size: 5vh;
		font-weight: 100;
		color: #FD5430;
        width: 0px;

        &::before {
            position: absolute;
            top: 1vh;
            left: 7vh;
            margin: auto;
        }
    }
</style>