<template>
  <div class="profile">
    <h1>Select a profile</h1>
    <div class="filter__input-select-wrapper">
      <select class="filter__select-input" v-model="profile">
        <option value="">None</option>
        <option value="youth">Youth</option>
        <option value="middle">Middle Aged</option>
        <option value="senior">Senior</option>
      </select>
    </div>
    <button @click="submit" class="btn">See the results</button>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      profile: ''
    }
  },
  methods: {
    submit () {
      if (this.profile.length > 0) {
        this.$router.push({ name: 'results', params: { profId: this.profile } })
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.profile {
  text-align: center;

  .filter__input-select-wrapper {
    margin: auto;
  }

  .filter__input-select-wrapper,
  .filter__select-input {
    width: rem(200px);
  }

  .btn {
    margin-top: 22px;
    @include focus;
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: rem(18px);
    font-weight: 600;
    color: $text-color;
    @include underline;

    &::after {
      @include arrow_icon_pe(false);
    }
  }
}
</style>
