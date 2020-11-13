<template>
  <div ref="app">
    <div class="results-page-control-panel">
      <button @click="backToProfile" class="full-view__back">Back</button>
      <div class="results-page-control-panel__right">
        <div class="control-field">
          <label for="items-per-page-view-as">View as</label>
          <select id="items-per-page-view-as" class="control-field__select" v-model="viewMode" @change="updateView">
            <option value="accordion">Accordion</option>
            <option value="list">List</option>
          </select>
        </div>
        <div class="control-field">
          <label for="items-per-page-items-per-page">Items per page</label>
          <select id="items-per-page-items-per-page" class="control-field__select" v-model="itemsPerPageControl.input" @change="updateItemsPerPage">
            <option v-for="(pageCount, key) in itemsPerPageControl.values" :value="pageCount" :key="key">{{ pageCount }}</option>
          </select>
        </div>
      </div>
    </div>
    <loading v-if="state === 'loading'" />
    <template v-if="state === 'display'">
      <results v-if="viewMode === 'accordion'" :list="this.dataset.services" @selected="selectedResult"/>
      <results-list v-if="viewMode === 'list'" :list="this.dataset.services" :start-count-at="(pager.itemsPerStep * (pager.currentStep - 1)) + 1" @selected="selectedResult"/>
      <pager v-if="totalSteps > 1" :initial="pager.currentStep" :perstep="pager.itemsPerStep" :total="totalSteps" @change="pagerChange"/>
    </template>
    <error v-if="state === 'error'" @retry="load" />
    <div v-if="state === 'no-results'">
      <p>No results were found.</p>
    </div>
  </div>
</template>

<script>
import dataservice from '../libs/dataservice'
import settings from '../libs/settings'
import criteria from '../libs/criteria'
import Results from '../components/Results'
import ResultsList from '../components/ResultsList'
import Pager from '../components/Pager'
import Error from '../components/Error'
import Loading from '../components/Loading'

export default {
  name: 'ResultsPage',
  components: {
    Results,
    ResultsList,
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
        itemsPerStep: 10,
        totalCount: 1
      },
      itemsPerPageControl: {
        default: 25,
        input: null,
        values: [10, 25, 50]
      },
      ignoreQueryKeys: ['page', 'dev', 'items', 'view'],
      defaultViewMode: 'accordion',
      viewMode: 'accordion'
    }
  },
  computed: {
    totalSteps () {
      return Math.ceil(this.dataset.totalCount / this.pager.itemsPerStep)
    },
    isDev () {
      return (this.$route.query.dev && this.$route.query.dev === 'true')
    }
  },
  methods: {
    getAPIFilter () {
      // Profile criteria
      const query = this.$route.query
      const filter = {}
      Object.keys(query).forEach(key => {
        if (this.ignoreQueryKeys.indexOf(key) === -1) {
          const val = query[key]
          if (val) {
            const field = criteria.getCriteriaFromQuery(key)
            if (Array.isArray(val)) {
              const groupName = field.filterName.replace('f_c_', 'group_')
              filter[groupName] = { condition: { value: val, path: field.filterName, operator: 'IN' } }
            } else {
              filter[field.filterName] = { value: val }
            }
          }
        }
      })
      return filter
    },
    getAPIPage () {
      const page = { limit: this.pager.itemsPerStep }
      const offset = (this.pager.currentStep - 1) * this.pager.itemsPerStep
      if (offset > 0) {
        page['offset'] = offset
      }
      return page
    },
    async loadDataset () {
      const filter = this.getAPIFilter()
      const page = this.getAPIPage()
      const domain = this.isDev ? settings.domain.dev : settings.domain.master
      const result = await dataservice.getGroupedServiceInteractions(domain, { filter, page })
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
        console.log(e)
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
      const query = {}
      if (this.isDev) {
        query['dev'] = 'true'
      }
      this.$router.push({ name: 'service', params: { id: result.id }, query })
    },
    backToProfile () {
      const query = {}
      if (this.isDev) {
        query['dev'] = 'true'
      }
      this.$router.push({ path: '/', query })
    },
    updateItemsPerPage () {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      delete query['items']
      delete query['page']
      if (this.itemsPerPageControl.input != this.itemsPerPageControl.default) {
        query['items'] = this.itemsPerPageControl.input
      }
      this.$router.push({ query })
    },
    updateView () {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      delete query['view']
      if (this.viewMode != this.defaultViewMode) {
        query['view'] = this.viewMode
      }
      this.$router.push({ query })
    },
    setState (query) {
      this.pager.currentStep = (query.page) ? parseInt(query.page, 10) : 1
      this.pager.itemsPerStep = (query.items) ? parseInt(query.items, 10) : this.itemsPerPageControl.default
      this.itemsPerPageControl.input = this.pager.itemsPerStep
      this.viewMode = (query.view) ? query.view : this.defaultViewMode
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

<style lang="scss">
  @import '../styles/variables';

  .results-page-control-panel {
    @include breakpoint('s') {
      display: flex;
      justify-content: space-between;
    }

    &__right {
      @include breakpoint('s') {
        display: flex;
        justify-content: align-right;
      }
    }
  }

  .control-field {
    margin: rem(16px) 0;

    @include breakpoint('s') {
      margin: 0 0 0 rem(16px);
    }

    &__select {
      margin-left: rem(4px);
    }
  }
</style>