<template>
  <div class="profile">
    <div
      class="profile__image"
      :class="{
        'profile__image--middle-remote': (profile === 'middle-remote'),
        'profile__image--middle-regional': (profile === 'middle-regional'),
        'profile__image--senior': (profile === 'senior'),
        'profile__image--custom': (profile === 'custom')
      }"
    >
    </div>
    <h1 class="profile__title">Select a profile</h1>
    <div class="filter__input-select-wrapper">
      <select class="filter__select-input" v-model="profile" @change="updateForm">
        <option value="">None</option>
        <option value="middle-remote">Middle Aged - Remote</option>
        <option value="middle-regional">Middle Aged - Regional</option>
        <option value="senior">Senior</option>
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
              <option v-for="(option, fieldId) in field.options" :value="option" :key="`field-${idx}-${fieldId}`">{{ option }}</option>
            </select>
          </div>
        </label>
      </div>
    </div>
    <button v-if="profile" @click="submit" class="btn">See the results</button>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      profile: '',
      form: [
        {
          label: 'Lifestage',
          value: '',
          name: 'lifestage',
          options: [
            'Student',
            'Apprentice or trainee',
            'Senior',
            'Unemployed or looking for work',
            'Working',
            'Queensland Business Owner',
            'Queensland Employer',
            'Dependent children',
            'Person with a disability',
            'Volunteer',
            'Aboriginal or Torres Strait Islander',
            'Carer'
          ]
        },
        {
          label: 'Authentication level',
          value: '',
          name: 'auth',
          options: [
            'None',
            'Level 1',
            'Level 2',
            'Level 2.5'
          ]
        },
        {
          label: 'Location',
          value: '',
          name: 'loc',
          options: [
            'Regional',
            'Remote',
            'SE',
            'Any'
          ]
        },
        {
          label: 'Age',
          value: '',
          name: 'age',
          options: [
            '15 or older',
            '16 or older',
            '17 or older',
            '18 or older',
            '55 or older',
            '60 or older',
            '65 or older'
          ]
        },
        {
          label: 'Residency status',
          value: '',
          name: 'residency',
          options: [
            'Queensland Resident',
            'Australian Citizen',
            'Holder Permanent Resident Visa',
            'Holder of a Permanent Protection Visa (Class XA)',
            'Have a Bridging Visa and have applied for Permanent Protection Visa (class XA)',
            'Holder of a Temporary Protection Visa (TPV)',
            'Applied for Permanent Residency',
            'Have a Bridging Visa and are being processed for Resolution of Status Visa (subclass 851)',
            'Hold a current New Zealand Passport',
            'None of the above'
          ]
        },
        {
          label: 'Housing',
          value: '',
          name: 'housing',
          options: [
            'Homeowner',
            'Renter',
            'Public housing tenant',
            'Landowner'
          ]
        },
        {
          label: 'Card, licenses and permits',
          value: '',
          name: 'permits',
          options: [
            'Commonwealth Health Care Card',
            'Commonwealth Pensioner Concession Card',
            'Seniors Card',
            'Disability Parking Permit',
            'Department of Veterans’ Affairs (DVA) Gold Card',
            'Qld drivers licence (any)',
            'Qld Marine licence',
            'Qld motorcycle licence',
            'QLD industry Authority',
            'Qld Adult proof of age',
            'QLD vehicle registration',
            'QLD boat registration',
            'Assistance animal pass',
            'Vision Impairment Travel Pass ',
            'Working with Children card',
            'Caravan or trailer registration',
            'Translink access pass',
            'Go access travel trainer card',
            'Student special program pass',
            'Go card (any)',
            'Medicare',
            'Electrical work licence'
          ]
        },
        {
          label: 'Business sector',
          value: '',
          name: 'sector',
          options: [
            'Farms, fishing and forestry',
            'Manufacturing',
            'Retail and wholesale',
            'Food, beverage and catering',
            'Tourism',
            'Healthcare',
            'Liquor and gaming',
            'Mining, energy and water',
            'Building, property and development',
            'Transport and logistics',
            'Science and research',
            'Information and communication technology (ICT)',
            'Creative industries',
            'Regulated industries',
            'Professional and financial services',
            'Charity or community association'
          ]
        }
      ],
      profileForms: {
        'middle-remote': [
          'Working',
          'Level 1',
          'Remote',
          '18 or older',
          'None of the above',
          'Renter',
          'Working with Children card',
          'Science and research'
        ],
        'middle-regional': [
          'Working',
          'None',
          'Regional',
          '18 or older',
          'Australian Citizen',
          'Homeowner',
          'Medicare',
          'Transport and logistics'
        ],
        'senior': [
          'Senior',
          'None',
          'SE',
          '60 or older',
          'Australian Citizen',
          'Homeowner',
          'Seniors Card',
          'Charity or community association'
        ]
      }
    }
  },
  methods: {
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
        this.form.forEach(item => query[item.name] = item.value)
        this.$router.push({ name: 'results', query })
        window.scrollTo(0, 0)
      }
    }
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
</style>
