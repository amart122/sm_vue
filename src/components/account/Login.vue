<template>
  <div class="signup_bck">
    <h1>Log In</h1>
    <div class="sm-form">
      <div class="input_container">
        <label>Username: </label>
        <input v-model="user.username" name="user[username]" />
      </div>
      <div class="input_container">
        <label>Password: </label>
        <input v-model="user.password" type="password" name="user[password]" />
      </div>
      <div class="submit_container">
        <button
          v-on:click="firebase_login()"
          id="login_submit"
          class="sm_submit_btn_1"
        >
          Log In
        </button>
      </div>
    </div>
    <div class="signup">
      <router-link to="/account/signup">Sign up ></router-link>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  name: "Login",
  methods: {
    firebase_login() {
      const auth = getAuth();
      this.$sm_helpers.show_loader();
      signInWithEmailAndPassword(
        auth,
        this.$data.username + "@sc.site",
        this.$data.user.password
      )
      .then(async (userCredential) => {
        const user = userCredential.user;
        const id_token = await user.getIdToken();
        this.axios({
          method: "post",
          url: "/api/session/",
          headers: { Authorization: id_token },
        })
          .then((response) => {
            if (response.data && response.data.username) {
              this.$store.dispatch("setCurrentUser", response.data.username);
              this.$router.replace({ name: "Dashboard" });
            }
          })
          .catch((error) => {
            this.$sm_helpers.show_alert(
              "error",
              "An error occurred while loging in."
            );
            signOut(auth);
          })
          .then(() => {
            this.$sm_helpers.hide_loader();
          });
      })
      .catch((error) => {
        this.$sm_helpers.hide_loader();
        switch (error.code) {
          case "auth/wrong-password":
          case "auth/invalid-email":
          case "auth/user-not-found":
            this.$sm_helpers.show_alert(
              "error",
              "Password or email is incorrect."
            );
            break;
          default:
            this.$sm_helpers.show_alert(
              "error",
              "An error occurred while loging in."
            );
        }
      });
    },
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/sm_variables.scss";

.sm-form {
  width: 100%;
}

.signup {
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