<template>
  <div ref="app">
    <div v-if="state === 'listing'">
      <button @click="backToProfile" class="full-view__back">Back</button>
      <div v-if="listingState === 'loading'">
        <p class="find-a-provider__message">Loading...</p>
      </div>
      <template v-if="listingState === 'display'">
        <form-filter :filter-list="filter1List" :initialValues="filters" @filterSubmit="filterSubmit" @filterQuickChange="filterQuickChange" />
        <results :list="paginatedView" @selected="selectedResult"/>
        <pager v-if="totalSteps > 1" :initial="pager.currentStep" :perstep="pager.itemsPerStep" :total="totalSteps" @change="pagerChange"/>
      </template>
      <error v-if="listingState === 'error'" @retry="load" />
    </div>
    <div v-if="state === 'full'">
      <full-view :selected="selected.dataEntry" @back="backToResults" />
    </div>
  </div>
</template>

<script>
import localDataset from '../assets/dataset_blrga.json'
import axios from 'axios'
import FormFilter from '../components/FormFilter'
import Results from '../components/Results'
import Pager from '../components/Pager'
import FullView from '../components/FullView'
import Error from '../components/Error'

// Flags
const ID_FIELD = 'id'
const DISPLAY_NAME_FIELD = 'service_interaction_name'
const FILTER_FIELD = 'status'

export default {
  name: 'ResultsPage',
  components: {
    FormFilter,
    Results,
    Pager,
    FullView,
    Error
  },
  data () {
    return {
      remoteUrl: '',
      useRemote: false,
      dataset: null,
      filters: {
        keywords: null,
        filter1: null,
        sort: 'asc'
      },
      filter1List: null,
      pager: {
        currentStep: 1,
        itemsPerStep: 10
      },
      state: 'listing',
      listingState: 'loading',
      selected: null,
      pageTitle: null
    }
  },
  computed: {
    processedList () {
      let curatedDataset = []
      if (this.dataset) {
        for (let i = 0; i < this.dataset.length; i++) {
          const dataEntry = this.dataset[i]
          const displayName = dataEntry[DISPLAY_NAME_FIELD] || ''
          curatedDataset.push({
            id: i.toString(),
            displayName: displayName,
            keywordSearch: displayName.toUpperCase(),
            title: displayName,
            description: dataEntry['short_description'],
            filter1: dataEntry[FILTER_FIELD],
            dataEntry: dataEntry
          })
        }
        curatedDataset = this.filterList(curatedDataset)
        this.sortList(curatedDataset)
      }
      return curatedDataset
    },
    paginatedView () {
      const from = (this.pager.currentStep - 1) * this.pager.itemsPerStep
      const to = from + this.pager.itemsPerStep
      return this.processedList.slice(from, to)
    },
    totalSteps () {
      return Math.ceil(this.processedList.length / this.pager.itemsPerStep)
    }
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
          // Populate providers
          const filter1Set = new Set()
          this.dataset.forEach(item => {
            filter1Set.add(item[FILTER_FIELD])
          })
          this.filter1List = Array.from(filter1Set).map(item => ({ label: item, value: item }))
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
      this.pager.currentStep = 1
    },
    getCleanQuery () {
      const q = JSON.parse(JSON.stringify(this.$route.query))
      // Strip out filter related
      const strip_fields = ['q', FILTER_FIELD, 'sort', 'page', 'id']
      strip_fields.forEach(field => delete q[field])
      return q
    },
    filterSubmit (filters) {
      const query = this.getCleanQuery()
      if (filters.keywords && filters.keywords.length > 0) {
        query.q = encodeURIComponent(filters.keywords)
      }
      if (filters.filter1) {
        query[FILTER_FIELD] = encodeURIComponent(filters.filter1)
      }
      if (filters.sort && filters.sort !== 'asc') {
        query.sort = filters.sort
      }
      // Update router if query has changed.
      if (JSON.stringify(this.$route.query) !== JSON.stringify(query)) {
        this.$router.push({ query: query })
      }
    },
    pagerChange (page) {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      delete query['page']
      if (page > 1) {
        query['page'] = page
      }
      this.$router.push({ query })
      this.$nextTick(() => {
        this.$refs['app'].scrollIntoView({ behavior: 'smooth' })
      })
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
      const hasFilters = (this.filters.keywords || this.filters.filter1)
      if (hasFilters) {
        const returnList = []
        const keywords = this.filters.keywords ? this.filters.keywords.toUpperCase() : false
        const filter1 = this.filters.filter1 ? this.filters.filter1 : false
        list.forEach(item => {
          let tests = []
          // Keyword
          if (keywords) {
            tests.push((item.keywordSearch.indexOf(keywords) > -1))
          }
          // Filter 1
          if (filter1) {
            tests.push((item.filter1 === filter1))
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
    sortList (list) {
      if (this.filters.sort) {
        if (this.filters.sort === 'asc') {
          list = list.sort((a, b) => a.displayName.localeCompare(b.displayName))
        } else {
          list = list.sort((a, b) => b.displayName.localeCompare(a.displayName))
        }
      }
      return list
    },
    setState (query) {
      if (query[ID_FIELD]) {
        let result = null
        for (let i = 0; i < this.processedList.length; i++) {
          const item = this.processedList[i]
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
        // Pager
        this.pager.currentStep = (query.page) ? parseInt(query.page, 10) : 1
        // Filter
        this.filters.keywords = (query.q) ? decodeURIComponent(query.q) : ''
        this.filters.filter1 = (query[FILTER_FIELD]) ? decodeURIComponent(query[FILTER_FIELD]) : ''
        this.filters.sort = (query.sort) ? query.sort : 'asc'
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
