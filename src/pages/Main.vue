<template>
  <router-view class="app"></router-view>
</template>

<style lang="scss">
@import '../styles/variables';

body, button, select, input {
  @include font;
}

body {
  margin: 0;
}

.app {
  max-width: rem(1140px);
  margin: auto;
  padding: rem(44px) rem(12px);
  min-height: calc(100vh - (186px + 44px + 117px + 88px));
}

.top {
  height: rem(44px);
  background-color: #003647;
}

.container__inner {
  width: 100%;
  max-width: rem(1140px);
  margin: auto;
  padding: 10px rem(12px) 20px rem(12px);
  box-sizing: border-box;
}

.header {
  height: rem(117px);
  background-color: $green;

  img {
    width: rem(275px);
    height: rem(50px);
  }

  .header__title {
    font-size: rem(26px);
    color: white;
  }
}

.footer {
  height: rem(186px);
  background-color: #0C2E4C;

  .container__inner {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  span,
  a {
    color: white;
    font-size: 12px;
    margin-left: 16px;
  }
}
</style>