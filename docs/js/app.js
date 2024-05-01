(function(e){function t(t){for(var s,n,l=t[0],o=t[1],c=t[2],d=0,_=[];d<l.length;d++)n=l[d],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&_.push(r[n][0]),r[n]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);u&&u(t);while(_.length)_.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],s=!0,l=1;l<i.length;l++){var o=i[l];0!==r[o]&&(s=!1)}s&&(a.splice(t--,1),e=n(n.s=i[0]))}return e}var s={},r={app:0},a=[];function n(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=s,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=o;a.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"0392":function(e,t,i){"use strict";var s=i("e1d0"),r=i.n(s);r.a},"09bb":function(e,t,i){const{queryAPI:s,queryAPIAll:r}=i("90fe");async function a(e){const t=await r({endpoint:e.url+"api/v1/eligibility_criteria",endpointAuth:e.auth,sort:["weight"]});return t}async function n(e,t){const i=await s({endpoint:e.url+"api/v1/taxonomy_term/services",endpointAuth:e.auth,filter:t.filter,sort:["name"]});return i}async function l(e,t){const i=await s({endpoint:e.url+"api/v1/node/service_interaction",endpointAuth:e.auth,include:[],filter:t.filter,sort:["f_service.name","title"],page:t.page});return i}async function o(e,t){if(t){const i=await s({endpoint:e.url+"api/v1/node/service_interaction",endpointAuth:e.auth,include:["f_agency"],filter:{nid:t}});return i}return!1}e.exports={loadCriteria:a,loadServices:n,loadServiceInteractions:l,loadFullServiceInteraction:o}},"0fc5":function(e,t,i){"use strict";var s=i("3e80"),r=i.n(s);r.a},"185f":function(e,t,i){},"3e80":function(e,t,i){},"401e":function(e,t){e.exports={domain:{production:{url:"https://nginx-php.production.qld-bsc.lagoon.salsa.hosting/"}}}},"56d7":function(e,t,i){"use strict";i.r(t);var s=i("2b0e"),r=i("8c4f"),a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("router-view",{staticClass:"app"})},n=[],l=(i("0392"),i("2877")),o={},c=Object(l["a"])(o,a,n,!1,null,null,null),u=c.exports,d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"profile"},[e.networkError?i("div",[i("h1",[e._v("Network error")]),i("p",[e._v("A network error occurred connecting to the API.")])]):i("div",[i("div",{staticClass:"profile__image",class:{"profile__image--middle-remote":"middle-remote"===e.profile,"profile__image--middle-regional":"middle-regional"===e.profile,"profile__image--senior":"senior"===e.profile,"profile__image--renter":"renter"===e.profile,"profile__image--custom":"custom"===e.profile}}),i("h1",{staticClass:"profile__title"},[e._v("Select a profile")]),i("div",{staticClass:"input__select-wrapper"},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.profile,expression:"profile"}],staticClass:"input__select",on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.profile=t.target.multiple?i:i[0]},e.updateForm]}},[i("option",{attrs:{value:""}},[e._v("None")]),i("option",{attrs:{value:"middle-remote"}},[e._v("Middle Aged - Country")]),i("option",{attrs:{value:"middle-regional"}},[e._v("Middle Aged - City")]),i("option",{attrs:{value:"senior"}},[e._v("Senior")]),i("option",{attrs:{value:"renter"}},[e._v("Aussie Renter")]),i("option",{attrs:{value:"custom"}},[e._v("Custom")])])]),e.profile?i("div",{staticClass:"profile__form"},["custom"===e.profile?i("p",[e._v("Please fill out the following form to get a list of available services.")]):i("p",[e._v("This profile uses the following values to get a list of available services.")]),e._l(e.form,(function(t,s){return i("div",{key:s},[i("label",[i("span",{staticClass:"input__label"},[e._v(e._s(t.label))]),i("div",{staticClass:"input__select-wrapper"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],staticClass:"input__select",on:{change:function(i){var s=Array.prototype.filter.call(i.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"value",i.target.multiple?s:s[0])}}},e._l(t.options,(function(t,r){return i("option",{key:"field-"+s+"-"+r,domProps:{value:t.id}},[e._v(e._s(t.name))])})),0)])])])}))],2):e._e(),e.profile?i("button",{staticClass:"btn",on:{click:e.submit}},[e._v("See the results")]):e._e()])])},_=[],p=i("99ca"),f=i.n(p),v=i("7fe6"),h=i.n(v),m=i("401e"),g=i.n(m);function y(e){let t={};if(e.api){if(t["url"]=e.api,e.auth){const i=e.auth.split(":");t["auth"]={username:i[0],password:i[1]}}}else t=g.a.domain.production;return t}function b(e){let t={};return e.api&&e.auth&&(t.api=e.api,t.auth=e.auth),t}const w=["api","auth"];var C={name:"ProfilePage",data(){return{networkError:!1,profile:"",fieldMap:h.a.getCriteriaFields(),profileForms:{"middle-remote":{age:"6"},"middle-regional":{lifestage:"63"},senior:{age:"8"},renter:{housing:"53",residency:"73"}},form:[]}},methods:{async load(){try{const e=y(this.$route.query),t=await f.a.getCriteria(e);Object.keys(t).forEach(e=>{const i=t[e],s=this.fieldMap[e];if(s){const e=this.getAnyId(i);this.form.push({label:s.label,value:e,name:s.queryName,options:i})}})}catch(e){console.log(e),this.networkError=!0}},getAnyId(e){const t=e.find(e=>"Any"===e.name);return t?t.id:""},updateForm(){if(""!==this.profile){const e="custom"===this.profile;this.form.forEach(t=>{!e&&this.profileForms[this.profile][t.name]?t.value=this.profileForms[this.profile][t.name]:t.value=this.getAnyId(t.options)})}},submit(){if(this.profile.length>0){const e={...b(this.$route.query)};this.form.forEach(t=>{const i=this.getAnyId(t.options);t.value!==i&&(e[t.name]=[i,t.value])}),this.$router.push({name:"results",query:e})}}},created(){this.load()}},k=C,P=(i("eb29"),Object(l["a"])(k,d,_,!1,null,null,null)),S=P.exports,$=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{ref:"app"},[i("div",{staticClass:"results-page-control-panel"},[i("button",{staticClass:"full-view__back",on:{click:e.backToProfile}},[e._v("Back")]),i("div",{staticClass:"results-page-control-panel__right"},[i("div",{staticClass:"control-field"},[i("div",{staticClass:"dropdown"},[i("button",{staticClass:"dropdown__toggle",attrs:{"aria-expanded":e.isShowing?"true":"false"},on:{click:e.toggleMenu}},[e._v(" Filter By Type ")]),e.isShowing?i("div",{staticClass:"dropdown__panel"},[i("ul",{staticClass:"dropdown__list"},e._l(e.serviceTypes,(function(t,s){return i("li",{key:s,staticClass:"dropdown__list-item"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.selected,expression:"type.selected"}],attrs:{type:"checkbox",id:t.id},domProps:{checked:Array.isArray(t.selected)?e._i(t.selected,null)>-1:t.selected},on:{change:[function(i){var s=t.selected,r=i.target,a=!!r.checked;if(Array.isArray(s)){var n=null,l=e._i(s,n);r.checked?l<0&&e.$set(t,"selected",s.concat([n])):l>-1&&e.$set(t,"selected",s.slice(0,l).concat(s.slice(l+1)))}else e.$set(t,"selected",a)},e.updateServiceType]}}),i("label",{attrs:{for:t.id}},[e._v(e._s(t.label))])])})),0)]):e._e()])]),i("div",{staticClass:"control-field"},[i("label",{attrs:{for:"items-per-page-view-as"}},[e._v("View as")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.viewMode,expression:"viewMode"}],staticClass:"control-field__select",attrs:{id:"items-per-page-view-as"},on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.viewMode=t.target.multiple?i:i[0]},e.updateView]}},[i("option",{attrs:{value:"accordion"}},[e._v("Accordion")]),i("option",{attrs:{value:"list"}},[e._v("List")])])]),i("div",{staticClass:"control-field"},[i("label",{attrs:{for:"items-per-page-items-per-page"}},[e._v("Items per page")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.itemsPerPageControl.input,expression:"itemsPerPageControl.input"}],staticClass:"control-field__select",attrs:{id:"items-per-page-items-per-page"},on:{change:[function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.itemsPerPageControl,"input",t.target.multiple?i:i[0])},e.updateItemsPerPage]}},e._l(e.itemsPerPageControl.values,(function(t,s){return i("option",{key:s,domProps:{value:t}},[e._v(e._s(t))])})),0)])])]),"loading"===e.state?i("loading"):e._e(),"display"===e.state?["accordion"===e.viewMode?i("results",{attrs:{list:this.dataset.services},on:{selected:e.selectedResult}}):e._e(),"list"===e.viewMode?i("results-list",{attrs:{list:this.dataset.services,"start-count-at":e.pager.itemsPerStep*(e.pager.currentStep-1)+1},on:{selected:e.selectedResult}}):e._e(),e.totalSteps>1?i("pager",{attrs:{initial:e.pager.currentStep,perstep:e.pager.itemsPerStep,total:e.totalSteps},on:{change:e.pagerChange}}):e._e()]:e._e(),"error"===e.state?i("error",{on:{retry:e.load}}):e._e(),"no-results"===e.state?i("div",[i("p",[e._v("No results were found.")])]):e._e()],2)},x=[],N=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.list.length>0?i("ul",{staticClass:"result"},e._l(e.list,(function(t,s){return i("li",{key:s,staticClass:"result__item"},[i("h3",{staticClass:"result__item-title"},[i("button",{staticClass:"result__item-title-button",class:{"result__item-title-button--expanded":e.expanded[s]},on:{click:function(t){return e.toggleExpand(s)}}},[i("span",[e._v(e._s(t.name))]),t.interactions.length>0?i("span",[e._v(" ("+e._s(t.interactions.length)+" service "+e._s(1===t.interactions.length?"interaction":"interactions")+")")]):e._e()])]),e.expanded[s]?i("div",[t.id>=0?[i("h4",[e._v("Service")]),i("div",{staticClass:"result__service"},[i("p",[e._v(e._s(t.description))]),t.id?i("button",{staticClass:"btn btn--small",on:{click:function(i){return e.selected(t)}}},[e._v("Read more about "+e._s(t.name.toLowerCase()))]):i("div",[e._v(e._s(t.name))])])]:e._e(),i("h4",[e._v("Service interactions")]),0===t.interactions.length?i("p",{staticClass:"result__service"},[e._v("No service interactions available.")]):i("ol",{staticClass:"result__interactions"},e._l(t.interactions,(function(t,r){return i("li",{key:"service-"+s+"-"+r,staticClass:"result__interaction"},[i("div",{staticClass:"result__interaction-cell result__interaction-cell--first"},[i("h4",{staticClass:"result__interaction-title"},[i("button",{staticClass:"btn btn--small",on:{click:function(i){return e.selected(t)}}},[e._v(e._s(t.name))])])]),i("div",{staticClass:"result__interaction-cell result__interaction-cell--last"},[i("span",[e._v(e._s(t.description))])])])})),0)],2):e._e()])})),0):i("div",{staticClass:"result__no-items"},[e._v("Sorry we could not find any results")])])},A=[],E={name:"Results",components:{},props:{list:Array},data(){return{expanded:this.list.map(()=>!1)}},methods:{selected(e){this.$emit("selected",e)},toggleExpand(e){this.expanded[e]=s["a"].set(this.expanded,e,!this.expanded[e])}}},q=E,I=(i("ebf2"),Object(l["a"])(q,N,A,!1,null,null,null)),O=I.exports,M=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.list.length>0?i("table",{staticClass:"result"},[e._m(0),i("tbody",e._l(e.interactionList,(function(t,s){return i("tr",{key:s,staticClass:"result__row"},[i("td",{staticClass:"result__cell"},[e._v(" "+e._s(t.count)+" ")]),i("td",{staticClass:"result__cell"},[i("button",{staticClass:"btn btn--small",on:{click:function(i){return e.selected(t.interaction)}}},[e._v(e._s(t.interaction.name))])]),i("td",{staticClass:"result__cell"},[i("span",[e._v(e._s(t.interaction.description))])]),i("td",{staticClass:"result__cell"},[t.service.id?i("button",{staticClass:"btn btn--small",on:{click:function(i){return e.selected(t.service)}}},[e._v(e._s(t.service.name))]):i("div",[e._v(e._s(t.service.name))])])])})),0)]):i("div",{staticClass:"result__no-items"},[e._v("Sorry we could not find any results")])])},j=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",{staticClass:"result__head-cell",attrs:{"aria-label":"Item number"}},[e._v("#")]),i("th",{staticClass:"result__head-cell"},[e._v("Interaction")]),i("th",{staticClass:"result__head-cell"},[e._v("Description")]),i("th",{staticClass:"result__head-cell"},[e._v("Service")])])])}],F={name:"Results",components:{},props:{list:Array,startCountAt:Number},computed:{interactionList(){const e=[];return this.list.forEach(t=>{t.interactions.forEach(i=>{e.push({count:this.startCountAt+e.length,interaction:i,service:t})})}),e}},methods:{selected(e){this.$emit("selected",e)}}},T=F,L=(i("c565"),Object(l["a"])(T,M,j,!1,null,null,null)),R=L.exports,J=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("nav",{staticClass:"pager"},[e.current>1?i("button",{staticClass:"pager__prev",on:{click:e.prevPage}},[i("span",[e._v("Prev")])]):e._e(),i("ul",{staticClass:"pager__page-list"},e._l(e.range,(function(t,s){return i("li",{key:s,staticClass:"pager__item"},["..."===t?i("span",{staticClass:"pager__item-dots"},[e._v(e._s(t))]):i("button",{staticClass:"pager__item-btn",class:{"pager__item-btn--current":e.current===t},on:{click:function(i){return e.change(t)}}},[i("span",{staticClass:"pager__hidden"},[e._v("Page: ")]),i("span",{staticClass:"pager__btn-text"},[e._v(e._s(t))])])])})),0),e.current<e.total?i("button",{staticClass:"pager__next",on:{click:e.nextPage}},[i("span",{staticClass:"pager__btn-text"},[e._v("Next")])]):e._e()])},G=[],V={name:"Pager",components:{},props:{initial:Number,perstep:Number,total:Number},data(){return{current:this.initial}},methods:{change(e){this.current=e,this.$emit("change",e)},prevPage(){this.change(this.current-1)},nextPage(){this.change(this.current+1)}},computed:{range(){const e=[];if(this.total>6){const t=this.current,i=this.total;t>2&&e.push(1),t>3&&e.push("..."),t===i&&e.push(t-2),t>1&&e.push(t-1),e.push(t),t+1<i&&e.push(t+1),1===t&&e.push(3),t<i-2&&e.push("..."),t<i&&e.push(i)}else for(let t=1;t<=this.total;t++)e.push(t);return e}},watch:{initial(e){this.current=e}}},W=V,B=(i("dd3c"),Object(l["a"])(W,J,G,!1,null,null,null)),D=B.exports,H=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"error"},[i("p",{staticClass:"error__message"},[e._v("An error has occurred trying to get data.")]),i("p",{staticClass:"error__message"},[e._v("You can retry by clicking the button below:")]),i("button",{staticClass:"btn",on:{click:e.retry}},[e._v("Retry")])])},Q=[],K={methods:{retry(){this.$emit("retry")}}},Y=K,z=(i("7ab1"),Object(l["a"])(Y,H,Q,!1,null,null,null)),U=z.exports,X=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Z=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"loading"},[i("span",[e._v("Loading")])])}],ee=(i("cb13"),{}),te=Object(l["a"])(ee,X,Z,!1,null,null,null),ie=te.exports,se={name:"ResultsPage",components:{Results:O,ResultsList:R,Pager:D,Error:U,Loading:ie},data(){return{dataset:null,state:"loading",pager:{currentStep:1,itemsPerStep:10,totalCount:1},itemsPerPageControl:{default:25,input:null,values:[10,25,50]},ignoreQueryKeys:["page","items","view","service_type",...w],defaultViewMode:"accordion",viewMode:"accordion",serviceTypes:[{id:"action",label:"Action",selected:!1},{id:"information",label:"Information",selected:!1},{id:"concession",label:"Concession",selected:!1},{id:"grant",label:"Grant",selected:!1},{id:"loan",label:"Loan",selected:!1}],values:[],isShowing:!1}},computed:{totalSteps(){return Math.ceil(this.dataset.totalCount/this.pager.itemsPerStep)}},methods:{getAPIFilter(){const e=this.$route.query,t={};return Object.keys(e).forEach(i=>{if(-1===this.ignoreQueryKeys.indexOf(i)){const s=e[i];if(s){const e=h.a.getCriteriaFromQuery(i);if(Array.isArray(s)){const i=e.filterName.replace("f_c_","group_");t[i]={condition:{value:s,path:e.filterName,operator:"IN"}}}else t[e.filterName]={value:s}}}else if("service_type"===i&&e[i].length>0){const e=[];this.serviceTypes.forEach(t=>{1==t.selected&&e.push(t.id)}),t["f_service_type"]={condition:{value:e,path:"f_service_type",operator:"IN"}}}}),t},getAPIPage(){const e={limit:this.pager.itemsPerStep},t=(this.pager.currentStep-1)*this.pager.itemsPerStep;return t>0&&(e["offset"]=t),e},async loadDataset(){const e=this.getAPIFilter(),t=this.getAPIPage(),i=y(this.$route.query),s=await f.a.getGroupedServiceInteractions(i,{filter:e,page:t});return s},async load(){try{this.state="loading";const e=await this.loadDataset();e?(this.dataset=e,this.state="display"):this.state="no-results"}catch(e){console.log(e),this.state="error"}},pagerChange(e){let t=JSON.parse(JSON.stringify(this.$route.query));delete t["page"],e>1&&(t["page"]=e),this.$router.push({query:t}),this.$nextTick(()=>{this.$refs["app"].scrollIntoView({behavior:"smooth"})})},selectedResult(e){const t={...b(this.$route.query)};this.$router.push({name:"service",params:{id:e.id},query:t})},backToProfile(){const e={...b(this.$route.query)};this.$router.push({path:"/",query:e})},updateItemsPerPage(){let e=JSON.parse(JSON.stringify(this.$route.query));delete e["items"],delete e["page"],this.itemsPerPageControl.input!=this.itemsPerPageControl.default&&(e["items"]=this.itemsPerPageControl.input),this.$router.push({query:e})},updateView(){let e=JSON.parse(JSON.stringify(this.$route.query));delete e["view"],this.viewMode!=this.defaultViewMode&&(e["view"]=this.viewMode),this.$router.push({query:e})},windowClick(e){const t=e.target.closest(".dropdown");null===t&&(this.isShowing=!1)},toggleMenu(){this.isShowing=!this.isShowing,this.isShowing&&window.addEventListener("click",this.windowClick)},updateServiceType(){let e=JSON.parse(JSON.stringify(this.$route.query));delete e["service_type"],delete e["page"],e["service_type"]=[],this.serviceTypes.forEach(t=>{t.selected&&e["service_type"].push(t.id)}),this.$router.push({query:e})},setState(e){if(this.pager.currentStep=e.page?parseInt(e.page,10):1,this.pager.itemsPerStep=e.items?parseInt(e.items,10):this.itemsPerPageControl.default,this.itemsPerPageControl.input=this.pager.itemsPerStep,this.viewMode=e.view?e.view:this.defaultViewMode,this.serviceTypes.forEach(e=>{e.selected=!1}),e.service_type){const t="string"===typeof e.service_type?[e.service_type]:e.service_type;t.forEach(e=>{const t=this.serviceTypes.find(t=>t.id===e);t.selected=!0})}this.load()}},created(){this.setState(this.$route.query)},destroyed(){window.removeEventListener("click",this.windowClick)},watch:{$route:function(e){this.setState(e.query)}}},re=se,ae=(i("0fc5"),Object(l["a"])(re,$,x,!1,null,null,null)),ne=ae.exports,le=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"full-view"},[i("button",{staticClass:"btn--left",on:{click:e.back}},[e._v("Back")]),"loading"===e.state?i("loading"):e._e(),"display"===e.state?[e.selected?i("div",{staticClass:"full-view__body"},[i("div",{staticClass:"full-view__main"},[i("h1",{staticClass:"full-view__title"},[e._v(e._s(e.selected.name))]),e._l(e.displayFields,(function(t,s){return i("div",{key:"body-"+s},[i("h2",[e._v(e._s(t.title))]),i("p",{domProps:{innerHTML:e._s(t.html)}})])}))],2),i("div",{staticClass:"full-view__sidebar"},[i("div",{staticClass:"full-view__contact"},e._l(e.displaySidebarGroups,(function(t,s){return i("div",{key:"contact-group-"+s,staticClass:"full-view__side-group"},[t.title?i("h2",[e._v(e._s(t.title))]):e._e(),e._l(t.fields,(function(t,r){return i("div",{key:"contact-group-"+s+"-"+r,staticClass:"full-view__side-field"},[i("strong",[e._v(e._s(t.title))]),i("p",{domProps:{innerHTML:e._s(t.html)}})])}))],2)})),0)])]):e._e()]:e._e(),"error"===e.state?i("error",{on:{retry:e.load}}):e._e(),"no-results"===e.state?i("div",[i("p",[e._v("No results were returned.")])]):e._e()],2)},oe=[],ce={name:"FullPage",components:{Error:U,Loading:ie},data(){return{state:"loading",selected:null,fields:[{title:"Description",field:"long_description"},{title:"Who is eligible?",field:"who_is_eligible"},{title:"What you will need",field:"prerequisites"},{title:"How to",field:"how_to"},{title:"Fees",field:"fees",type:"url"},{title:"Do it online",field:"do_it_online_url",type:"url"},{title:"More information",field:"more_information_url",type:"url"},{title:"Form",field:"form_url",type:"url"},{title:"Who do I call?",field:"who_do_i_call"},{title:"Message applied",field:"message_applied"},{title:"Message problem",field:"message_problem"},{title:"Message progress",field:"message_progress"},{title:"Message provisioned",field:"message_provisioned"}],sidebarGroups:[{title:"Agency",fields:[{title:"Type",field:"agency_type"},{title:"Name",field:"agency_name"},{title:"Acronym",field:"agency_acronym"},{title:"Website",field:"agency_website_url",type:"url"}]},{title:"Service",fields:[{title:"Business",field:"business_unit_name"},{title:"Owner",field:"service_owner_name"},{title:"Email",field:"service_owner_email",type:"email"}]}]}},computed:{displayFields(){const e=[];return this.fields.forEach(t=>{const i=this.parseField(t);i&&e.push({title:t.title,html:i})}),e},displaySidebarGroups(){const e=[];return this.sidebarGroups.forEach(t=>{const i=[];t.fields.forEach(e=>{const t=this.parseField(e);t&&i.push({title:e.title,html:t})}),i.length>0&&e.push({title:t.title,fields:i})}),e}},methods:{back(){this.$router.go(-1)},parseField(e){if(this.selected[e.field]){const t=e.type?e.type:"text";let i=this.selected[e.field];switch(t){case"text":i.indexOf("<p>")<0&&(i=i.replace(/\n/g,"<br/>"));break;case"url":0===i.indexOf("http")&&(i=`<a href="${i}">${i}</a>`);break;case"email":i=`<a href="mailto:${i}">${i}</a>`;break}return i}return!1},async load(){try{this.state="loading";const e=y(this.$route.query),t=await f.a.getFullServiceInteraction(e,this.$route.params.id);t?(this.selected=t,this.state="display"):this.state="no-results"}catch(e){console.log(e),this.state="error"}}},created(){this.load()}},ue=ce,de=(i("b761"),Object(l["a"])(ue,le,oe,!1,null,null,null)),_e=de.exports;s["a"].config.productionTip=!1,s["a"].use(r["a"]);var pe=new r["a"]({mode:"hash",routes:[{path:"/",component:S},{path:"/results",name:"results",component:ne},{path:"/service/:id",name:"service",component:_e}]});new s["a"]({router:pe,render:e=>e(u)}).$mount("#app")},"5b83":function(e,t,i){},6278:function(e,t,i){},"769a":function(e,t){function i(e,t,i=null){const s=t.split(".");let r=e;for(let a=0;a<s.length;a++){const e=s[a];if(void 0===r[e]||null===r[e]){r=i;break}r=r[e]}return r}function s(e){if(e.data&&e.data.length>0){const s=e.data[0],r=s.type.replace("node--",""),a=s.attributes,n={type:r,id:a.drupal_internal__nid,name:a.title,service_id:i(s,"relationships.f_service.data.meta.drupal_internal__nid",""),agency_service_id:i(a,"f_agency_service_id",""),do_it_online_url:i(a,"f_do_it_online_url.uri",""),fees:i(a,"f_fees.processed",""),form_url:i(a,"f_form_url.uri",""),how_to:i(a,"f_how_to.processed",""),in_person:i(a,"f_in_person",""),keywords:i(a,"f_keywords",""),long_description:i(a,"f_long_description.processed",""),more_information_url:i(a,"f_more_information_url.uri",""),old_qgs_id:i(a,"f_old_qgs_id",""),old_sir_id:i(a,"f_old_sir_id",""),prerequisites:i(a,"f_prerequisites.processed",""),business_unit_name:i(a,"f_business_unit_name",""),service_owner_name:i(a,"f_service_owner_name",""),service_owner_email:i(a,"f_service_owner_email",""),service_owner_status:i(a,"f_service_owner_status",""),service_date:i(a,"f_service_date.value",""),service_date_end:i(a,"f_service_date.end_value",""),service_status:i(a,"f_service_status",""),service_type:i(a,"f_service_type",""),service_validated_date:i(a,"f_service_validated_date",""),short_description:i(a,"f_short_description",""),who_do_i_call:i(a,"f_who_do_i_call",""),who_is_eligible:i(a,"f_who_is_eligible.processed",""),message_applied:i(a,"f_message_applied.processed",""),message_problem:i(a,"f_message_problem.processed",""),message_progress:i(a,"f_message_progress.processed",""),message_provisioned:i(a,"f_message_provisioned.processed","")};if(s.relationships.f_agency){const r=s.relationships.f_agency.data.id,a=s.relationships.f_agency.data.type;let l=null;for(var t=0;t<e.included.length;t++){const i=e.included[t];if(i.type===a&&i.id===r){l=i;break}}l&&(n["agency_name"]=i(l,"attributes.name",""),n["agency_type"]=i(l,"attributes.f_agency_type",""),n["agency_acronym"]=i(l,"attributes.f_agency_acronym",""),n["agency_website_url"]=i(l,"attributes.f_agency_website_url.uri",""))}return n}return!1}function r(e){if(e.data&&e.data.length>0){const t={};return e.data.forEach(e=>{const i=e.type.replace("taxonomy_term--","");void 0===t[i]&&(t[i]=[]),t[i].push({id:e.attributes.drupal_internal__tid,name:e.attributes.name})}),t}return!1}function a(e){if(e.data&&e.data.length>0){const t=[];return e.data.forEach(e=>{t.push({tid:e.attributes.drupal_internal__tid,id:i(e,"relationships.f_default_service_interaction.data.meta.drupal_internal__nid"),name:i(e,"relationships.f_default_service_interaction.data.meta.label"),description:i(e,"relationships.f_default_service_interaction.data.meta.f_short_description")})}),t}return!1}function n(e){if(e.data&&e.data.length>0){const t=[];return e.data.forEach(e=>{t.push({id:e.attributes.drupal_internal__nid,name:e.attributes.title,description:i(e,"attributes.f_short_description"),service_id:i(e,"relationships.f_service.data.meta.drupal_internal__tid"),service_label:i(e,"relationships.f_service.data.meta.label")})}),t}return!1}e.exports={criteria:r,service:a,fullServiceInteraction:s,serviceInteraction:n}},"7ab1":function(e,t,i){"use strict";var s=i("ee0b"),r=i.n(s);r.a},"7fe6":function(e,t){const i={criteria_age:{label:"Age",queryName:"age",filterName:"f_c_age"},criteria_authentication_level:{label:"Authentication level",queryName:"auth",filterName:"f_c_authentication_level"},criteria_business_sector:{label:"Business sector",queryName:"sector",filterName:"f_c_business_sector"},criteria_card:{label:"Cards",queryName:"permits",filterName:"f_c_card"},criteria_licences_permits:{label:"Licenses and permits",queryName:"permits",filterName:"f_c_licences_permits"},criteria_housing:{label:"Housing",queryName:"housing",filterName:"f_c_housing"},criteria_lifestage:{label:"Lifestage",queryName:"lifestage",filterName:"f_c_lifestage"},criteria_work:{label:"Work",queryName:"work",filterName:"f_c_work"},criteria_location:{label:"Location",queryName:"loc",filterName:"f_c_location"},criteria_residency_status:{label:"Residency status",queryName:"residency",filterName:"f_c_residency_status"}};function s(){return i}function r(e){const t=Object.keys(i);for(var s=0;s<t.length;s++){const r=t[s];if(i[r].queryName===e)return i[r]}}e.exports={getCriteriaFields:s,getCriteriaFromQuery:r}},"90fe":function(e,t,i){const s=i("bc3a");function r(e,t,i){e[i]&&t[i]?e[i]=[...e[i],...t[i]]:!e[i]&&t[i]&&(e[i]=t[i])}async function a(e,t){try{const i=await s({method:"get",url:e,auth:t});return i}catch(i){return console.log(i),!1}}async function n(e,t){const i=await a(e,t),s=i.data,l=!!(s&&s.links&&s.links.next&&s.links.next.href)&&i.data.links.next.href;if(delete s.links,l){const e=await n(l,t),i=Object.assign({},s);return r(i,e,"data"),r(i,e,"included"),i}return s}function l(e,t){const i=Array.isArray(e)?"array":typeof e;let s=[];switch(i){case"array":e.forEach(e=>{s.push(`${t}[]=${e}`)});break;case"string":case"number":s.push(`${t}=${e}`);break;case"object":Object.keys(e).forEach(i=>{const r=l(e[i],`${t}[${i}]`);s=[...s,...r]});break}return s}function o(e){let t=[];return e.include&&e.include.length>0&&t.push("include="+e.include.join(",")),e.sort&&e.sort.length>0&&t.push("sort="+e.sort.join(",")),e.page&&(t=[...t,...l(e.page,"page")]),e.filter&&(t=[...t,...l(e.filter,"filter")]),`${e.endpoint}?${t.join("&")}`}async function c(e){const t=await a(o(e),e.endpointAuth);return t.data}async function u(e){const t=await n(o(e),e.endpointAuth);return t}e.exports={queryAPI:c,queryAPIAll:u}},"99ca":function(e,t,i){const s=i("09bb"),r=i("769a");async function a(e){const t=await s.loadCriteria(e);return r.criteria(t)}async function n(e,t){const i=await s.loadServiceInteractions(e,t),a=r.serviceInteraction(i),n=new Set;a.forEach(e=>n.add(e.service_id));const l=await s.loadServices(e,{filter:{group_tid:{condition:{path:"tid",value:Array.from(n),operator:"IN"}}}}),o=r.service(l),c={};o&&o.forEach(e=>{e.interactions=[],c[e.tid]=e}),a.forEach(e=>{c[e.service_id]?c[e.service_id].name||(console.log(`Error: Setting service ${e.service_id} name to ${e.service_label}`),c[e.service_id].name=e.service_label):(console.log(`Error: Was unable to find a service group for tid ${e.service_id}. Creating fallback.`),c[e.service_id]={id:null,interactions:[],name:e.service_label,tid:null}),c[e.service_id].interactions.push(e)});const u=Object.keys(c).map(e=>c[e]).sort((e,t)=>e.name.localeCompare(t.name));return{services:u,totalCount:parseInt(i.meta.count)}}async function l(e,t){const i=await s.loadFullServiceInteraction(e,t);return r.fullServiceInteraction(i)}e.exports={getCriteria:a,getGroupedServiceInteractions:n,getFullServiceInteraction:l}},af34:function(e,t,i){},b50d:function(e,t,i){},b761:function(e,t,i){"use strict";var s=i("185f"),r=i.n(s);r.a},c565:function(e,t,i){"use strict";var s=i("6278"),r=i.n(s);r.a},cb13:function(e,t,i){"use strict";var s=i("f314"),r=i.n(s);r.a},dd3c:function(e,t,i){"use strict";var s=i("5b83"),r=i.n(s);r.a},e1d0:function(e,t,i){},eb29:function(e,t,i){"use strict";var s=i("b50d"),r=i.n(s);r.a},ebf2:function(e,t,i){"use strict";var s=i("af34"),r=i.n(s);r.a},ee0b:function(e,t,i){},f314:function(e,t,i){}});