<template>
  <div class="main-stage-sm col-10">
    <div class="state" style="color: white">
      {{ $store.getters["main/getCurrentView"] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MainStage",
  props: {
    title: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main-stage-sm {
  background-color: rgb(24, 24, 37);
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
</style>
