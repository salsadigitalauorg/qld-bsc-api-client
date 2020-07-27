<template>
  <form class="filter" @submit.prevent="filterSubmit">
    <div class="filter__first-line">
      <div class="filter__field filter__keyword">
        <label class="filter__label filter__keyword-label" for="filter__keyword">Search by keywords</label>
        <input class="filter__input filter__keyword-input" id="filter__keyword" v-model="filter.keywords" type="text" placeholder="Search by keywords" @keyup="filterQuickChange" />
      </div>
      <div class="filter__field filter__dropdown filter__provider">
        <label class="filter__label filter__provider-label" for="filter__provider">Filter by status</label>
        <div class="filter__input-select-wrapper">
          <select class="filter__select-input" id="filter__provider" v-model="filter.filter1" @change="filterSubmit">
            <option value="">All</option>
            <option v-for="(item, idx) in filterList" :key="idx" :value="item.value">{{ item.label }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="filter__sort">
       <label class="filter__label filter__sort-label" for="filter__sort">Sort</label>
       <select class="filter__sort-input" id="filter__sort" v-model="filter.sort" @change="filterSubmit">
         <option value="asc">Sort (A-Z)</option>
         <option value="desc">Sort (Z-A)</option>
       </select>
    </div>
  </form>
</template>

<script>
export default {
  name: 'FormFilter',
  components: {},
  props: {
    providerList: Array,
    initialValues: Object,
    filterList: Array
  },
  data () {
    return {
      filter: {
        keywords: this.initialValues.keywords,
        filter1: this.initialValues.filter1,
        sort: this.initialValues.sort
      }
    }
  },
  methods: {
    filterQuickChange () {
      this.$emit('filterQuickChange', this.filter)
    },
    filterSubmit () {
      this.$emit('filterSubmit', this.filter)
    }
  },
  watch: {
    initialValues (newVal) {
      if (newVal.keywords) {
        this.filter.keywords = newVal.keywords
      }
      if (newVal.filter1) {
        this.filter.filter1 = newVal.filter1
      }
      if (newVal.sort) {
        this.filter.sort = newVal.sort
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.filter {
  margin-bottom: rem(16px);
  max-width: none;

  &__first-line {
    @include breakpoint('m') {
      display: flex;
    }
  }

  &__field {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-bottom: rem(16px);

    @include breakpoint('m') {
      margin-left: rem(22px);
      margin-bottom: 0;
    }

    select,
    input {
      @include focus;
      width: 100%;
      box-sizing: border-box;
    }

    &:first-child {
      margin-left: 0;
    }
  }

  &__keyword {
    @include breakpoint('m') {
      width: 75%;
    }
  }

  &__dropdown {
    @include breakpoint('m') {
      width: 25%;
    }
  }

  &__label {
    font-size: rem(16px);
    line-height: rem(24px);
    font-weight: 500;
    margin-bottom: rem(8px);
    color: $text-color;
    display: block;
    width: 100%;
  }

  &__input {
    @include font;
    background-color: transparent;
    appearance: none;
    padding: rem(16px) rem(48px) rem(16px) rem(21px);
    font-size: rem(16px);
    font-weight: 500;
    line-height: 1.3em;
    color: $text-color;
    border-radius: rem(3px);
    border: rem(1px) solid $border-color;

    &::placeholder {
      font-size: rem(16px);
      color: $text-color;
    }
  }

  &__keyword-label {
    @include visually_hidden;
  }

  &__keyword-input {
    background-image: url('../assets/search.svg');
    background-repeat: no-repeat;
    background-position: center right rem(19px);
  }

  &__sort-label {
    @include visually_hidden;
  }

  &__sort {
    margin-top: rem(28px);
    text-align: right;
  }

  &__sort-input {
    @include font;
    @include focus;
    @include underline;
    display: inline;
    background-color: transparent;
    color: $text-color;
    border: 0;
    font-size: rem(16px);
    font-weight: 600;
    appearance: none;
    cursor: pointer;
    background-image: url('../assets/down-arrow.svg');
    background-repeat: no-repeat;
    background-position: center right rem(5px);
    padding-right: rem(24px);

    &::-ms-expand {
      display: none;
    }
  }

  &__input-select-wrapper {
    border-radius: rem(3px);
    border: rem(1px) solid $border-color;
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__select-input {
    @include font;
    background-color: transparent;
    appearance: none;
    border: 0;
    margin: 0;
    font-size: rem(16px);
    font-weight: 500;
    line-height: 1.3em;
    color: $text-color;
    background-image: url('../assets/down-arrow.svg');
    background-repeat: no-repeat;
    background-position: center right rem(11px);
    padding: rem(16px) rem(32px) rem(16px) rem(11px);
    cursor: pointer;

    &::-ms-expand {
      display: none;
    }
  }
}

</style>
