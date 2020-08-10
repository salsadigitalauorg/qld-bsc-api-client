<template>
  <div ref="app">
    <div v-if="state === 'listing'">
      <button @click="backToProfile" class="full-view__back">Back</button>
      <div v-if="listingState === 'loading'">
        <p class="find-a-provider__message">Loading...</p>
      </div>
      <template v-if="listingState === 'display'">
        <form-filter :initialValues="filters" @filterSubmit="filterSubmit" @filterQuickChange="filterQuickChange" />
        <results :list="serviceList" @selected="selectedResult"/>
      </template>
      <error v-if="listingState === 'error'" @retry="load" />
    </div>
    <div v-if="state === 'full'">
      <full-view :selected="selected" @back="backToResults" />
    </div>
  </div>
</template>

<script>
import localServicesData from '../assets/api_services.json'
import api from '../libs/api'
import FormFilter from '../components/FormFilter'
import Results from '../components/Results'
import FullView from '../components/FullView'
import Error from '../components/Error'

// Flags
const ID_FIELD = 'id'

export default {
  name: 'ResultsPage',
  components: {
    FormFilter,
    Results,
    FullView,
    Error
  },
  data () {
    return {
      useRemote: false,
      dataset: null,
      filters: {
        keywords: null
      },
      state: 'listing',
      listingState: 'loading',
      selected: null,
      pageTitle: null
    }
  },
  computed: {
    serviceList () {
      const groupedList = []
      if (this.dataset) {
        // Get service groups.
        const groups = api.getServiceGroups(this.dataset)
        Object.keys(groups).forEach(group => {
          groups[group].serviceInteractions = this.filterList(groups[group].serviceInteractions)
          this.sortList(groups[group].serviceInteractions, 'title')
          groupedList.push(groups[group])
        })
      }
      this.sortList(groupedList, 'title')
      return groupedList
    }
  },
  methods: {
    async loadDataset () {
      if (this.useRemote) {
        const result = await api.getServices()
        return result
      } else {
        return localServicesData
      }
    },
    async load () {
      try {
        this.listingState = 'loading'
        const dataset = await this.loadDataset()
        if (dataset) {
          this.dataset = dataset

          // Set state
          this.listingState = 'display'
          this.setState(this.$route.query)
        } else {
          this.listingState = 'error'
        }
      } catch (e) {
        console.log(e)
        this.listingState = 'error'
      }
    },
    filterQuickChange (filters) {
      this.filters.keywords = filters.keywords
    },
    getCleanQuery () {
      const q = JSON.parse(JSON.stringify(this.$route.query))
      // Strip out filter related
      const strip_fields = ['q', 'id']
      strip_fields.forEach(field => delete q[field])
      return q
    },
    filterSubmit (filters) {
      const query = this.getCleanQuery()
      if (filters.keywords && filters.keywords.length > 0) {
        query.q = encodeURIComponent(filters.keywords)
      }
      // Update router if query has changed.
      if (JSON.stringify(this.$route.query) !== JSON.stringify(query)) {
        this.$router.push({ query: query })
      }
    },
    selectedResult (result) {
      window.scrollTo(0, 0)
      const query = this.getCleanQuery()
      query['id'] = result.id
      this.$router.push({ query })
    },
    backToResults () {
      this.$router.push({ query: this.getCleanQuery() })
    },
    backToProfile () {
      this.$router.push({ path: '/' })
    },
    filterList (list) {
      const hasFilters = (this.filters.keywords)
      if (hasFilters) {
        const returnList = []
        const keywords = this.filters.keywords ? this.filters.keywords.toUpperCase() : false
        list.forEach(item => {
          let tests = []
          // Keyword
          if (keywords) {
            tests.push((item.keywordSearch.indexOf(keywords) > -1))
          }
          const hasPassed = tests.every(pass => pass === true)
          if (hasPassed) {
            returnList.push(item)
          }
        })
        return returnList
      } else {
        return list
      }
    },
    sortList (list, name) {
      list = list.sort((a, b) => a[name].localeCompare(b[name]))
      return list
    },
    setState (query) {
      if (query[ID_FIELD]) {
        let result = null
        // Find query string service and set as selected.
        for (let i = 0; i < this.dataset.services.length; i++) {
          const item = this.dataset.services[i]
          if (item.id === query[ID_FIELD]) {
            result = item
            break
          }
        }
        if (result) {
          this.state = 'full'
          this.selected = result
        }
      } else {
        this.state = 'listing'
        this.selected = null
        // Filter
        this.filters.keywords = (query.q) ? decodeURIComponent(query.q) : ''
      }
    }
  },
  created () {
    this.load()
  },
  watch: {
    $route: function (to) {
      this.setState(to.query)
    }
  }
}
</script>
