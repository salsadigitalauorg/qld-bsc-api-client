<template>
  <div class="error">
    <p class="error__message">An error has occurred trying to get data.</p>
    <p class="error__message">You can retry by clicking the button below:</p>
    <button class="error__button" @click="retry">Retry</button>
  </div>
</template>

<script>
export default {
  methods: {
    retry () {
      this.$emit('retry')
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.error {
  &__message {
    color: $text-color;
    font-size: rem(18px);
    font-weight: 400;
  }

  &__button {
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: rem(18px);
    font-weight: 600;
    color: $text-color;
    @include underline;

    &::after {
      @include arrow_icon_pe;
    }
  }
}
</style>
