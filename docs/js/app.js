(function(e){function t(t){for(var n,s,o=t[0],l=t[1],c=t[2],p=0,d=[];p<o.length;p++)s=o[p],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&d.push(i[s][0]),i[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(d.length)d.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,o=1;o<r.length;o++){var l=r[o];0!==i[l]&&(n=!1)}n&&(a.splice(t--,1),e=s(s.s=r[0]))}return e}var n={},i={app:0},a=[];function s(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=n,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0392":function(e,t,r){"use strict";var n=r("e1d0"),i=r.n(n);i.a},"09bb":function(e,t,r){r("4de4"),r("96cf");var n=r("c973"),i=r("90fe"),a=i.queryAPI,s=i.queryAPIAll;function o(e){return l.apply(this,arguments)}function l(){return l=n(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s({endpoint:"".concat(t.url,"api/v1/eligibility_criteria"),endpointAuth:t.auth,sort:["weight"]});case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function c(e,t){return u.apply(this,arguments)}function u(){return u=n(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a({endpoint:"".concat(t.url,"api/v1/taxonomy_term/services"),endpointAuth:t.auth,filter:r.filter,sort:["name"]});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}function p(e,t){return d.apply(this,arguments)}function d(){return d=n(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a({endpoint:"".concat(t.url,"api/v1/node/service_interaction"),endpointAuth:t.auth,include:[],filter:r.filter,sort:["f_service.name","title"],page:r.page});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function f(e,t){return _.apply(this,arguments)}function _(){return _=n(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=7;break}return e.next=3,a({endpoint:"".concat(t.url,"api/v1/node/service_interaction"),endpointAuth:t.auth,include:["f_agency"],filter:{nid:r}});case 3:return n=e.sent,e.abrupt("return",n);case 7:return e.abrupt("return",!1);case 8:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}e.exports={loadCriteria:o,loadServices:c,loadServiceInteractions:p,loadFullServiceInteraction:f}},"0fc5":function(e,t,r){"use strict";var n=r("3e80"),i=r.n(n);i.a},"185f":function(e,t,r){},"3e80":function(e,t,r){},"401e":function(e,t){e.exports={domain:{dev:{url:"https://nginx-php.master.qld-bsc.au2.amazee.io/",auth:{username:"bsc",password:"bsc2020"}},master:{url:"https://nginx-php.master.qld-bsc.au2.amazee.io/",auth:{username:"bsc",password:"bsc2020"}}}}},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),i=r("8c4f"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("router-view",{staticClass:"app"})},s=[],o=(r("0392"),r("2877")),l={},c=Object(o["a"])(l,a,s,!1,null,null,null),u=c.exports,p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"profile"},[e.networkError?r("div",[r("h1",[e._v("Network error")]),r("p",[e._v("A network error occurred connecting to the API.")])]):r("div",[r("div",{staticClass:"profile__image",class:{"profile__image--middle-remote":"middle-remote"===e.profile,"profile__image--middle-regional":"middle-regional"===e.profile,"profile__image--senior":"senior"===e.profile,"profile__image--renter":"renter"===e.profile,"profile__image--custom":"custom"===e.profile}}),r("h1",{staticClass:"profile__title"},[e._v("Select a profile")]),r("div",{staticClass:"input__select-wrapper"},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.profile,expression:"profile"}],staticClass:"input__select",on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.profile=t.target.multiple?r:r[0]},e.updateForm]}},[r("option",{attrs:{value:""}},[e._v("None")]),r("option",{attrs:{value:"middle-remote"}},[e._v("Middle Aged - Country")]),r("option",{attrs:{value:"middle-regional"}},[e._v("Middle Aged - City")]),r("option",{attrs:{value:"senior"}},[e._v("Senior")]),r("option",{attrs:{value:"renter"}},[e._v("Aussie Renter")]),r("option",{attrs:{value:"custom"}},[e._v("Custom")])])]),e.profile?r("div",{staticClass:"profile__form"},["custom"===e.profile?r("p",[e._v("Please fill out the following form to get a list of available services.")]):r("p",[e._v("This profile uses the following values to get a list of available services.")]),e._l(e.form,(function(t,n){return r("div",{key:n},[r("label",[r("span",{staticClass:"input__label"},[e._v(e._s(t.label))]),r("div",{staticClass:"input__select-wrapper"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],staticClass:"input__select",on:{change:function(r){var n=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"value",r.target.multiple?n:n[0])}}},e._l(t.options,(function(t,i){return r("option",{key:"field-"+n+"-"+i,domProps:{value:t.id}},[e._v(e._s(t.name))])})),0)])])])}))],2):e._e(),e.profile?r("button",{staticClass:"btn",on:{click:e.submit}},[e._v("See the results")]):e._e()])])},d=[],f=(r("7db0"),r("4160"),r("b0c0"),r("b64b"),r("159b"),r("96cf"),r("1da1")),_=r("99ca"),v=r.n(_),m=r("401e"),h=r.n(m),g=r("7fe6"),b=r.n(g),y={name:"ProfilePage",data:function(){return{networkError:!1,profile:"",fieldMap:b.a.getCriteriaFields(),profileForms:{"middle-remote":{age:"6"},"middle-regional":{lifestage:"63"},senior:{age:"8"},renter:{housing:"53",residency:"73"}},form:[]}},computed:{isDev:function(){return this.$route.query.dev&&"true"===this.$route.query.dev}},methods:{load:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=e.isDev?h.a.domain.dev:h.a.domain.master,t.next=4,v.a.getCriteria(r);case 4:n=t.sent,Object.keys(n).forEach((function(t){var r=n[t],i=e.fieldMap[t];if(i){var a=e.getAnyId(r);e.form.push({label:i.label,value:a,name:i.queryName,options:r})}})),t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0),e.networkError=!0;case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getAnyId:function(e){var t=e.find((function(e){return"Any"===e.name}));return t?t.id:""},updateForm:function(){var e=this;if(""!==this.profile){var t="custom"===this.profile;this.form.forEach((function(r){!t&&e.profileForms[e.profile][r.name]?r.value=e.profileForms[e.profile][r.name]:r.value=e.getAnyId(r.options)}))}},submit:function(){var e=this;if(this.profile.length>0){var t={};this.form.forEach((function(r){var n=e.getAnyId(r.options);r.value!==n&&(t[r.name]=[n,r.value])})),this.isDev&&(t["dev"]="true"),this.$router.push({name:"results",query:t})}}},created:function(){this.load()}},w=y,C=(r("eb29"),Object(o["a"])(w,p,d,!1,null,null,null)),x=C.exports,k=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"app"},[r("div",{staticClass:"results-page-control-panel"},[r("button",{staticClass:"full-view__back",on:{click:e.backToProfile}},[e._v("Back")]),r("div",{staticClass:"results-page-control-panel__right"},[r("div",{staticClass:"control-field"},[r("label",{attrs:{for:"items-per-page-view-as"}},[e._v("View as")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.viewMode,expression:"viewMode"}],staticClass:"control-field__select",attrs:{id:"items-per-page-view-as"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.viewMode=t.target.multiple?r:r[0]},e.updateView]}},[r("option",{attrs:{value:"accordion"}},[e._v("Accordion")]),r("option",{attrs:{value:"list"}},[e._v("List")])])]),r("div",{staticClass:"control-field"},[r("label",{attrs:{for:"items-per-page-items-per-page"}},[e._v("Items per page")]),r("select",{directives:[{name:"model",rawName:"v-model",value:e.itemsPerPageControl.input,expression:"itemsPerPageControl.input"}],staticClass:"control-field__select",attrs:{id:"items-per-page-items-per-page"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.itemsPerPageControl,"input",t.target.multiple?r:r[0])},e.updateItemsPerPage]}},e._l(e.itemsPerPageControl.values,(function(t,n){return r("option",{key:n,domProps:{value:t}},[e._v(e._s(t))])})),0)])])]),"loading"===e.state?r("loading"):e._e(),"display"===e.state?["accordion"===e.viewMode?r("results",{attrs:{list:this.dataset.services},on:{selected:e.selectedResult}}):e._e(),"list"===e.viewMode?r("results-list",{attrs:{list:this.dataset.services,"start-count-at":e.pager.itemsPerStep*(e.pager.currentStep-1)+1},on:{selected:e.selectedResult}}):e._e(),e.totalSteps>1?r("pager",{attrs:{initial:e.pager.currentStep,perstep:e.pager.itemsPerStep,total:e.totalSteps},on:{change:e.pagerChange}}):e._e()]:e._e(),"error"===e.state?r("error",{on:{retry:e.load}}):e._e(),"no-results"===e.state?r("div",[r("p",[e._v("No results were found.")])]):e._e()],2)},P=[],S=(r("c975"),r("ac1f"),r("5319"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.list.length>0?r("ul",{staticClass:"result"},e._l(e.list,(function(t,n){return r("li",{key:n,staticClass:"result__item"},[r("h3",{staticClass:"result__item-title"},[r("button",{staticClass:"result__item-title-button",class:{"result__item-title-button--expanded":e.expanded[n]},on:{click:function(t){return e.toggleExpand(n)}}},[r("span",[e._v(e._s(t.name))]),t.interactions.length>0?r("span",[e._v(" ("+e._s(t.interactions.length)+" service "+e._s(1===t.interactions.length?"interaction":"interactions")+")")]):e._e()])]),e.expanded[n]?r("div",[t.id>=0?[r("h4",[e._v("Service")]),r("div",{staticClass:"result__service"},[r("p",[e._v(e._s(t.description))]),r("button",{staticClass:"btn btn--small",on:{click:function(r){return e.selected(t)}}},[e._v("Read more about "+e._s(t.name.toLowerCase()))])])]:e._e(),r("h4",[e._v("Service interactions")]),0===t.interactions.length?r("p",{staticClass:"result__service"},[e._v("No service interactions available.")]):r("ol",{staticClass:"result__interactions"},e._l(t.interactions,(function(t,i){return r("li",{key:"service-"+n+"-"+i,staticClass:"result__interaction"},[r("div",{staticClass:"result__interaction-cell result__interaction-cell--first"},[r("h4",{staticClass:"result__interaction-title"},[r("button",{staticClass:"btn btn--small",on:{click:function(r){return e.selected(t)}}},[e._v(e._s(t.name))])])]),r("div",{staticClass:"result__interaction-cell result__interaction-cell--last"},[r("span",[e._v(e._s(t.description))])])])})),0)],2):e._e()])})),0):r("div",{staticClass:"result__no-items"},[e._v("Sorry we could not find any results")])])}),N=[],A=(r("d81d"),{name:"Results",components:{},props:{list:Array},data:function(){return{expanded:this.list.map((function(){return!1}))}},methods:{selected:function(e){this.$emit("selected",e)},toggleExpand:function(e){this.expanded[e]=n["a"].set(this.expanded,e,!this.expanded[e])}}}),R=A,q=(r("ebf2"),Object(o["a"])(R,S,N,!1,null,null,null)),O=q.exports,$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.list.length>0?r("table",{staticClass:"result"},[e._m(0),r("tbody",e._l(e.interactionList,(function(t,n){return r("tr",{key:n,staticClass:"result__row"},[r("td",{staticClass:"result__cell"},[e._v(" "+e._s(t.count)+" ")]),r("td",{staticClass:"result__cell"},[r("button",{staticClass:"btn btn--small",on:{click:function(r){return e.selected(t.interaction)}}},[e._v(e._s(t.interaction.name))])]),r("td",{staticClass:"result__cell"},[r("span",[e._v(e._s(t.interaction.description))])]),r("td",{staticClass:"result__cell"},[r("button",{staticClass:"btn btn--small",on:{click:function(r){return e.selected(t.service)}}},[e._v(e._s(t.service.name))])])])})),0)]):r("div",{staticClass:"result__no-items"},[e._v("Sorry we could not find any results")])])},I=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("thead",[r("tr",[r("th",{staticClass:"result__head-cell",attrs:{"aria-label":"Item number"}},[e._v("#")]),r("th",{staticClass:"result__head-cell"},[e._v("Interaction")]),r("th",{staticClass:"result__head-cell"},[e._v("Description")]),r("th",{staticClass:"result__head-cell"},[e._v("Service")])])])}],E=(r("a9e3"),{name:"Results",components:{},props:{list:Array,startCountAt:Number},computed:{interactionList:function(){var e=this,t=[];return this.list.forEach((function(r){r.interactions.forEach((function(n){t.push({count:e.startCountAt+t.length,interaction:n,service:r})}))})),t}},methods:{selected:function(e){this.$emit("selected",e)}}}),j=E,M=(r("c565"),Object(o["a"])(j,$,I,!1,null,null,null)),F=M.exports,D=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("nav",{staticClass:"pager"},[e.current>1?r("button",{staticClass:"pager__prev",on:{click:e.prevPage}},[r("span",[e._v("Prev")])]):e._e(),r("ul",{staticClass:"pager__page-list"},e._l(e.range,(function(t,n){return r("li",{key:n,staticClass:"pager__item"},["..."===t?r("span",{staticClass:"pager__item-dots"},[e._v(e._s(t))]):r("button",{staticClass:"pager__item-btn",class:{"pager__item-btn--current":e.current===t},on:{click:function(r){return e.change(t)}}},[r("span",{staticClass:"pager__hidden"},[e._v("Page: ")]),r("span",{staticClass:"pager__btn-text"},[e._v(e._s(t))])])])})),0),e.current<e.total?r("button",{staticClass:"pager__next",on:{click:e.nextPage}},[r("span",{staticClass:"pager__btn-text"},[e._v("Next")])]):e._e()])},L=[],T={name:"Pager",components:{},props:{initial:Number,perstep:Number,total:Number},data:function(){return{current:this.initial}},methods:{change:function(e){this.current=e,this.$emit("change",e)},prevPage:function(){this.change(this.current-1)},nextPage:function(){this.change(this.current+1)}},computed:{range:function(){var e=[];if(this.total>6){var t=this.current,r=this.total;t>2&&e.push(1),t>3&&e.push("..."),t===r&&e.push(t-2),t>1&&e.push(t-1),e.push(t),t+1<r&&e.push(t+1),1===t&&e.push(3),t<r-2&&e.push("..."),t<r&&e.push(r)}else for(var n=1;n<=this.total;n++)e.push(n);return e}},watch:{initial:function(e){this.current=e}}},J=T,V=(r("dd3c"),Object(o["a"])(J,D,L,!1,null,null,null)),G=V.exports,W=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"error"},[r("p",{staticClass:"error__message"},[e._v("An error has occurred trying to get data.")]),r("p",{staticClass:"error__message"},[e._v("You can retry by clicking the button below:")]),r("button",{staticClass:"btn",on:{click:e.retry}},[e._v("Retry")])])},B=[],H={methods:{retry:function(){this.$emit("retry")}}},Q=H,z=(r("7ab1"),Object(o["a"])(Q,W,B,!1,null,null,null)),K=z.exports,Y=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},U=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"loading"},[r("span",[e._v("Loading")])])}],X=(r("cb13"),{}),Z=Object(o["a"])(X,Y,U,!1,null,null,null),ee=Z.exports,te={name:"ResultsPage",components:{Results:O,ResultsList:F,Pager:G,Error:K,Loading:ee},data:function(){return{dataset:null,state:"loading",pager:{currentStep:1,itemsPerStep:10,totalCount:1},itemsPerPageControl:{default:25,input:null,values:[10,25,50]},ignoreQueryKeys:["page","dev","items","view"],defaultViewMode:"accordion",viewMode:"accordion"}},computed:{totalSteps:function(){return Math.ceil(this.dataset.totalCount/this.pager.itemsPerStep)},isDev:function(){return this.$route.query.dev&&"true"===this.$route.query.dev}},methods:{getAPIFilter:function(){var e=this,t=this.$route.query,r={};return Object.keys(t).forEach((function(n){if(-1===e.ignoreQueryKeys.indexOf(n)){var i=t[n];if(i){var a=b.a.getCriteriaFromQuery(n);if(Array.isArray(i)){var s=a.filterName.replace("f_c_","group_");r[s]={condition:{value:i,path:a.filterName,operator:"IN"}}}else r[a.filterName]={value:i}}}})),r},getAPIPage:function(){var e={limit:this.pager.itemsPerStep},t=(this.pager.currentStep-1)*this.pager.itemsPerStep;return t>0&&(e["offset"]=t),e},loadDataset:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var r,n,i,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.getAPIFilter(),n=e.getAPIPage(),i=e.isDev?h.a.domain.dev:h.a.domain.master,t.next=5,v.a.getGroupedServiceInteractions(i,{filter:r,page:n});case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)})))()},load:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.state="loading",t.next=4,e.loadDataset();case 4:r=t.sent,r?(e.dataset=r,e.state="display"):e.state="no-results",t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0),e.state="error";case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},pagerChange:function(e){var t=this,r=JSON.parse(JSON.stringify(this.$route.query));delete r["page"],e>1&&(r["page"]=e),this.$router.push({query:r}),this.$nextTick((function(){t.$refs["app"].scrollIntoView({behavior:"smooth"})}))},selectedResult:function(e){var t={};this.isDev&&(t["dev"]="true"),this.$router.push({name:"service",params:{id:e.id},query:t})},backToProfile:function(){var e={};this.isDev&&(e["dev"]="true"),this.$router.push({path:"/",query:e})},updateItemsPerPage:function(){var e=JSON.parse(JSON.stringify(this.$route.query));delete e["items"],delete e["page"],this.itemsPerPageControl.input!=this.itemsPerPageControl.default&&(e["items"]=this.itemsPerPageControl.input),this.$router.push({query:e})},updateView:function(){var e=JSON.parse(JSON.stringify(this.$route.query));delete e["view"],this.viewMode!=this.defaultViewMode&&(e["view"]=this.viewMode),this.$router.push({query:e})},setState:function(e){this.pager.currentStep=e.page?parseInt(e.page,10):1,this.pager.itemsPerStep=e.items?parseInt(e.items,10):this.itemsPerPageControl.default,this.itemsPerPageControl.input=this.pager.itemsPerStep,this.viewMode=e.view?e.view:this.defaultViewMode,this.load()}},created:function(){this.setState(this.$route.query)},watch:{$route:function(e){this.setState(e.query)}}},re=te,ne=(r("0fc5"),Object(o["a"])(re,k,P,!1,null,null,null)),ie=ne.exports,ae=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"full-view"},[r("button",{staticClass:"btn--left",on:{click:e.back}},[e._v("Back")]),"loading"===e.state?r("loading"):e._e(),"display"===e.state?[e.selected?r("div",{staticClass:"full-view__body"},[r("div",{staticClass:"full-view__main"},[r("h1",{staticClass:"full-view__title"},[e._v(e._s(e.selected.name))]),e._l(e.displayFields,(function(t,n){return r("div",{key:"body-"+n},[r("h2",[e._v(e._s(t.title))]),r("p",{domProps:{innerHTML:e._s(t.html)}})])}))],2),r("div",{staticClass:"full-view__sidebar"},[r("div",{staticClass:"full-view__contact"},e._l(e.displaySidebarGroups,(function(t,n){return r("div",{key:"contact-group-"+n,staticClass:"full-view__side-group"},[t.title?r("h2",[e._v(e._s(t.title))]):e._e(),e._l(t.fields,(function(t,i){return r("div",{key:"contact-group-"+n+"-"+i,staticClass:"full-view__side-field"},[r("strong",[e._v(e._s(t.title))]),r("p",{domProps:{innerHTML:e._s(t.html)}})])}))],2)})),0)])]):e._e()]:e._e(),"error"===e.state?r("error",{on:{retry:e.load}}):e._e(),"no-results"===e.state?r("div",[r("p",[e._v("No results were returned.")])]):e._e()],2)},se=[],oe=(r("99af"),{name:"FullPage",components:{Error:K,Loading:ee},data:function(){return{state:"loading",selected:null,fields:[{title:"Description",field:"long_description"},{title:"Who is eligible?",field:"who_is_eligible"},{title:"What you will need",field:"prerequisites"},{title:"How to",field:"how_to"},{title:"Fees",field:"fees",type:"url"},{title:"Do it online",field:"do_it_online_url",type:"url"},{title:"More information",field:"more_information_url",type:"url"},{title:"Form",field:"form_url",type:"url"},{title:"Who do I call?",field:"who_do_i_call"},{title:"Message applied",field:"message_applied"},{title:"Message problem",field:"message_problem"},{title:"Message progress",field:"message_progress"},{title:"Message provisioned",field:"message_provisioned"}],sidebarGroups:[{title:"Agency",fields:[{title:"Type",field:"agency_type"},{title:"Name",field:"agency_name"},{title:"Acronym",field:"agency_acronym"},{title:"Website",field:"agency_website_url",type:"url"}]},{title:"Service",fields:[{title:"Business",field:"business_unit_name"},{title:"Owner",field:"service_owner_name"},{title:"Email",field:"service_owner_email",type:"email"}]}]}},computed:{displayFields:function(){var e=this,t=[];return this.fields.forEach((function(r){var n=e.parseField(r);n&&t.push({title:r.title,html:n})})),t},displaySidebarGroups:function(){var e=this,t=[];return this.sidebarGroups.forEach((function(r){var n=[];r.fields.forEach((function(t){var r=e.parseField(t);r&&n.push({title:t.title,html:r})})),n.length>0&&t.push({title:r.title,fields:n})})),t},isDev:function(){return this.$route.query.dev&&"true"===this.$route.query.dev}},methods:{back:function(){this.$router.go(-1)},parseField:function(e){if(this.selected[e.field]){var t=e.type?e.type:"text",r=this.selected[e.field];switch(t){case"text":r.indexOf("<p>")<0&&(r=r.replace(/\n/g,"<br/>"));break;case"url":0===r.indexOf("http")&&(r='<a href="'.concat(r,'">').concat(r,"</a>"));break;case"email":r='<a href="mailto:'.concat(r,'">').concat(r,"</a>");break}return r}return!1},load:function(){var e=this;return Object(f["a"])(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.state="loading",r=e.isDev?h.a.domain.dev:h.a.domain.master,t.next=5,v.a.getFullServiceInteraction(r,e.$route.params.id);case 5:n=t.sent,n?(e.selected=n,e.state="display"):e.state="no-results",t.next=13;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0),e.state="error";case 13:case"end":return t.stop()}}),t,null,[[0,9]])})))()}},created:function(){this.load()}}),le=oe,ce=(r("b761"),Object(o["a"])(le,ae,se,!1,null,null,null)),ue=ce.exports;n["a"].config.productionTip=!1,n["a"].use(i["a"]);var pe=new i["a"]({mode:"hash",routes:[{path:"/",component:x},{path:"/results",name:"results",component:ie},{path:"/service/:id",name:"service",component:ue}]});new n["a"]({router:pe,render:function(e){return e(u)}}).$mount("#app")},"5b83":function(e,t,r){},6278:function(e,t,r){},"769a":function(e,t,r){function n(e,t){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=t.split("."),i=e,a=0;a<n.length;a++){var s=n[a];if(void 0===i[s]||null===i[s]){i=r;break}i=i[s]}return i}function i(e){if(e.data&&e.data.length>0){var t=e.data[0],r=t.type.replace("node--",""),i=t.attributes,a={type:r,id:i.drupal_internal__nid,name:i.title,service_id:n(t,"relationships.f_service.data.meta.drupal_internal__nid",""),agency_service_id:n(i,"f_agency_service_id",""),do_it_online_url:n(i,"f_do_it_online_url.uri",""),fees:n(i,"f_fees.processed",""),form_url:n(i,"f_form_url.uri",""),how_to:n(i,"f_how_to.processed",""),in_person:n(i,"f_in_person",""),keywords:n(i,"f_keywords",""),long_description:n(i,"f_long_description.processed",""),more_information_url:n(i,"f_more_information_url.uri",""),old_qgs_id:n(i,"f_old_qgs_id",""),old_sir_id:n(i,"f_old_sir_id",""),prerequisites:n(i,"f_prerequisites.processed",""),business_unit_name:n(i,"f_business_unit_name",""),service_owner_name:n(i,"f_service_owner_name",""),service_owner_email:n(i,"f_service_owner_email",""),service_owner_status:n(i,"f_service_owner_status",""),service_date:n(i,"f_service_date.value",""),service_date_end:n(i,"f_service_date.end_value",""),service_status:n(i,"f_service_status",""),service_type:n(i,"f_service_type",""),service_validated_date:n(i,"f_service_validated_date",""),short_description:n(i,"f_short_description",""),who_do_i_call:n(i,"f_who_do_i_call",""),who_is_eligible:n(i,"f_who_is_eligible.processed",""),message_applied:n(i,"f_message_applied.processed",""),message_problem:n(i,"f_message_problem.processed",""),message_progress:n(i,"f_message_progress.processed",""),message_provisioned:n(i,"f_message_provisioned.processed","")};if(t.relationships.f_agency){for(var s=t.relationships.f_agency.data.id,o=t.relationships.f_agency.data.type,l=null,c=0;c<e.included.length;c++){var u=e.included[c];if(u.type===o&&u.id===s){l=u;break}}l&&(a["agency_name"]=n(l,"attributes.name",""),a["agency_type"]=n(l,"attributes.f_agency_type",""),a["agency_acronym"]=n(l,"attributes.f_agency_acronym",""),a["agency_website_url"]=n(l,"attributes.f_agency_website_url.uri",""))}return a}return!1}function a(e){if(e.data&&e.data.length>0){var t={};return e.data.forEach((function(e){var r=e.type.replace("taxonomy_term--","");void 0===t[r]&&(t[r]=[]),t[r].push({id:e.attributes.drupal_internal__tid,name:e.attributes.name})})),t}return!1}function s(e){if(e.data&&e.data.length>0){var t=[];return e.data.forEach((function(e){t.push({tid:e.attributes.drupal_internal__tid,id:n(e,"relationships.f_default_service_interaction.data.meta.drupal_internal__nid"),name:n(e,"relationships.f_default_service_interaction.data.meta.label"),description:n(e,"relationships.f_default_service_interaction.data.meta.f_short_description")})})),t}return!1}function o(e){if(e.data&&e.data.length>0){var t=[];return e.data.forEach((function(e){t.push({id:e.attributes.drupal_internal__nid,name:e.attributes.title,description:n(e,"attributes.f_short_description"),service_id:n(e,"relationships.f_service.data.meta.drupal_internal__tid"),service_label:n(e,"relationships.f_service.data.meta.label")})})),t}return!1}r("4160"),r("b0c0"),r("ac1f"),r("5319"),r("1276"),r("159b"),e.exports={criteria:a,service:s,fullServiceInteraction:i,serviceInteraction:o}},"7ab1":function(e,t,r){"use strict";var n=r("ee0b"),i=r.n(n);i.a},"7fe6":function(e,t,r){r("b64b");var n={criteria_age:{label:"Age",queryName:"age",filterName:"f_c_age"},criteria_authentication_level:{label:"Authentication level",queryName:"auth",filterName:"f_c_authentication_level"},criteria_business_sector:{label:"Business sector",queryName:"sector",filterName:"f_c_business_sector"},criteria_card_licences_permits:{label:"Card, licenses and permits",queryName:"permits",filterName:"f_c_card_licences_permits"},criteria_housing:{label:"Housing",queryName:"housing",filterName:"f_c_housing"},criteria_lifestage:{label:"Lifestage",queryName:"lifestage",filterName:"f_c_lifestage"},criteria_work:{label:"Work",queryName:"work",filterName:"f_c_work"},criteria_location:{label:"Location",queryName:"loc",filterName:"f_c_location"},criteria_residency_status:{label:"Residency status",queryName:"residency",filterName:"f_c_residency_status"}};function i(){return n}function a(e){for(var t=Object.keys(n),r=0;r<t.length;r++){var i=t[r];if(n[i].queryName===e)return n[i]}}e.exports={getCriteriaFields:i,getCriteriaFromQuery:a}},"90fe":function(e,t,r){r("99af"),r("4de4"),r("4160"),r("a15b"),r("b64b"),r("159b"),r("96cf");var n=r("7037"),i=r("c973"),a=r("448a"),s=r("bc3a");function o(e,t,r){e[r]&&t[r]?e[r]=[].concat(a(e[r]),a(t[r])):!e[r]&&t[r]&&(e[r]=t[r])}function l(e,t){return c.apply(this,arguments)}function c(){return c=i(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s({method:"get",url:t,auth:r});case 3:return n=e.sent,e.abrupt("return",n);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[0,7]])}))),c.apply(this,arguments)}function u(e,t){return p.apply(this,arguments)}function p(){return p=i(regeneratorRuntime.mark((function e(t,r){var n,i,a,s,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l(t,r);case 2:if(n=e.sent,i=n.data,a=!!(i&&i.links&&i.links.next&&i.links.next.href)&&n.data.links.next.href,delete i.links,!a){e.next=16;break}return e.next=9,u(a,r);case 9:return s=e.sent,c=Object.assign({},i),o(c,s,"data"),o(c,s,"included"),e.abrupt("return",c);case 16:return e.abrupt("return",i);case 17:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function d(e,t){var r=Array.isArray(e)?"array":n(e),i=[];switch(r){case"array":e.forEach((function(e){i.push("".concat(t,"[]=").concat(e))}));break;case"string":case"number":i.push("".concat(t,"=").concat(e));break;case"object":Object.keys(e).forEach((function(r){var n=d(e[r],"".concat(t,"[").concat(r,"]"));i=[].concat(a(i),a(n))}));break}return i}function f(e){var t=[];return e.include&&e.include.length>0&&t.push("include=".concat(e.include.join(","))),e.sort&&e.sort.length>0&&t.push("sort=".concat(e.sort.join(","))),e.page&&(t=[].concat(a(t),a(d(e.page,"page")))),e.filter&&(t=[].concat(a(t),a(d(e.filter,"filter")))),"".concat(e.endpoint,"?").concat(t.join("&"))}function _(e){return v.apply(this,arguments)}function v(){return v=i(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l(f(t),t.endpointAuth);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)}))),v.apply(this,arguments)}function m(e){return h.apply(this,arguments)}function h(){return h=i(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u(f(t),t.endpointAuth);case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}e.exports={queryAPI:_,queryAPIAll:m}},"99ca":function(e,t,r){r("4160"),r("a630"),r("d81d"),r("b0c0"),r("b64b"),r("d3b7"),r("6062"),r("3ca3"),r("159b"),r("ddb0"),r("96cf");var n=r("c973"),i=r("09bb"),a=r("769a");function s(e){return o.apply(this,arguments)}function o(){return o=n(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.loadCriteria(t);case 2:return r=e.sent,e.abrupt("return",a.criteria(r));case 4:case"end":return e.stop()}}),e)}))),o.apply(this,arguments)}function l(e,t){return c.apply(this,arguments)}function c(){return c=n(regeneratorRuntime.mark((function e(t,r){var n,s,o,l,c,u,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.loadServiceInteractions(t,r);case 2:return n=e.sent,s=a.serviceInteraction(n),o=new Set,s.forEach((function(e){return o.add(e.service_id)})),e.next=8,i.loadServices(t,{filter:{group_tid:{condition:{path:"tid",value:Array.from(o),operator:"IN"}}}});case 8:return l=e.sent,c=a.service(l),u={},c.forEach((function(e){e.interactions=[],u[e.tid]=e})),s.forEach((function(e){return u[e.service_id].interactions.push(e)})),p=Object.keys(u).map((function(e){return u[e]})).sort((function(e,t){return e.name.localeCompare(t.name)})),e.abrupt("return",{services:p,totalCount:parseInt(n.meta.count)});case 15:case"end":return e.stop()}}),e)}))),c.apply(this,arguments)}function u(e,t){return p.apply(this,arguments)}function p(){return p=n(regeneratorRuntime.mark((function e(t,r){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.loadFullServiceInteraction(t,r);case 2:return n=e.sent,e.abrupt("return",a.fullServiceInteraction(n));case 4:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}e.exports={getCriteria:s,getGroupedServiceInteractions:l,getFullServiceInteraction:u}},af34:function(e,t,r){},b50d:function(e,t,r){},b761:function(e,t,r){"use strict";var n=r("185f"),i=r.n(n);i.a},c565:function(e,t,r){"use strict";var n=r("6278"),i=r.n(n);i.a},cb13:function(e,t,r){"use strict";var n=r("f314"),i=r.n(n);i.a},dd3c:function(e,t,r){"use strict";var n=r("5b83"),i=r.n(n);i.a},e1d0:function(e,t,r){},eb29:function(e,t,r){"use strict";var n=r("b50d"),i=r.n(n);i.a},ebf2:function(e,t,r){"use strict";var n=r("af34"),i=r.n(n);i.a},ee0b:function(e,t,r){},f314:function(e,t,r){}});