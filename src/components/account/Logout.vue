<template>
    <div class="">
        <h1>You have logged out</h1>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    name: "Logout",
    mounted() {
        const auth = getAuth();
        signOut(auth).then((response) => {
            this.$store.dispatch('setCurrentUser', null);
            document.cookie = "_sm_uid=;max-age=0";
        })
    }
}
</script>