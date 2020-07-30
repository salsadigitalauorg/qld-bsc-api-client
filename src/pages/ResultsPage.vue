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
import localDataset from '../assets/dataset.json'
import axios from 'axios'
import FormFilter from '../components/FormFilter'
import Results from '../components/Results'
import FullView from '../components/FullView'
import Error from '../components/Error'

// Flags
const ID_FIELD = 'id'
const DISPLAY_NAME_FIELD = 'service_interaction_name'

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
      remoteUrl: '',
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
        const groups = {}
        this.dataset.forEach((item, index) => {
          // Get unique services.
          if (groups[item.service_name] === undefined) {
            groups[item.service_name] = {
              title: item.service_name,
              description: '',
              serviceInteractions: []
            }
          }
          // Find the description matching the service.
          if (groups[item.service_name].description === '' && item.service_interaction_name === '') {
            groups[item.service_name].id = index.toString()
            groups[item.service_name].description = item.short_description
          }
          // Add service interactions
          if (item.service_interaction_name !== '') {
            groups[item.service_name].serviceInteractions.push({
              id: index.toString(),
              title: item.service_interaction_name,
              description: item.short_description,
              keywordSearch: item.service_interaction_name.toUpperCase(),
              dataEntry: item
            })
          }
        })
        Object.keys(groups).forEach(group => {
          // Filter & sort interactions.
          groups[group].serviceInteractions = this.filterList(groups[group].serviceInteractions)
          this.sortList(groups[group].serviceInteractions, 'title')
          // Move group into array.
          groupedList.push(groups[group])
        })
      }
      this.sortList(groupedList, 'title')
      return groupedList
    },
    processedList () {
      let curatedDataset = []
      if (this.dataset) {
        // Get all results
        for (let i = 0; i < this.dataset.length; i++) {
          const dataEntry = this.dataset[i]
          const displayName = dataEntry[DISPLAY_NAME_FIELD] || ''
          curatedDataset.push({
            id: i.toString(),
            displayName: displayName,
            keywordSearch: displayName.toUpperCase(),
            groupName: dataEntry['service_name'],
            title: displayName,
            description: dataEntry['short_description'],
            dataEntry: dataEntry
          })
        }
      }
      curatedDataset = this.filterList(curatedDataset)
      this.sortList(curatedDataset, 'displayName')
      return curatedDataset
    },
  },
  methods: {
    async getDataset () {
      if (this.useRemote) {
        const result = await axios(this.remoteUrl)
        return (result.status === 200 && result.data) ? result.data : false
      } else {
        return localDataset
      }
    },
    async load () {
      try {
        this.listingState = 'loading'
        const dataset = await this.getDataset()
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
        for (let i = 0; i < this.dataset.length; i++) {
          const item = this.dataset[i]
          if (i.toString() === query[ID_FIELD]) {
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
