<template>
  <div>
    <ul v-if="list.length > 0" class="result">
      <li v-for="(item, index) in list" :key="index" class="result__list-item">
        <div class="result__items">
          <div class="result__item result__item-1">
            <h3 class="result__item-title">
              <button @click="selected(item)" class="result__item-title-button">{{ item.title }}</button>
            </h3>
          </div>
          <div class="result__item result__item-2">
            <span class="result__item-description">{{ item.description }}</span>
          </div>
          <div class="result__item result__item-3">
            <span class="result__item-filter">{{ item.filter1 }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="result__no-items">Sorry we could not find any results</div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  components: {},
  props: {
    list: Array
  },
  methods: {
    selected (item) {
      this.$emit('selected', item)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.result {
  margin: 0;
  padding: 0;
  list-style: none;

  &__items {
    box-sizing: border-box;
    border: rem(1px) solid $border-color;
    padding: rem(22px) rem(20px);
    margin-bottom: rem(16px);

    @include breakpoint('m') {
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
      min-height: rem(150px);
    }
  }

  &__item {
    margin: 0;
    margin-bottom: rem(16px);

    @include breakpoint('m') {
      margin: 0 rem(4px) 0;
    }
  }

  &__item-1 {
    @include breakpoint('m') {
      width: 33%;
    }
  }

  &__item-2 {
    @include breakpoint('m') {
      width: 33%;
    }
  }

  &__item-3 {
    @include breakpoint('m') {
      width: 33%;
    }
  }

  &__item-title {
    margin: 0;
  }

  &__item-title-button {
    @include underline;
    @include focus;
    display: inline;
    color: $text-color;
    font-size: rem(18px);
    line-height: 1.2em;
    font-weight: 600;
    background-color: transparent;
    border: 0;
    padding: 0;
    text-align: left;
    cursor: pointer;
  }

  &__item-description {
    font-size: rem(16px);
    color: $text-color;
  }

  &__item-filter {
    font-size: rem(16px);
    font-weight: 600;
    color: $text-color;
  }

  &__no-items {
    font-size: rem(24px);
    color: $text-color;
  }
}
</style>
