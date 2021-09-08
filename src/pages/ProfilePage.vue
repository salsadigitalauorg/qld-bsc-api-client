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
      <div class="input__select-wrapper">
        <select class="input__select" v-model="profile" @change="updateForm">
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
            <span class="input__label">{{ field.label }}</span>
            <div class="input__select-wrapper">
              <select class="input__select" v-model="field.value">
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
      <p>A network error occurred connecting to the API.</p>
    </div>
  </div>
</template>

<script>
import dataservice from '../libs/dataservice'
import settings from '../libs/settings'
import criteria from '../libs/criteria'

export default {
  name: 'ProfilePage',
  data () {
    return {
      networkError: false,
      profile: '',
      fieldMap: criteria.getCriteriaFields(),
      profileForms: {
        'middle-remote': {
          age: '6'
        },
        'middle-regional': {
          lifestage: '63'
        },
        'senior': {
          age: '8'
        },
        'renter': {
          housing: '53',
          residency: '73'
        },
      },
      form: []
    }
  },
  computed: {
    isDev () {
      return (this.$route.query.dev && this.$route.query.dev === 'true')
    }
  },
  methods: {
    async load () {
      try {
        const domain = this.isDev ? settings.domain.dev : settings.domain.master
        const results = await dataservice.getCriteria(domain)
        Object.keys(results).forEach(key => {
          const criteria = results[key]
          const field = this.fieldMap[key]
          if (field) {
            const defaultId = this.getAnyId(criteria)
            this.form.push({
              label: field.label,
              value: defaultId,
              name: field.queryName,
              options: criteria,
            })
          }
        })
      } catch (e) {
        console.log(e)
        this.networkError = true
      }
    },
    getAnyId (options) {
      const defaultCriterion = options.find(criterion => criterion.name === 'Any')
      return defaultCriterion ? defaultCriterion.id : ''
    },
    updateForm () {
      if (this.profile !== '') {
        const isCustom = (this.profile === 'custom')
        this.form.forEach(field => {
          if (!isCustom && this.profileForms[this.profile][field.name]) {
            field.value = this.profileForms[this.profile][field.name]
          } else {
            field.value = this.getAnyId(field.options)
          }
        })
      }
    },
    submit () {
      if (this.profile.length > 0) {
        const query = {}
        this.form.forEach(field => {
          const anyId = this.getAnyId(field.options)
          if (field.value !== anyId) {
            query[field.name] = [anyId, field.value]
          }
        })
        if (this.isDev) {
          query['dev'] = 'true'
        }
        this.$router.push({ name: 'results', query })
        console.log(query)
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
    border: rem(2px) solid $blue;
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

  .btn {
    margin-top: rem(22px);
  }
}

.input {
  &__label {
    display: block;
    text-align: left;
  }

  &__select-wrapper {
    border-radius: rem(3px);
    border: rem(1px) solid $border-color;
    margin-bottom: rem(44px);
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__select {
    @include font;
    background-color: transparent;
    appearance: none;
    border: 0;
    margin: 0;
    font-size: rem(16px);
    font-weight: 500;
    width: 100%;
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
