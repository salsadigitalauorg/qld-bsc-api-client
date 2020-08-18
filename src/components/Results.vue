<template>
  <div>
    <ul v-if="list.length > 0" class="result">
      <li v-for="(item, index) in list" :key="index" class="result__item">
        <h3 class="result__item-title">
          <button
            @click="toggleExpand(index)"
            class="result__item-title-button"
            :class="{ 'result__item-title-button--expanded': expanded[index] }"
          >
            <span>{{ item.name }}</span>
            <span v-if="item.interactions.length > 0"> ({{ item.interactions.length }} service {{ item.interactions.length === 1 ? 'interaction' : 'interactions' }})</span>
          </button>
        </h3>
        <div v-if="expanded[index]">
          <template v-if="item.id >= 0">
            <h4>Service</h4>
            <div class="result__service">
              <p>{{ item.description }}</p>
              <button @click="selected(item)" class="btn btn--small">Read more about {{ item.name.toLowerCase() }}</button>
            </div>
          </template>
          <h4>Service interactions</h4>
          <p v-if="item.interactions.length === 0" class="result__service">No service interactions available.</p>
          <ol v-else class="result__interactions">
            <li class="result__interaction" v-for="(sInteraction, siIndex) in item.interactions" :key="`service-${index}-${siIndex}`">
              <div class="result__interaction-cell result__interaction-cell--first">
                <h4 class="result__interaction-title">
                  <button @click="selected(sInteraction)" class="btn btn--small">{{ sInteraction.name }}</button>
                </h4>
              </div>
              <div class="result__interaction-cell result__interaction-cell--last">
                <span>{{ sInteraction.description }}</span>
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
  margin-top: rem(22px);

  &__item {
    box-sizing: border-box;
    border: rem(1px) solid $border-color;
    padding: rem(16px) rem(20px);
    margin-bottom: rem(16px);
  }

  &__item-title {
    margin: 0;
  }

  &__item-title-button {
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
      color: $blue;
    }

    &--expanded {
      background-image: url('../assets/up-arrow.svg');
    }
  }

  &__service {
    margin-left: rem(16px);
  }

  &__interactions {
    padding: 0;
  }

  &__interaction {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: rem(16px);

    &:nth-child(2n + 1) {
      background-color: $input-background;
    }
  }

  &__interaction-cell {
    margin: 0;
    margin-bottom: rem(16px);

    @include breakpoint('m') {
      margin: 0 rem(4px) 0;
    }

    &--first {
      @include breakpoint('m') {
        width: 50%;
      }
    }

    &--last {
      @include breakpoint('m') {
        width: 40%;
      }
    }
  }

  &__interaction-title {
    margin: 0;
  }

  &__no-items {
    font-size: rem(24px);
    color: $text-color;
  }
}
</style>
