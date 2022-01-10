<template>
    <div class="row-flex">
        <h1>You have logged out</h1>
        <div class="login">
            <router-link to="/account/login">Log In ></router-link>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    name: "Logout",
    mounted() {
        if(this.$store.getters['getCurrentUser'] == null) {
            signOut(getAuth())
            return
        }
        this.axios.delete(
            `/api/session/`,
            {
                headers: { User: this.$store.getters['getCurrentUser'] }
            }
        ).then(() => {
            signOut(getAuth())
        }).then((response) => {
            this.$store.dispatch('setCurrentUser', null);
        }).catch(() => {
            signOut(getAuth())
            .then(() => this.$store.dispatch('setCurrentUser', null) )
        })
    }
}
</script>

<style lang="scss" scoped>
@import "src/assets/scss/sm_variables.scss";

.row-flex {
    justify-content: center;
    flex-wrap: wrap;
    padding: 10vh 15vw;
}

h1 {
    color: $main-orange;
    margin: 3em 0;
}

.login {
    width: 100%;

    a {
        margin-left: 5vw;
        color: white;

        &:hover {
            color: $main-orange;
        }
    }
}

</style>