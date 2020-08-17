<template>
  <div class="profile">
    <div v-if="!networkError">
      <div
        class="profile__image"
        :class="{
          'profile__image--middle-remote': (profile === 'middle-remote'),
          'profile__image--middle-regional': (profile === 'middle-regional'),
          'profile__image--senior': (profile === 'senior'),
          'profile__image--renter': (profile === 'renter'),
          'profile__image--custom': (profile === 'custom')
        }"
      >
      </div>
      <h1 class="profile__title">Select a profile</h1>
      <div class="filter__input-select-wrapper">
        <select class="filter__select-input" v-model="profile" @change="updateForm">
          <option value="">None</option>
          <option value="middle-remote">Middle Aged - Country</option>
          <option value="middle-regional">Middle Aged - City</option>
          <option value="senior">Senior</option>
          <option value="renter">Aussie Renter</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <div class="profile__form" v-if="profile">
        <p v-if="profile === 'custom'">Please fill out the following form to get a list of available services.</p>
        <p v-else>This profile uses the following values to get a list of available services.</p>
        <div v-for="(field, idx) in form" :key="idx">
          <label>
            <span class="profile__form-field-label filter__label">{{ field.label }}</span>
            <div class="filter__input-select-wrapper">
              <select class="filter__select-input" v-model="field.value">
                <option value=""></option>
                <option v-for="(option, fieldId) in field.options" :value="option.id" :key="`field-${idx}-${fieldId}`">{{ option.name }}</option>
              </select>
            </div>
          </label>
        </div>
      </div>
      <button v-if="profile" @click="submit" class="btn">See the results</button>
    </div>
    <div v-else>
      <h1>Network error</h1>
      <p>A network error occurred connecting to the API. This is likely a CORS issue.</p>
      <p>This can be resolved by using an extentions to bypass CORS (or by updating our API implementation).</p>
      <ul>
        <li><a class="btn" href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/" target="blank">Extension for Firefox</a></li>
        <li><a class="btn" href="https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai" target="blank">Extension for Chrome</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../libs/api'

export default {
  name: 'ProfilePage',
  data () {
    return {
      networkError: false,
      profile: '',
      fieldMap: api.getCriteriaFields(),
      profileForms: {
        'middle-remote': [
          '6',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        'middle-regional': [
          '',
          '',
          '',
          '',
          '',
          '63',
          '',
          ''
        ],
        'senior': [
          '8',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ],
        'renter': [
          '',
          '',
          '',
          '',
          '53',
          '',
          '',
          '73'
        ],
      },
      form: []
    }
  },
  methods: {
    async load () {
      try {
        const results = await api.loadCriteria()
        Object.keys(results).forEach(key => {
          const criteria = results[key]
          const field = this.fieldMap[key]
          this.form.push({
            label: field.label,
            value: '',
            name: field.queryName,
            options: criteria,
          })
        })
      } catch (e) {
        this.networkError = true
      }
    },
    updateForm () {
      if (this.profile !== '') {
        const isCustom = (this.profile === 'custom')
        this.form.forEach((item, index) => {
          item.value = isCustom ? '' : this.profileForms[this.profile][index]
        })
      }
    },
    submit () {
      if (this.profile.length > 0) {
        const query = {}
        this.form.forEach(item => {
          if (item.value) {
            query[item.name] = item.value
          }
        })
        this.$router.push({ name: 'results', query })
        window.scrollTo(0, 0)
      }
    }
  },
  created () {
    this.load()
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.profile {
  max-width: rem(500px);

  &__title {
    text-align: center;
  }

  &__image {
    border-radius: 100%;
    overflow: hidden;
    border: rem(2px) solid $green;
    width: rem(150px);
    height: rem(150px);
    margin: 0 auto rem(22px);
    background-size: cover;

    &--middle-remote {
      background-image: url('../assets/middle-remote.png');
    }

    &--middle-regional {
      background-image: url('../assets/middle-regional.png');
    }

    &--senior {
      background-image: url('../assets/senior.png');
    }

    &--renter {
      background-image: url('../assets/renter.png');
    }

    &--custom {
      background-image: url('../assets/custom.png');
    }
  }

  .filter__input-select-wrapper {
    margin-bottom: rem(44px);
  }

  .filter__input-select-wrapper,
  .filter__select-input {
    width: 100%;
  }

  &__form-field-label {
    display: block;
    text-align: left;
  }

  &__form-field-input {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: rem(12px);
  }

  .btn {
    margin-top: rem(22px);
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

// TODO - Refactor
.filter {
  margin-top: rem(22px);
  margin-bottom: rem(44px);
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
      width: 100%;
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
