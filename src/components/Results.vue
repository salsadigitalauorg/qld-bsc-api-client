<template>
  <div>
    <ul v-if="list.length > 0" class="result">
      <li v-for="(item, index) in list" :key="index" class="result__list-item">
        <h3 class="result__list-item-title">
          <button
            @click="toggleExpand(index)"
            class="result__list-item-title-button"
            :class="{ 'result__list-item-title-button--expanded': expanded[index] }"
          >
            <span>{{ item.title }}</span>
            <span> ({{ item.serviceInteractions.length }} service {{ item.serviceInteractions.length === 1 ? 'interaction' : 'interactions' }})</span>
          </button>
        </h3>
        <div v-if="expanded[index]">
          <template v-if="item.id >= 0">
            <h4>Service</h4>
            <div class="result__sub-paragraph">
              <p>{{ item.description }}</p>
              <button @click="selected(item)" class="result__subitem-field-title-button">Read more about {{ item.title.toLowerCase() }}</button>
            </div>
          </template>
          <h4>Service interactions</h4>
          <p v-if="item.serviceInteractions.length === 0" class="result__sub-paragraph">No service interactions available.</p>
          <ol v-else class="result__subitems">
            <li class="result__subitem" v-for="(sInteraction, siIndex) in item.serviceInteractions" :key="`service-${index}-${siIndex}`">
              <div class="result__subitem-field result__subitem-field-1">
                <h4 class="result__subitem-field-title">
                  <button @click="selected(sInteraction)" class="result__subitem-field-title-button">{{ sInteraction.title }}</button>
                </h4>
              </div>
              <div class="result__subitem-field result__subitem-field-2">
                <span class="result__subitem-field-description">{{ sInteraction.description }}</span>
              </div>
            </li>
          </ol>
        </div>
      </li>
    </ul>
    <div v-else class="result__no-items">Sorry we could not find any results</div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Results',
  components: {},
  props: {
    list: Array
  },
  data () {
    return {
      expanded: this.list.map(() => { return false })
    }
  },
  methods: {
    selected (item) {
      this.$emit('selected', item)
    },
    toggleExpand (index) {
      this.expanded[index] = Vue.set(this.expanded, index, !this.expanded[index])
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

  &__list-item {
    box-sizing: border-box;
    border: rem(1px) solid $border-color;
    padding: rem(16px) rem(20px);
    margin-bottom: rem(16px);
  }

  &__list-item-title {
    margin: 0;
  }

  &__list-item-title-button {
    @include focus;
    display: block;
    width: 100%;
    color: $text-color;
    font-size: rem(18px);
    line-height: 1.2em;
    font-weight: 600;
    background-color: transparent;
    border: 0;
    padding: 0;
    padding: rem(12px) rem(24px) rem(12px) 0;
    text-align: left;
    cursor: pointer;
    background-image: url('../assets/down-arrow.svg');
    background-repeat: no-repeat;
    background-position: center right rem(5px);

    &:hover {
      color: $green;
    }

    &--expanded {
      background-image: url('../assets/up-arrow.svg');
    }
  }

  &__sub-paragraph {
    margin-left: rem(16px);
  }

  &__subitems {
    padding: 0;
  }

  &__subitem {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: rem(16px);

    &:nth-child(2n + 1) {
      background-color: $input-background;
    }
  }

  &__subitem-field {
    margin: 0;
    margin-bottom: rem(16px);

    @include breakpoint('m') {
      margin: 0 rem(4px) 0;
    }
  }

  &__subitem-field-1 {
    @include breakpoint('m') {
      width: 50%;
    }
  }

  &__subitem-field-2 {
    @include breakpoint('m') {
      width: 40%;
    }
  }

  &__subitem-field-title {
    margin: 0;
  }

  &__subitem-field-title-button {
    @include underline;
    @include focus;
    display: inline;
    color: $text-color;
    font-size: rem(16px);
    line-height: 1.2em;
    font-weight: 400;
    background-color: transparent;
    border: 0;
    padding: 0;
    text-align: left;
    cursor: pointer;

    &::after {
      @include arrow_icon_pe(false);
    }
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
