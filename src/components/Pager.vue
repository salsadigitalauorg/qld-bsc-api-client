<template>
  <nav class="pager">
    <button v-if="current > 1" @click="prevPage" class="pager__prev">
      <span>Prev</span>
    </button>
    <ul class="pager__page-list">
      <li v-for="(item, index) in range" :key="index" class="pager__item">
        <span v-if="item === '...'" class="pager__item-dots">{{ item }}</span>
        <button v-else class="pager__item-btn" :class="{ 'pager__item-btn--current': (current === item) }" @click="change(item)">
          <span class="pager__hidden">Page: </span>
          <span class="pager__btn-text">{{ item }}</span>
        </button>
      </li>
    </ul>
    <button v-if="current < total" @click="nextPage" class="pager__next">
      <span class="pager__btn-text">Next</span>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'Pager',
  components: {},
  props: {
    initial: Number,
    perstep: Number,
    total: Number
  },
  data () {
    return {
      current: this.initial
    }
  },
  methods: {
    change (item) {
      this.current = item
      this.$emit('change', item)
    },
    prevPage () {
      this.change(this.current - 1)
    },
    nextPage () {
      this.change(this.current + 1)
    }
  },
  computed: {
    range () {
      const steps = []
      if (this.total > 6) {
        const c = this.current
        const t = this.total

        if (c > 2) {
          steps.push(1)
        }
        if (c > 3) {
          steps.push('...')
        }
        if (c === t) {
          steps.push(c - 2)
        }
        if (c > 1) {
          steps.push(c - 1)
        }
        steps.push(c)
        if (c + 1 < t) {
          steps.push(c + 1)
        }
        if (c === 1) {
          steps.push(3)
        }
        if (c < (t - 2)) {
          steps.push('...')
        }
        if (c < t) {
          steps.push(t)
        }
      } else {
        for (let i = 1; i <= this.total; i++) {
          steps.push(i)
        }
      }
      return steps
    }
  },
  watch: {
    initial (newVal) {
      this.current = newVal
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.pager {
  margin-top: rem(22px);
  display: flex;
  align-items: center;

  &__page-list {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
  }

  &__hidden {
    @include visually_hidden;
  }

  &__prev {
    margin-right: rem(22px);
  }

  &__next {
    margin-left: rem(22px);
  }

  &__prev,
  &__next {
    @include focus;
    background-color: transparent;
    border: 0;
    cursor: pointer;

    span {
      font-size: rem(18px);
      font-weight: 600;
      color: $text-color;
      @include underline;
    }
  }

  &__item-dots {
    font-size: rem(18px);
    color: $text-color;
  }

  &__item-btn {
    @include focus;
    background-color: transparent;
    border: 0;
    cursor: pointer;

    &--current {
      .pager__btn-text {
        color: $blue;
        text-decoration: none;
      }
    }
  }

  &__btn-text {
    font-size: rem(18px);
    font-weight: 600;
    color: $text-color;
    @include underline;
  }
}
</style>
