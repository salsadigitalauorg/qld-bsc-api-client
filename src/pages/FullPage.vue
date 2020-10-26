<template>
  <div class="full-view">
    <button @click="back" class="btn--left">Back</button>
    <loading v-if="state === 'loading'" />
    <template v-if="state === 'display'">
      <div v-if="selected" class="full-view__body">
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
    </template>
    <error v-if="state === 'error'" @retry="load" />
    <div v-if="state === 'no-results'">
      <p>No results were returned.</p>
    </div>
  </div>
</template>

<script>
import dataservice from '../libs/dataservice'
import Error from '../components/Error'
import Loading from '../components/Loading'

export default {
  name: 'FullPage',
  components: {
    Error,
    Loading
  },
  data () {
    return {
      state: 'loading',
      selected: null,
      fields: [
        { title: 'Description', field: 'long_description' },
        { title: 'Who is eligible?', field: 'who_is_eligible' },
        { title: 'What you will need', field: 'prerequisites' },
        { title: 'How to', field: 'how_to' },
        { title: 'Fees', field: 'fees', type: 'url'},
        { title: 'Do it online', field: 'do_it_online_url', type: 'url'},
        { title: 'More information', field: 'more_information_url', type: 'url'},
        { title: 'Form', field: 'form_url', type: 'url'},
        { title: 'Who do I call?', field: 'who_do_i_call' },
        { title: 'Message applied', field: 'message_applied' },
        { title: 'Message problem', field: 'message_problem' },
        { title: 'Message progress', field: 'message_progress' },
        { title: 'Message provisioned', field: 'message_provisioned' }
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
      this.$router.go(-1)
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
    },
    async load () {
      try {
        this.state = 'loading'
        const result = await dataservice.getFullServiceInteraction(this.$route.params.id)
        if (result) {
          this.selected = result
          this.state = 'display'
        } else {
          this.state = 'no-results'
        }
      } catch (e) {
        console.log(e)
        this.state = 'error'
      }
    },
  },
  created () {
    this.load()
  },
}
</script>

<style lang="scss">
@import '../styles/variables';

.full-view {
  &__back {
    @include button_base(false);
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
      @include content_link;
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
      @include content_link;
    }
  }

  &__side-group {
    margin-bottom: rem(22px);
  }

  &__side-field {
    margin-bottom: rem(8px);
  }

  &__title {
    color: $text-color;
    font-size: rem(24px);
    font-weight: 600;
  }
}
</style>
