<template>
  <div class="error">
    <p class="error__message">An error has occurred trying to get data.</p>
    <p class="error__message">You can retry by clicking the button below:</p>
    <button class="btn" @click="retry">Retry</button>
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
  text-align: center;

  &__message {
    color: $text-color;
    font-size: rem(18px);
    font-weight: 400;
  }
}
</style>
