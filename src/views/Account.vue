<template>
  <div class="account_container">
    <img alt="Simple Chat" src="@/assets/images/icons/placeholder_logo.svg" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Account",
  created() {
    const vm = this;
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === "setCurrentUser") {
        if(['login','signUp'].includes(vm.$router.currentRoute.value.name) && state.username) {
          vm.$router.replace('/dashboard')
        }
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/sm_variables.scss";

.signup_bck {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  h1 {
    color: white;
    width: 100%;
    text-align: center;
    margin-top: 17vh;
  }

  .sm-form {
    margin: 5vh 5vw;
    color: $main-orange;
    font-size: 1rem;
    min-width: 85vw;

    input:not([type="submit"]) {
      background: transparent;
      border-width: 0px 0px 1px 0px;
      border-color: $main-orange;
      color: white;
    }
  }
}

.submit_container {
  margin-top: 5vh;
  display: flex;
  justify-content: center;
}

.input_container {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  padding: 0.1rem 0.4rem 0.4rem 0.3rem;

  input {
    line-height: 2em;
  }
}

.account_container {
  background: url("../assets/images/sm-background-1.svg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>
