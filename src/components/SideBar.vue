<template>
  <div class="side-bar-sm column-flex col-2">
    <div class="side-container">
      <router-link to="/dashboard">
        <i class="fas fa-home"></i>
      </router-link>
    </div>
    <div class="side-container">
      <router-link to="/chat/home">
        <i class="fas fa-comments"></i>
      </router-link>
    </div>
    <div class="side-container">
      <i class="far fa-play-circle disabled"></i>
    </div>
    <div class="side-container">
      <i class="fas fa-search disabled"></i>
    </div>
    <div class="side-container">
      <i class="far fa-list-alt disabled"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-bar-sm {
  border-right: 1px solid #fd5430;
  height: 100%;
}

.side-container {
  height: 5vh;
  display: inherit;
  align-content: center;
  font-size: 2rem;
  margin: 32px 0;
  color: #fd5430;

  a {
    color: inherit;
  }

  i {
    cursor: pointer;

    &:hover {
      color: white;
      filter: drop-shadow(0px 0px 5px #fd5430);
    }
  }

  &.active {
    i {
      color: white;
      filter: drop-shadow(0px 0px 5px #fd5430);
    }
  }
}
</style>
