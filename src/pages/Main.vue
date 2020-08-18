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

.btn {
  @include button_base;

  &--small {
    font-size: rem(16px);
    font-weight: 400;
  }

  &--left {
    @include button_base(false);
  }
}

.app {
  max-width: $column-width;
  margin: auto;
  padding: rem(44px) rem(12px);
  min-height: calc(100vh - rem(186px + 44px + 117px + 88px));
}

.top {
  height: rem(44px);
  background-color: $darkblue;
}

.container__inner {
  width: 100%;
  max-width: $column-width;
  margin: auto;
  padding: rem(10px) rem(12px) rem(20px) rem(12px);
  box-sizing: border-box;
}

.header {
  height: rem(117px);
  background-color: $blue;

  img {
    width: rem(275px);
    height: rem(50px);
  }

  .header__title {
    font-size: rem(26px);
    color: $white;
  }
}

.footer {
  height: rem(186px);
  background-color: $darkblue2;

  .container__inner {
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  span,
  a {
    color: $white;
    font-size: rem(12px);
    margin-left: rem(16px);
  }
}
</style>