<template>
  <div ref="app">
    <button @click="backToProfile" class="full-view__back">Back</button>
    <loading v-if="state === 'loading'" />
    <template v-if="state === 'display'">
      <results :list="this.dataset.services" @selected="selectedResult"/>
      <pager v-if="totalSteps > 1" :initial="pager.currentStep" :perstep="pager.itemsPerStep" :total="totalSteps" @change="pagerChange"/>
    </template>
    <error v-if="state === 'error'" @retry="load" />
    <div v-if="state === 'no-results'">
      <p>No results were found.</p>
    </div>
  </div>
</template>

<script>
import api from '../libs/api'
import Results from '../components/Results'
import Pager from '../components/Pager'
import Error from '../components/Error'
import Loading from '../components/Loading'

export default {
  name: 'ResultsPage',
  components: {
    Results,
    Pager,
    Error,
    Loading
  },
  data () {
    return {
      dataset: null,
      state: 'loading',
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
      // Profile criteria
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
        this.state = 'loading'
        const dataset = await this.loadDataset()
        if (dataset) {
          this.dataset = dataset
          this.state = 'display'
        } else {
          this.state = 'no-results'
        }
      } catch (e) {
        this.state = 'error'
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
