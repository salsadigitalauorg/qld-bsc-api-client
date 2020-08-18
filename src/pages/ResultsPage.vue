<template>
  <div ref="app">
    <button @click="backToProfile" class="full-view__back">Back</button>
    <div v-if="listingState === 'loading'">
      <p class="find-a-provider__message">Loading...</p>
    </div>
    <template v-if="listingState === 'display'">
      <results :list="this.dataset.services" @selected="selectedResult"/>
      <pager v-if="totalSteps > 1" :initial="pager.currentStep" :perstep="pager.itemsPerStep" :total="totalSteps" @change="pagerChange"/>
    </template>
    <error v-if="listingState === 'error'" @retry="load" />
    <div v-if="listingState === 'no-results'">
      <p class="find-a-provider__message">No results were returned.</p>
    </div>
  </div>
</template>

<script>
import api from '../libs/api'
import Results from '../components/Results'
import Pager from '../components/Pager'
import Error from '../components/Error'

export default {
  name: 'ResultsPage',
  components: {
    Results,
    Pager,
    Error
  },
  data () {
    return {
      dataset: null,
      state: 'listing',
      listingState: 'loading',
      selected: null,
      pageTitle: null,
      pager: {
        currentStep: 1,
        itemsPerStep: 50,
        totalCount: 1
      }
    }
  },
  computed: {
    totalSteps () {
      return Math.ceil(this.dataset.totalCount / this.pager.itemsPerStep)
    }
  },
  methods: {
    getAPIFilters () {
      // Covert profile criteria into filters.
      const query = this.$route.query
      const filters = []
      Object.keys(query).forEach(key => {
        if (key !== 'page') {
          const val = query[key]
          if (val) {
            const field = api.getCriteriaFromQuery(key)
            filters.push({
              field: field.fieldName,
              value: val
            })
          }
        }
      })
      // Pager size
      filters.push({ page: `limit`, value: this.pager.itemsPerStep })
      // Pager offset
      const offset = (this.pager.currentStep - 1) * this.pager.itemsPerStep
      if (offset > 0) {
        filters.push({ page: `offset`, value: offset })
      }
      return filters
    },
    async loadDataset () {
      const filters = this.getAPIFilters()
      const result = await api.loadServices(filters)
      return result
    },
    async load () {
      try {
        this.listingState = 'loading'
        const dataset = await this.loadDataset()
        if (dataset) {
          this.dataset = dataset

          // Set state
          this.listingState = 'display'
        } else {
          this.listingState = 'no-results'
        }
      } catch (e) {
        console.log(e)
        this.listingState = 'error'
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
      this.$router.push({ name: 'service', params: { id: result.id } })
    },
    backToProfile () {
      this.$router.push({ path: '/' })
    },
    setState (query) {
      this.pager.currentStep = (query.page) ? parseInt(query.page, 10) : 1
      this.load()
    }
  },
  created () {
    this.setState(this.$route.query)
  },
  watch: {
    $route: function (to) {
      this.setState(to.query)
    }
  }
}
</script>
