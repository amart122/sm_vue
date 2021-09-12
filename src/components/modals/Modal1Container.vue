<template>
  <div class="modal_container">
    <div class="backdrop">
    </div>
    <div class="main_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default ({
  name: "Modal1Container",
})
</script>

<style lang="scss" scoped>
  .modal_container, .backdrop {
    position: absolute;
    top: 0;
    left: 0;
  }
  .modal_container {
    width: 100vw;
    height: 100vh;
    z-index: 10;
    display: flex;
    justify-content: center;
    padding-top: 25%;
  }

  .backdrop {
    background-color: rgb(234, 234, 248);
    z-index: 10;
    opacity: 0.25;
    width: 100vw;
    height: 100vh;
  }

  .main_content {
    top: 30%;
    left: 25%;
    background-color: rgba(242, 242, 242, 0.775);
    min-width: 50vw;
    min-height: 25vh;
    max-height: 25vh;
    z-index: 11;
    border-radius: 18px;
  }
</style>