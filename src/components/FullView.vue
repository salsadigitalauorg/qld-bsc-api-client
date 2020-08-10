<template>
  <div class="full-view">
    <button @click="back" class="full-view__back">Back</button>
    <div class="full-view__body">
      <div class="full-view__main">
        <h1 class="full-view__title">{{ selected.name }}</h1>
        <div v-for="(item, idx) in displayFields" :key="'body-' + idx">
          <h2>{{ item.title }}</h2>
          <p v-html="item.html"></p>
        </div>
      </div>
      <div class="full-view__sidebar">
        <div class="full-view__contact">
          <div class="full-view__side-group" v-for="(item, sideId) in displaySidebarGroups" :key="'contact-group-' + sideId">
            <h2 v-if="item.title">{{ item.title }}</h2>
            <div class="full-view__side-field" v-for="(field, fieldId) in item.fields" :key="'contact-group-' + sideId + '-' + fieldId">
              <strong>{{ field.title }}</strong>
              <p v-html="field.html"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Results',
  props: {
    selected: Object
  },
  data () {
    return {
      fields: [
        { title: 'Description', field: 'long_description' },
        { title: 'Who is eligible?', field: 'who_is_eligible' },
        { title: 'What you will need', field: 'prerequisites' },
        { title: 'How to', field: 'how_to' },
        { title: 'Fees', field: 'fees', type: 'url'},
        { title: 'Do it online', field: 'do_it_online_url', type: 'url'},
        { title: 'More information', field: 'more_information_url', type: 'url'},
        { title: 'Form', field: 'form_url', type: 'url'},
        { title: 'Who do I call?', field: 'who_do_i_call' }
      ],
      sidebarGroups: [
        {
          title: 'Agency',
          fields: [
            { title: 'Type', field: 'agency_type' },
            { title: 'Name', field: 'agency_name' },
            { title: 'Acronym', field: 'agency_acronym' },
            { title: 'Website', field: 'agency_website_url', type: 'url'}
          ]
        },
        {
          title: 'Service',
          fields: [
            { title: 'Business', field: 'business_unit_name' },
            { title: 'Owner', field: 'service_owner_name' },
            { title: 'Email', field: 'service_owner_email', type: 'email'}
          ]
        }
      ]
    }
  },
  computed: {
    displayFields () {
      const rendered = []
      this.fields.forEach(item => {
        const fieldHTML = this.parseField(item)
        if (fieldHTML) {
          rendered.push({ title: item.title, html: fieldHTML })
        }
      })
      return rendered
    },
    displaySidebarGroups () {
      const rendered = []
      this.sidebarGroups.forEach(item => {
        const fields = []
        item.fields.forEach(field => {
          const fieldHTML = this.parseField(field)
          if (fieldHTML) {
            fields.push({ title: field.title, html: fieldHTML })
          }
        })
        if (fields.length > 0) {
          rendered.push({ title: item.title, fields: fields })
        }
      })
      return rendered
    }
  },
  methods: {
    back () {
      this.$emit('back')
    },
    parseField(field) {
      if (this.selected[field.field]) {
        const fieldType = field.type ? field.type : 'text'
        let html = this.selected[field.field]
        switch (fieldType) {
          case 'text':
            // If field has <p> tag, assume it's HTML formatted & no <br> needed.
            if (html.indexOf('<p>') < 0) {
              html = html.replace(/\n/g, '<br/>')
            }
            break
          case 'url':
            if (html.indexOf('http') === 0) {
              html = `<a href="${html}">${html}</a>`
            }
            break
          case 'email':
            html = `<a href="mailto:${html}">${html}</a>`
            break
        }
        return html
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import '../styles/variables';

.full-view {
  &__back {
    @include focus;
    background-color: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: rem(18px);
    font-weight: 600;
    color: $text-color;
    @include underline;

    &::before {
      @include arrow_icon_pe(true);
    }
  }

  &__body {
    @include breakpoint('m') {
      display: flex;
    }
  }

  &__main {
    width: 100%;
    box-sizing: border-box;
    padding-right: rem(22px);

    @include breakpoint('m') {
      width: 8/12 * 100%;
    }

    a {
      color: $green;
    }
  }

  &__sidebar {
    width: 100%;

    @include breakpoint('m') {
      width: 4/12 * 100%;
    }
  }

  &__contact {
    padding: rem(22px);
    background-color: $input-background;
    width: 100%;
    box-sizing: border-box;

    h2 {
      margin-top: 0;
    }

    p {
      margin: 0;
    }

    a {
      color: $green;
    }
  }

  &__side-group {
    margin-bottom: rem(22px);
  }

  &__side-field {
    margin-bottom: rem(8px);
  }

  &__top-details {
    margin-top: rem(32px);
    margin-bottom: rem(32px);
  }

  &__row {
    @include breakpoint(m) {
      display: flex;
    }
  }

  &__logo-wrapper {
    @include breakpoint(m) {
      margin-right: rem(32px);
    }
  }

  &__logo {
    width: 100%;
    max-width: rem(320px) !important;
  }

  &__brands-image {
    width: 100%;
    max-width: rem(320px) !important;
  }

  &__title {
    color: $text-color;
    font-size: rem(24px);
    font-weight: 600;
  }

  &__details {
    color: $text-color;

    @include breakpoint(s) {
      display: table;
    }
  }

  &__detail {
    margin-bottom: rem(16px);

    @include breakpoint(s) {
      display: table-row;
      margin-bottom: 0;
    }
  }

  &__detail-title {
    color: $text-color;
    font-size: rem(18px) !important;
    font-weight: 600 !important;
    margin: 0 !important;

    @include breakpoint(s) {
      display: table-cell;
      padding: rem(8px) rem(22px) rem(8px) 0;
    }
  }

  &__detail-detail {
    font-size: rem(18px) !important;
    color: $text-color;
    margin: 0 !important;

    @include breakpoint(s) {
      display: table-cell;
      padding: rem(8px) 0;
    }
  }

  &__detail-link {
    @include focus;
    @include underline;
    font-size: rem(18px) !important;
    color: $text-color;
  }

  &__detail-list {
    padding: 0;
    list-style: none;
    margin: 0;
  }

  &__detail-list-item {
    margin-bottom: rem(16px);
  }

  &__brand-title {
    color: $text-color;
    font-size: rem(24px);
    font-weight: 600;
    margin: 0;
    margin-bottom: rem(16px) !important;
  }

  &__brand-setion {
    background-color: $brand-back;
    padding: rem(64px) rem(20px);
    margin: rem(16px) 0;
  }

  &__brands-wrapper {
    background-color: white;
    padding: rem(20px);
  }

  &__brands {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__brands-item {
    box-sizing: border-box;
    margin-bottom: rem(16px);

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__brands-title {
    color: $text-color;
    font-size: rem(18px) !important;
    margin: 0;
  }

  &__brands-description {
    color: $text-color;
    margin: 0;
  }

  &__brands-status {
    color: $text-color;
  }
}
</style>
