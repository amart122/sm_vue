/* eslint-disable no-undef */
<template>
  <div class="signup_bck">
    <h1>Sing Up</h1>
    <div class="sm-form">
      <div class="input_container">
        <label>Email: </label>
        <input v-model="user.email" name="user[email]" />
      </div>
      <div class="input_container">
        <label>Password: </label>
        <input v-model="user.password" type="password" name="user[password]" />
      </div>
      <div class="submit_container">
        <button
          v-on:click="firebase_signup()"
          id="signup_submit"
          class="sm_submit_btn_1"
        >
          Sign Up
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Sign Up",
  methods: {
    firebase_signup() {
      this.$sm_helpers.show_loader();
      const auth = getAuth();
      // eslint-disable-next-line prettier/prettier, no-undef
      createUserWithEmailAndPassword(auth, this.$data.user.email, this.$data.user.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const id_token = await user.getIdToken();
          return this.axios({
            method: "post",
            url: "/api/users/",
            data: {
              username: user.uid,
              email: user.email,
            },
            headers: { Authorization: id_token },
          })
        }).then((res) => {
          if (res.data && res.data.username) {
            this.$store.dispatch("setCurrentUser", res.data.username);
            this.$router.replace({ name: "Dashboard" });
          }
        }).catch((error) => {
          this.$sm_helpers.hide_loader();
          if (error.code == "auth/email-already-in-use") {
            this.$sm_helpers.show_alert(
              "error",
              "There was an error creating the account."
            );
          } else {
            this.$sm_helpers.show_alert("error", error.message);
          }
        });
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
};
</script>
