<template>
  <div class="main-stage-sm col-10">
    <div class="top-container">
      <div class="row-flex">
        <div class="options">
          <ul>
            <li>Online Friends</li>
          </ul>
        </div>
        <div class="content">
          <FriendList :status="'online'"></FriendList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendList from "@/components/friends/FriendList.vue"

export default {
  name: "MainStage",
  components: {
    FriendList,
  },
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "src/assets/scss/sm_variables.scss";

.main-stage-sm {
  background-color: rgb(24, 24, 37);
  height: 100%;
}

.side-container {
  height: 5vh;
  display: inherit;
  align-content: center;
  font-size: 3rem;
  margin: 32px 0;
  color: #fd5430;

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

.main-list {
  width: 100%;
}

.options-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 2rem;
  background: linear-gradient(
    182.41deg,
    #832916 -157.31%,
    rgba(253, 84, 48, 0) 97.98%
  );
  color: white;
}

.list-option {
  width: 49%;

  &:first-of-type {
    border-right: 1px solid #fd5430;
  }
}


.top-container {
  max-height: 35vh;
  min-height: 35vh;
  height: 35vh;
  color: white;
  padding: 0.6em;

  .row-flex {
    border: 1px solid #555561;
    border-radius: 8px;
    height: 100%;
    flex-wrap: wrap;
  }

  .options {
    width: 100%;
    border-bottom: 1px solid $main-orange;
  }

  ul {
    list-style: none;
    text-align: center;
  }

  li {
    width: 50%;
    padding: 1em 2em;
  }

  .content {
    min-height: 80%;
    height: 80%;
    width: 100%;
  }

  .content > .friend_list {


    :deep(.fas.fa-comment-medical) {
      display: none;
    }

    :deep(.search) {
      display: none;
    }
  }
}
</style>
