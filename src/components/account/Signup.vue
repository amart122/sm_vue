<template>
  <div class="signup_bck">
    <h1>Sign Up</h1>
    <div class="sm-form">
      <div class="input_container">
        <label>Email: </label>
        <input v-model="user.email" name="user[email]" />
      </div>
      <div class="input_container">
        <label>Username: </label>
        <input v-model="user.username" name="user[username]" />
      </div>
      <div class="input_container">
        <label>Password: </label>
        <input v-model="user.password" type="password" name="user[password]" />
      </div>
      <form method="POST">
        <div class="h-captcha" 
          :data-sitekey="(env() === 'development') ? '10000000-ffff-ffff-ffff-000000000001' : 'fecb849e-95b3-489d-a966-84cb1a076538'">
        </div>
      </form>
      <div class="submit_container">
        <button
          v-on:click="firebase_signup()"
          id="signup_submit"
          class="sm_submit_btn_1"
          type="button"
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
      const captcha_respone = document.querySelector('.h-captcha > iframe').dataset.hcaptchaResponse;
      if(!captcha_respone) {
        this.$sm_helpers.show_alert(
          "error",
          "Please complete catpcha to continue."
        );
        this.$sm_helpers.hide_loader();
        return;
      }

      const auth = getAuth();
      this.$store.dispatch('user/toSignedUp');
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
              user_profile: {
                username: this.$data.user.username
              },
              hcaptcha_response: captcha_respone,
            },
            headers: { Authorization: id_token },
          })
        })
        .then((res) => {
          if (res?.data?.username) {
            window.location.href = "/dashboard"
          }
        })
        .catch((error) => {
          this.$sm_helpers.hide_loader();
          if (error.code == "auth/email-already-in-use" || error.message === undefined) {
            this.$sm_helpers.show_alert("error", "There was an error creating the account." );
          } else {
            this.$sm_helpers.show_alert("error", error.message);
          }
        });
    },
    env() {
      return process.env.NODE_ENV
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: "",
      },
    };
  },
  created() {
    window.onload = (event) => {
      const _script = document.createElement("script")
      _script.setAttribute("src", "https://js.hcaptcha.com/1/api.js")
      document.getElementsByClassName("signup_bck")[0].append(_script)
    };
  }
};
</script>

<style lang="scss" scoped>
.h-captcha {
  display: flex;
  justify-content: center;
}
</style>