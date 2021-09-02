<template>
  <div class="signup_bck">
    <h1>Log In</h1>
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
          v-on:click="firebase_login()"
          id="login_submit"
          class="sm_submit_btn_1"
        >
          Log In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  methods: {
    firebase_login() {
      this.$sm_helpers.show_loader();
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.$data.user.email,
          this.$data.user.password
        )
        .then(async (userCredential) => {
          const user = userCredential.user;
          const id_token = await user.getIdToken();
          this.axios({
            method: "get",
            url: "/api/users/" + user.uid,
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
        email: "",
        password: "",
      },
    };
  },
};
</script>
