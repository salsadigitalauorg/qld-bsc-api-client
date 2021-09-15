<template>
  <div ref="app">
    <div class="results-page-control-panel">
      <button @click="backToProfile" class="full-view__back">Back</button>
      <div class="results-page-control-panel__right">
        <div class="control-field">
          <div class="dropdown">
            <button class="dropdown__toggle" @click="toggleMenu" :aria-expanded="isShowing ? 'true': 'false'">View as</button>
            <div v-if="isShowing" class="dropdown__panel">
              <ul class="dropdown__list">
                <li class="dropdown__list-item">
                  <input type="checkbox" id="action" value="action" v-model="serviceAction" @change="updateServiceType">
                  <label for="action">Action</label>
                </li>
                <li class="dropdown__list-item">
                  <input type="checkbox" id="information" value="information" v-model="serviceInformation" @change="updateServiceType">
                  <label for="information">Information</label>
                </li>
                <li class="dropdown__list-item">
                  <input type="checkbox" id="grant" value="grant" v-model="serviceGrant" @change="updateServiceType">
                  <label for="grant">Grant</label>
                </li>
                <li class="dropdown__list-item">
                  <input type="checkbox" id="concession" value="concession" v-model="serviceConcession" @change="updateServiceType">
                  <label for="concession">Concession</label>
                </li>
                <li class="dropdown__list-item">
                  <input type="checkbox" id="loan" value="loan" v-model="serviceLoan" @change="updateServiceType">
                  <label for="loan">Loan</label>
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
      ignoreQueryKeys: ['page', 'dev', 'items', 'view', 'service_type'],
      defaultViewMode: 'accordion',
      viewMode: 'accordion',
      serviceType: '',
      serviceAction: '',
      serviceInformation: '',
      serviceGrant: '',
      serviceConcession: '',
      serviceLoan: '',
      values: [],
      isShowing: false
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
      //TODO this is where the magic needs to happen
      // Profile criteria
      const query = this.$route.query
      const filter = {}
      Object.keys(query).forEach(key => {
        if (this.ignoreQueryKeys.indexOf(key) === -1) {
          const val = query[key]
          console.log(key)
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
            if(this.serviceAction == true){
              values.push('action')
            }
            if(this.serviceInformation == true){
              values.push('information')
            }
            if(this.serviceGrant == true){
              values.push('grant')
            }
            if(this.serviceConcession == true){
              values.push('concession')
            }
            if(this.serviceLoan == true){
              values.push('loan')
            }
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
    windowClick (e) {
      const parent = e.target.closest('.my-dropdown')
      if (parent === null) {
        this.isShowing = false
      }
    },
    toggleMenu () {
      this.isShowing = !this.isShowing
      console.log(this.isShowing)
      if (this.isShowing) {
        window.addEventListener('click', this.windowClick)
      }
    },
    updateDropdown () {
      console.log("Updated!")
    },
    updateServiceType () {
      let query = JSON.parse(JSON.stringify(this.$route.query))
      delete query['service_type']
      query['service_type'] = []
      if (this.serviceAction == true) {
        query['service_type'].push('action')
      }
      if (this.serviceInformation == true) {
        query['service_type'].push('information')
      }
      if (this.serviceGrant == true) {
        query['service_type'].push('grant')
      }
      if (this.serviceConcession == true) {
        query['service_type'].push('concession')
      }
      if (this.serviceLoan == true) {
        query['service_type'].push('loan')
      }
      console.log(query)
      this.$router.push({ query })
    },

    setState (query) {
      this.pager.currentStep = (query.page) ? parseInt(query.page, 10) : 1
      this.pager.itemsPerStep = (query.items) ? parseInt(query.items, 10) : this.itemsPerPageControl.default
      this.itemsPerPageControl.input = this.pager.itemsPerStep
      this.viewMode = (query.view) ? query.view : this.defaultViewMode
      this.serviceAction = (query.service_type) && query.service_type.indexOf('action') >= 0
      this.serviceInformation = (query.service_type) && query.service_type.indexOf('information') >= 0
      this.serviceGrant = (query.service_type) && query.service_type.indexOf('grant') >= 0
      this.serviceConcession = (query.service_type) && query.service_type.indexOf('concession') >= 0
      this.serviceLoan = (query.service_type) && query.service_type.indexOf('loan') >= 0
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
    &__panel{
      box-shadow: 0 0 2px black;
      background: white;
      position: absolute;
      }
    &__list{
      list-style-type: none;
      padding: 0px;
    }
    &__list-item{
      display: flex;
    }
  }
</style>