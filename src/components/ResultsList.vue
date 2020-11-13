<template>
  <div>
    <table v-if="list.length > 0" class="result">
      <thead>
        <tr>
          <th class="result__head-cell" aria-label="Item number">#</th>
          <th class="result__head-cell">Interaction</th>
          <th class="result__head-cell">Description</th>
          <th class="result__head-cell">Service</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(interactionGroup, idx) in interactionList" :key="idx" class="result__row">
          <td class="result__cell">
            {{ interactionGroup.count }}
          </td>
          <td class="result__cell">
            <button @click="selected(interactionGroup.interaction)" class="btn btn--small">{{ interactionGroup.interaction.name }}</button>
          </td>
          <td class="result__cell">
            <span>{{ interactionGroup.interaction.description }}</span>
          </td>
          <td class="result__cell">
            <button @click="selected(interactionGroup.service)" class="btn btn--small">{{ interactionGroup.service.name }}</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="result__no-items">Sorry we could not find any results</div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  components: {},
  props: {
    list: Array,
    startCountAt: Number
  },
  computed: {
    interactionList () {
      const allInteractions = []
      this.list.forEach(service => {
        service.interactions.forEach(interaction => {
          allInteractions.push({
            count: this.startCountAt + allInteractions.length,
            interaction,
            service
          })
        })
      })
      return allInteractions
    }
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
  margin-top: rem(22px);
  border-collapse: collapse;

  &__row {
    &:nth-child(2n + 1) {
      background-color: $input-background;
    }
  }

  &__head-cell {
    text-align: left;
    padding: rem(12px) rem(8px);
  }

  &__cell {
    margin: 0;
    padding: rem(12px) rem(8px);
    margin-bottom: rem(16px);
    vertical-align: top;

    @include breakpoint('m') {
      margin: 0 rem(4px) 0;
    }

    &:nth-child(n + 1) {
      width: 5%;
    }

    &:nth-child(n + 2) {
      width: 25%;
    }

    &:nth-child(n + 3) {
      width: 40%;
    }

    &:nth-child(n + 4) {
      width: 30%;
    }
  }

  &__no-items {
    font-size: rem(24px);
    color: $text-color;
  }
}
</style>
