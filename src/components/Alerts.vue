<template>
  <div id="sm-alert-container" class="">
    <div class="icon"></div>
    <div class="message"><span></span></div>
    <div class="close"></div>
  </div>
</template>

<style lang="scss" scoped>
.close {
  background-image: url('../../src/assets/images/icons/cross-1.svg');
}

#sm-alert-container {
    &.error {
        background-color: #F6CFCF;
        border: 1px solid #B71D1D;

        .icon {
            color: #B71D1D;
            background-image: url('../../src/assets/images/icons/red-cross-cirle-1.svg');
        }
    }
}
</style>