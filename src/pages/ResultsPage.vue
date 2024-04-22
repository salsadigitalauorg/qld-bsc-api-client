<template>
  <div ref="app">
    <div class="results-page-control-panel">
      <button @click="backToProfile" class="full-view__back">Back</button>
      <div class="results-page-control-panel__right">
        <div class="control-field">
          <div class="dropdown">
            <button class="dropdown__toggle" @click="toggleMenu" :aria-expanded="isShowing ? 'true': 'false'">
              Filter By Type
            </button>
            <div v-if="isShowing" class="dropdown__panel">
              <ul class="dropdown__list">
                <li class="dropdown__list-item" v-for="(type, index) in serviceTypes" :key="index">
                  <input type="checkbox" :id="type.id" v-model="type.selected" @change="updateServiceType">
                  <label :for="type.id">{{ type.label }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
import criteria from '../libs/criteria'
import { getDomainSettings, getDomainQueryParams, getDomainParamNames } from '../libs/domain'
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
      ignoreQueryKeys: ['page', 'items', 'view', 'service_type', ...getDomainParamNames],
      defaultViewMode: 'accordion',
      viewMode: 'accordion',
      serviceTypes: [
        { id: 'action', label: 'Action', selected: false },
        { id: 'information', label: 'Information', selected: false },
        { id: 'concession', label: 'Concession', selected: false },
        { id: 'grant', label: 'Grant', selected: false },
        { id: 'loan', label: 'Loan', selected: false }
      ],
      values: [],
      isShowing: false
    }
  },
  computed: {
    totalSteps () {
      return Math.ceil(this.dataset.totalCount / this.pager.itemsPerStep)
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
        } else if (key === 'service_type' && query[key].length > 0) {
            const values = []
            this.serviceTypes.forEach(type => {
              if (type.selected == true){
                values.push(type.id)
              }
            })
            filter['f_service_type'] = { condition: { value: values, path: 'f_service_type', operator: 'IN' } }
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
      const domain = getDomainSettings(this.$route.query)
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
      const query = {...getDomainQueryParams(this.$route.query)}
      this.$router.push({ name: 'service', params: { id: result.id }, query })
    },
    backToProfile () {
      const query = {...getDomainQueryParams(this.$route.query)}
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
    windowClick (e) {
      const parent = e.target.closest('.dropdown')
      if (parent === null) {
        this.isShowing = false
      }
    },
    toggleMenu () {
      this.isShowing = !this.isShowing
      if (this.isShowing) {
        window.addEventListener('click', this.windowClick)
      }
    },
    updateServiceType () {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      delete query['service_type']
      query['service_type'] = []
      this.serviceTypes.forEach(type => {
        if (type.selected){
          query['service_type'].push(type.id)
        }
      })
      this.$router.push({ query })
    },

    setState (query) {
      this.pager.currentStep = (query.page) ? parseInt(query.page, 10) : 1
      this.pager.itemsPerStep = (query.items) ? parseInt(query.items, 10) : this.itemsPerPageControl.default
      this.itemsPerPageControl.input = this.pager.itemsPerStep
      this.viewMode = (query.view) ? query.view : this.defaultViewMode
      this.serviceTypes.forEach(type => {
        type.selected = false
      })
      if (query.service_type) {
        const query_service_types = (typeof query.service_type === 'string') ? [query.service_type] : query.service_type
        query_service_types.forEach(type => {
          const idx = this.serviceTypes.find(t => t.id === type)
          idx.selected = true
        })
      }
      this.load()
    }
  },
  created () {
    this.setState(this.$route.query)
  },
  destroyed () {
    window.removeEventListener('click', this.windowClick)
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

  .dropdown {
    position: relative;
    &__panel {
      box-shadow: 0 0 rem(2px) black;
      background: white;
      position: absolute;
      padding: rem(8px);
    }
    &__list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    &__list-item {
      display: flex;
      margin-bottom: rem(4px);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
