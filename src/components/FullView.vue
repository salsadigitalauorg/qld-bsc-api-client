<template>
  <div class="full-view">
    <button @click="back" class="full-view__back">Back</button>
    <h1 class="full-view__title">{{ selected.service_interaction_name }}</h1>
    <template v-if="selected.long_description">
      <h2>Description</h2>
      <p v-html="selected.long_description"></p>
    </template>
    <template v-if="selected.who_is_eligible">
      <h2>Who is eligible</h2>
      <p v-html="selected.who_is_eligible"></p>
    </template>
    <template v-if="selected.how_to">
      <h2>How to</h2>
      <p v-html="selected.how_to"></p>
    </template>
    <template v-if="selected.more_information_url">
      <h2>More information</h2>
      <p v-html="selected.more_information_url"></p>
    </template>
    <template v-if="selected.do_it_online_url">
      <h2>Do it online</h2>
      <p v-html="selected.do_it_online_url"></p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    selected: Object
  },
  computed: {
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.full-view {
  &__back {
    @include focus;
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: rem(18px);
    font-weight: 600;
    color: $text-color;
    @include underline;

    &::before {
      @include arrow_icon_pe(true);
    }
  }

  &__top-details {
    margin-top: rem(32px);
    margin-bottom: rem(32px);
  }

  &__row {
    @include breakpoint(m) {
      display: flex;
    }
  }

  &__logo-wrapper {
    @include breakpoint(m) {
      margin-right: rem(32px);
    }
  }

  &__logo {
    width: 100%;
    max-width: rem(320px) !important;
  }

  &__brands-image {
    width: 100%;
    max-width: rem(320px) !important;
  }

  &__title {
    color: $text-color;
    font-size: rem(24px);
    font-weight: 600;
  }

  &__details {
    color: $text-color;

    @include breakpoint(s) {
      display: table;
    }
  }

  &__detail {
    margin-bottom: rem(16px);

    @include breakpoint(s) {
      display: table-row;
      margin-bottom: 0;
    }
  }

  &__detail-title {
    color: $text-color;
    font-size: rem(18px) !important;
    font-weight: 600 !important;
    margin: 0 !important;

    @include breakpoint(s) {
      display: table-cell;
      padding: rem(8px) rem(22px) rem(8px) 0;
    }
  }

  &__detail-detail {
    font-size: rem(18px) !important;
    color: $text-color;
    margin: 0 !important;

    @include breakpoint(s) {
      display: table-cell;
      padding: rem(8px) 0;
    }
  }

  &__detail-link {
    @include focus;
    @include underline;
    font-size: rem(18px) !important;
    color: $text-color;
  }

  &__detail-list {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  &__detail-list-item {
    margin-bottom: rem(16px);
  }

  &__brand-title {
    color: $text-color;
    font-size: rem(24px);
    font-weight: 600;
    margin: 0;
    margin-bottom: rem(16px) !important;
  }

  &__brand-setion {
    background-color: $brand-back;
    padding: rem(64px) rem(20px);
    margin: rem(16px) 0;
  }

  &__brands-wrapper {
    background-color: white;
    padding: rem(20px);
  }

  &__brands {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__brands-item {
    box-sizing: border-box;
    margin-bottom: rem(16px);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__brands-title {
    color: $text-color;
    font-size: rem(18px) !important;
    margin: 0;
  }

  &__brands-description {
    color: $text-color;
    margin: 0;
  }

  &__brands-status {
    color: $text-color;
  }
}
</style>
