<template>
  <div class="profile">
    <div class="profile__image">
      <img v-if="profile === 'youth'" src="../assets/youth.png" alt="" />
      <img v-if="profile === 'middle'" src="../assets/middle-aged.png" alt="" />
      <img v-if="profile === 'senior'" src="../assets/senior.png" alt="" />
      <img v-if="profile === 'custom'" src="../assets/custom.png" alt="" />
    </div>
    <h1 class="profile__title">Select a profile</h1>
    <div class="filter__input-select-wrapper">
      <select class="filter__select-input" v-model="profile" @change="updateForm">
        <option value="">None</option>
        <option value="youth">Youth</option>
        <option value="middle">Middle Aged</option>
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
          <input class="profile__form-field-input filter__input" type="text" v-model="field.value" />
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
        { label: 'Lifestage', value: '', type: '' , name: 'lifestage' },
        { label: 'Authentication level', value: '', type: '' , name: 'auth' },
        { label: 'Location', value: '', type: '' , name: 'loc' },
        { label: 'Age', value: '', type: '' , name: 'age' },
        { label: 'Residency status', value: '', type: '' , name: 'residency' },
        { label: 'Housing', value: '', type: '' , name: 'housing' },
        { label: 'Card, licenses and permits', value: '', type: '' , name: 'permits' },
        { label: 'Business sector', value: '', type: '', name: 'sector' }
      ],
      profileForms: {
        'youth': ['University', '0', 'Brisbane', '19', 'Studying visa', 'Apartment', 'Drivers license', 'None'],
        'middle': ['Employed', '1', 'Goldcoast', '35', 'Citizen', 'House', 'Drivers license', 'White-collar'],
        'senior': ['Retired', '2', 'Cairns', '65', 'Permanent Resident', 'House', 'Drivers license', 'None']
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
    border: 2px solid $green;
    width: rem(150px);
    height: rem(150px);
    margin: 0 auto rem(22px);

    img {
      width: 150px;
      height: 150px;
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
