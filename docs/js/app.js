(function(e){function t(t){for(var i,s,l=t[0],o=t[1],c=t[2],_=0,f=[];_<l.length;_++)s=l[_],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i]);u&&u(t);while(f.length)f.shift()();return n.push.apply(n,c||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],i=!0,l=1;l<r.length;l++){var o=r[l];0!==a[o]&&(i=!1)}i&&(n.splice(t--,1),e=s(s.s=r[0]))}return e}var i={},a={app:0},n=[];function s(t){if(i[t])return i[t].exports;var r=i[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=i,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(r,i,function(t){return e[t]}.bind(null,i));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],o=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=o;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"0392":function(e,t,r){"use strict";var i=r("e1d0"),a=r.n(i);a.a},"09bb":function(e,t,r){r("99af"),r("4de4"),r("4160"),r("a15b"),r("d81d"),r("b0c0"),r("b64b"),r("ac1f"),r("5319"),r("159b");var i=r("448a");r("96cf");var a=r("c973"),n=r("bc3a"),s="https://nginx-php-qld-bsc-master.au.amazee.io/",l={criteria_age:{label:"Age",queryName:"age",fieldName:"f_criteria_age"},criteria_authentication_level:{label:"Authentication level",queryName:"auth",fieldName:"f_criteria_authentication_level"},criteria_business_sector:{label:"Business sector",queryName:"sector",fieldName:"f_criteria_business_sector"},criteria_card_licences_permits:{label:"Card, licenses and permits",queryName:"permits",fieldName:"f_criteria_card_licences_permits"},criteria_housing:{label:"Housing",queryName:"housing",fieldName:"f_criteria_housing"},criteria_lifestage:{label:"Lifestage",queryName:"lifestage",fieldName:"f_criteria_lifestage"},criteria_location:{label:"Location",queryName:"loc",fieldName:"f_criteria_location"},criteria_residency_status:{label:"Residency status",queryName:"residency",fieldName:"f_criteria_residency_status"}};function o(e,t){var r=[];return r.push("include=f_agency"),t&&t.forEach((function(e){e.value&&""!==e.value&&(e.field?r.push("filter[".concat(e.field,".drupal_internal__tid][value]=").concat(e.value)):e.filter?r.push("filter[".concat(e.filter,"][value]=").concat(e.value)):e.page&&r.push("page[".concat(e.page,"]=").concat(e.value)))})),"".concat(e,"api/v1/services?").concat(r.join("&"))}function c(e){return u.apply(this,arguments)}function u(){return u=a(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n({method:"get",url:t,auth:{username:"bsc",password:"bsc2020"}});case 3:return r=e.sent,e.abrupt("return",r);case 7:return e.prev=7,e.t0=e["catch"](0),console.log(e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[0,7]])}))),u.apply(this,arguments)}function _(e){return f.apply(this,arguments)}function f(){return f=a(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c(t);case 2:if(r=e.sent,!(r.data&&r.data.links&&r.data.links.next&&r.data.links.next.href)){e.next=10;break}return e.next=6,_(r.data.links.next.href);case 6:return a=e.sent,e.abrupt("return",[].concat(i(r.data.data),i(a)));case 10:return e.abrupt("return",r.data.data);case 11:case"end":return e.stop()}}),e)}))),f.apply(this,arguments)}function p(){return d.apply(this,arguments)}function d(){return d=a(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_("".concat(s,"api/v1/eligibility_criteria"));case 2:if(t=e.sent,!(t&&t.length>0)){e.next=7;break}return r={},t.forEach((function(e){var t=e.type.replace("taxonomy_term--","");void 0===r[t]&&(r[t]=[]),r[t].push({id:e.attributes.drupal_internal__tid,name:e.attributes.name})})),e.abrupt("return",r);case 7:return e.abrupt("return",!1);case 8:case"end":return e.stop()}}),e)}))),d.apply(this,arguments)}function v(e){var t=e.data[0],r=t.type.replace("node--",""),i=t.attributes,a={type:r,id:i.drupal_internal__nid,service_id:t.relationships.f_service?t.relationships.f_service.data.meta.drupal_internal__nid:"",name:i.title,agency_service_id:i.f_agency_service_id?i.f_agency_service_id:"",do_it_online_url:i.f_do_it_online_url?i.f_do_it_online_url.uri:"",fees:i.f_fees?i.f_fees.processed:"",form_url:i.f_form_url?i.f_form_url.uri:"",how_to:i.f_how_to?i.f_how_to.processed:"",in_person:i.f_in_person?i.f_in_person:"",keywords:i.f_keywords?i.f_keywords:"",long_description:i.f_long_description?i.f_long_description.processed:"",more_information_url:i.f_more_information_url?i.f_more_information_url.uri:"",old_qgs_id:i.f_old_qgs_id?i.f_old_qgs_id:"",old_sir_id:i.f_old_sir_id?i.f_old_sir_id:"",prerequisites:i.f_prerequisites?i.f_prerequisites.processed:"",business_unit_name:i.f_business_unit_name?i.f_business_unit_name:"",service_owner_name:i.f_service_owner_name?i.f_service_owner_name:"",service_owner_email:i.f_service_owner_email?i.f_service_owner_email:"",service_owner_status:i.f_service_owner_status?i.f_service_owner_status:"",service_date:i.f_service_date?i.f_service_date.value:"",service_date_end:i.f_service_date?i.f_service_date.end_value:"",service_status:i.f_service_status?i.f_service_status:"",service_type:i.f_service_type?i.f_service_type:"",service_validated_date:i.f_service_validated_date?i.f_service_validated_date:"",short_description:i.f_short_description?i.f_short_description:"",who_do_i_call:i.f_who_do_i_call?i.f_who_do_i_call:"",who_is_eligible:i.f_who_is_eligible?i.f_who_is_eligible.processed:""};if(t.relationships.f_agency){for(var n=t.relationships.f_agency.data.id,s=t.relationships.f_agency.data.type,l=null,o=0;o<e.included.length;o++){var c=e.included[o];if(c.type===s&&c.id===n){l=c;break}}l&&(a["agency_name"]=l.attributes.name||"",a["agency_type"]=l.attributes.f_agency_type||"",a["agency_acronym"]=l.attributes.f_agency_acronym||"",a["agency_website_url"]=l.attributes.f_agency_website_url.uri||"")}return a}function h(e){return{id:e.attributes.drupal_internal__nid,name:e.attributes.title,description:e.attributes.f_short_description?e.attributes.f_short_description:""}}function m(e){return h(e)}function g(e){return{id:e.relationships.f_service?e.relationships.f_service.data.meta.drupal_internal__nid:"",name:e.relationships.f_service?e.relationships.f_service.data.meta.label:"",description:e.relationships.f_service?e.relationships.f_service.data.meta.f_short_description:""}}function b(e){return!!(e&&e.data&&e.data.data&&e.data.data.length>0)&&e.data.data}function y(e){return w.apply(this,arguments)}function w(){return w=a(regeneratorRuntime.mark((function e(t){var r,i,a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c(o(s,t));case 2:if(r=e.sent,i=b(r),!i){e.next=10;break}return a={},n=[],i.forEach((function(e){var t=e.type.replace("node--",""),r=null;"service"===t?r=h(e):"service_interaction"===t&&(r=g(e),n.push(e)),void 0===a[r.id]&&(r.interactions=[],a[r.id]=r)})),n.forEach((function(e){var t=!!e.relationships.f_service&&e.relationships.f_service.data.meta.drupal_internal__nid;t&&a[t].interactions.push(m(e))})),e.abrupt("return",{totalCount:r.data.meta.count,services:Object.keys(a).map((function(e){return a[e]}))});case 10:return e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e)}))),w.apply(this,arguments)}function C(e){return x.apply(this,arguments)}function x(){return x=a(regeneratorRuntime.mark((function e(t){var r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=6;break}return e.next=3,c(o(s,[{filter:"nid",value:t}]));case 3:return r=e.sent,i=b(r),e.abrupt("return",!!i&&v(r.data));case 6:return e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)}))),x.apply(this,arguments)}function k(){return l}function S(e){for(var t=Object.keys(l),r=0;r<t.length;r++){var i=t[r];if(l[i].queryName===e)return l[i]}}e.exports={loadCriteria:p,loadServices:y,loadFullService:C,getCriteriaFields:k,getCriteriaFromQuery:S}},"185f":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var i=r("2b0e"),a=r("8c4f"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("router-view",{staticClass:"app"})},s=[],l=(r("0392"),r("2877")),o={},c=Object(l["a"])(o,n,s,!1,null,null,null),u=c.exports,_=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"profile"},[e.networkError?r("div",[r("h1",[e._v("Network error")]),r("p",[e._v("A network error occurred connecting to the API. This is likely a CORS issue.")]),r("p",[e._v("This can be resolved by using an extentions to bypass CORS (or by updating our API implementation).")]),e._m(0)]):r("div",[r("div",{staticClass:"profile__image",class:{"profile__image--middle-remote":"middle-remote"===e.profile,"profile__image--middle-regional":"middle-regional"===e.profile,"profile__image--senior":"senior"===e.profile,"profile__image--renter":"renter"===e.profile,"profile__image--custom":"custom"===e.profile}}),r("h1",{staticClass:"profile__title"},[e._v("Select a profile")]),r("div",{staticClass:"filter__input-select-wrapper"},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.profile,expression:"profile"}],staticClass:"filter__select-input",on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.profile=t.target.multiple?r:r[0]},e.updateForm]}},[r("option",{attrs:{value:""}},[e._v("None")]),r("option",{attrs:{value:"middle-remote"}},[e._v("Middle Aged - Country")]),r("option",{attrs:{value:"middle-regional"}},[e._v("Middle Aged - City")]),r("option",{attrs:{value:"senior"}},[e._v("Senior")]),r("option",{attrs:{value:"renter"}},[e._v("Aussie Renter")]),r("option",{attrs:{value:"custom"}},[e._v("Custom")])])]),e.profile?r("div",{staticClass:"profile__form"},["custom"===e.profile?r("p",[e._v("Please fill out the following form to get a list of available services.")]):r("p",[e._v("This profile uses the following values to get a list of available services.")]),e._l(e.form,(function(t,i){return r("div",{key:i},[r("label",[r("span",{staticClass:"profile__form-field-label filter__label"},[e._v(e._s(t.label))]),r("div",{staticClass:"filter__input-select-wrapper"},[r("select",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"field.value"}],staticClass:"filter__select-input",on:{change:function(r){var i=Array.prototype.filter.call(r.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(t,"value",r.target.multiple?i:i[0])}}},[r("option",{attrs:{value:""}}),e._l(t.options,(function(t,a){return r("option",{key:"field-"+i+"-"+a,domProps:{value:t.id}},[e._v(e._s(t.name))])}))],2)])])])}))],2):e._e(),e.profile?r("button",{staticClass:"btn",on:{click:e.submit}},[e._v("See the results")]):e._e()])])},f=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("a",{staticClass:"btn",attrs:{href:"https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/",target:"blank"}},[e._v("Extension for Firefox")])]),r("li",[r("a",{staticClass:"btn",attrs:{href:"https://chrome.google.com/webstore/detail/cross-domain-cors/mjhpgnbimicffchbodmgfnemoghjakai",target:"blank"}},[e._v("Extension for Chrome")])])])}],p=(r("4160"),r("b0c0"),r("b64b"),r("159b"),r("96cf"),r("1da1")),d=r("09bb"),v=r.n(d),h={name:"ProfilePage",data:function(){return{networkError:!1,profile:"",fieldMap:v.a.getCriteriaFields(),profileForms:{"middle-remote":["6","","","","","","",""],"middle-regional":["","","","","","63","",""],senior:["8","","","","","","",""],renter:["","","","","53","","","73"]},form:[]}},methods:{load:function(){var e=this;return Object(p["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v.a.loadCriteria();case 3:r=t.sent,Object.keys(r).forEach((function(t){var i=r[t],a=e.fieldMap[t];e.form.push({label:a.label,value:"",name:a.queryName,options:i})})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e.networkError=!0;case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},updateForm:function(){var e=this;if(""!==this.profile){var t="custom"===this.profile;this.form.forEach((function(r,i){r.value=t?"":e.profileForms[e.profile][i]}))}},submit:function(){if(this.profile.length>0){var e={};this.form.forEach((function(t){t.value&&(e[t.name]=t.value)})),this.$router.push({name:"results",query:e}),window.scrollTo(0,0)}}},created:function(){this.load()}},m=h,g=(r("eb29"),Object(l["a"])(m,_,f,!1,null,null,null)),b=g.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"app"},[r("button",{staticClass:"full-view__back",on:{click:e.backToProfile}},[e._v("Back")]),"loading"===e.listingState?r("div",[r("p",{staticClass:"find-a-provider__message"},[e._v("Loading...")])]):e._e(),"display"===e.listingState?[r("results",{attrs:{list:this.dataset.services},on:{selected:e.selectedResult}}),e.totalSteps>1?r("pager",{attrs:{initial:e.pager.currentStep,perstep:e.pager.itemsPerStep,total:e.totalSteps},on:{change:e.pagerChange}}):e._e()]:e._e(),"error"===e.listingState?r("error",{on:{retry:e.load}}):e._e(),"no-results"===e.listingState?r("div",[r("p",{staticClass:"find-a-provider__message"},[e._v("No results were returned.")])]):e._e()],2)},w=[],C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.list.length>0?r("ul",{staticClass:"result"},e._l(e.list,(function(t,i){return r("li",{key:i,staticClass:"result__list-item"},[r("h3",{staticClass:"result__list-item-title"},[r("button",{staticClass:"result__list-item-title-button",class:{"result__list-item-title-button--expanded":e.expanded[i]},on:{click:function(t){return e.toggleExpand(i)}}},[r("span",[e._v(e._s(t.name))]),r("span",[e._v(" ("+e._s(t.interactions.length)+" service "+e._s(1===t.interactions.length?"interaction":"interactions")+")")])])]),e.expanded[i]?r("div",[t.id>=0?[r("h4",[e._v("Service")]),r("div",{staticClass:"result__sub-paragraph"},[r("p",[e._v(e._s(t.description))]),r("button",{staticClass:"result__subitem-field-title-button",on:{click:function(r){return e.selected(t)}}},[e._v("Read more about "+e._s(t.name.toLowerCase()))])])]:e._e(),r("h4",[e._v("Service interactions")]),0===t.interactions.length?r("p",{staticClass:"result__sub-paragraph"},[e._v("No service interactions available.")]):r("ol",{staticClass:"result__subitems"},e._l(t.interactions,(function(t,a){return r("li",{key:"service-"+i+"-"+a,staticClass:"result__subitem"},[r("div",{staticClass:"result__subitem-field result__subitem-field-1"},[r("h4",{staticClass:"result__subitem-field-title"},[r("button",{staticClass:"result__subitem-field-title-button",on:{click:function(r){return e.selected(t)}}},[e._v(e._s(t.name))])])]),r("div",{staticClass:"result__subitem-field result__subitem-field-2"},[r("span",{staticClass:"result__subitem-field-description"},[e._v(e._s(t.description))])])])})),0)],2):e._e()])})),0):r("div",{staticClass:"result__no-items"},[e._v("Sorry we could not find any results")])])},x=[],k=(r("d81d"),{name:"Results",components:{},props:{list:Array},data:function(){return{expanded:this.list.map((function(){return!1}))}},methods:{selected:function(e){this.$emit("selected",e)},toggleExpand:function(e){this.expanded[e]=i["a"].set(this.expanded,e,!this.expanded[e])}}}),S=k,P=(r("ebf2"),Object(l["a"])(S,C,x,!1,null,null,null)),O=P.exports,N=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("nav",{staticClass:"pager"},[e.current>1?r("button",{staticClass:"pager__prev",on:{click:e.prevPage}},[r("span",[e._v("Prev")])]):e._e(),r("ul",{staticClass:"pager__page-list"},e._l(e.range,(function(t,i){return r("li",{key:i,staticClass:"pager__item"},["..."===t?r("span",{staticClass:"pager__item-dots"},[e._v(e._s(t))]):r("button",{staticClass:"pager__item-btn",class:{"pager__item-btn--current":e.current===t},on:{click:function(r){return e.change(t)}}},[r("span",{staticClass:"pager__hidden"},[e._v("Page: ")]),r("span",{staticClass:"pager__btn-text"},[e._v(e._s(t))])])])})),0),e.current<e.total?r("button",{staticClass:"pager__next",on:{click:e.nextPage}},[r("span",{staticClass:"pager__btn-text"},[e._v("Next")])]):e._e()])},R=[],E=(r("a9e3"),{name:"Pager",components:{},props:{initial:Number,perstep:Number,total:Number},data:function(){return{current:this.initial}},methods:{change:function(e){this.$emit("change",e),this.current=e},prevPage:function(){this.change(this.current-1)},nextPage:function(){this.change(this.current+1)}},computed:{range:function(){var e=[];if(this.total>6){var t=this.current,r=this.total;t>2&&e.push(1),t>3&&e.push("..."),t===r&&e.push(t-2),t>1&&e.push(t-1),e.push(t),t+1<r&&e.push(t+1),1===t&&e.push(3),t<r-2&&e.push("..."),t<r&&e.push(r)}else for(var i=1;i<=this.total;i++)e.push(i);return e}},watch:{initial:function(e){this.current=e}}}),j=E,$=(r("dd3c"),Object(l["a"])(j,N,R,!1,null,null,null)),q=$.exports,F=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"error"},[r("p",{staticClass:"error__message"},[e._v("An error has occurred trying to get data.")]),r("p",{staticClass:"error__message"},[e._v("You can retry by clicking the button below:")]),r("button",{staticClass:"error__button",on:{click:e.retry}},[e._v("Retry")])])},A=[],T={methods:{retry:function(){this.$emit("retry")}}},M=T,I=(r("7ab1"),Object(l["a"])(M,F,A,!1,null,null,null)),L=I.exports,B={name:"ResultsPage",components:{Results:O,Pager:q,Error:L},data:function(){return{dataset:null,state:"listing",listingState:"loading",selected:null,pageTitle:null,pager:{currentStep:1,itemsPerStep:10,totalCount:1}}},computed:{totalSteps:function(){return Math.ceil(this.dataset.totalCount/this.pager.itemsPerStep)}},methods:{getAPIFilters:function(){var e=this.$route.query,t=[];Object.keys(e).forEach((function(r){if("page"!==r){var i=e[r];if(i){var a=v.a.getCriteriaFromQuery(r);t.push({field:a.fieldName,value:i})}}})),t.push({page:"limit",value:this.pager.itemsPerStep});var r=(this.pager.currentStep-1)*this.pager.itemsPerStep;return r>0&&t.push({page:"offset",value:r}),t},loadDataset:function(){var e=this;return Object(p["a"])(regeneratorRuntime.mark((function t(){var r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.getAPIFilters(),t.next=3,v.a.loadServices(r);case 3:return i=t.sent,t.abrupt("return",i);case 5:case"end":return t.stop()}}),t)})))()},load:function(){var e=this;return Object(p["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,e.listingState="loading",t.next=4,e.loadDataset();case 4:r=t.sent,r?(e.dataset=r,e.listingState="display"):e.listingState="no-results",t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0),e.listingState="error";case 12:case"end":return t.stop()}}),t,null,[[0,8]])})))()},pagerChange:function(e){var t=this,r=JSON.parse(JSON.stringify(this.$route.query));delete r["page"],e>1&&(r["page"]=e),this.$router.push({query:r}),this.$nextTick((function(){t.$refs["app"].scrollIntoView({behavior:"smooth"})}))},selectedResult:function(e){this.$router.push({name:"service",params:{id:e.id}})},backToProfile:function(){this.$router.push({path:"/"})},setState:function(e){this.pager.currentStep=e.page?parseInt(e.page,10):1,this.load()}},created:function(){this.setState(this.$route.query)},watch:{$route:function(e){this.setState(e.query)}}},D=B,G=Object(l["a"])(D,y,w,!1,null,null,null),H=G.exports,J=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"full-view"},[r("button",{staticClass:"full-view__back",on:{click:e.back}},[e._v("Back")]),e.selected?r("div",{staticClass:"full-view__body"},[r("div",{staticClass:"full-view__main"},[r("h1",{staticClass:"full-view__title"},[e._v(e._s(e.selected.name))]),e._l(e.displayFields,(function(t,i){return r("div",{key:"body-"+i},[r("h2",[e._v(e._s(t.title))]),r("p",{domProps:{innerHTML:e._s(t.html)}})])}))],2),r("div",{staticClass:"full-view__sidebar"},[r("div",{staticClass:"full-view__contact"},e._l(e.displaySidebarGroups,(function(t,i){return r("div",{key:"contact-group-"+i,staticClass:"full-view__side-group"},[t.title?r("h2",[e._v(e._s(t.title))]):e._e(),e._l(t.fields,(function(t,a){return r("div",{key:"contact-group-"+i+"-"+a,staticClass:"full-view__side-field"},[r("strong",[e._v(e._s(t.title))]),r("p",{domProps:{innerHTML:e._s(t.html)}})])}))],2)})),0)])]):e._e()])},W=[],z=(r("99af"),r("c975"),r("ac1f"),r("5319"),{name:"FullPage",data:function(){return{selected:null,fields:[{title:"Description",field:"long_description"},{title:"Who is eligible?",field:"who_is_eligible"},{title:"What you will need",field:"prerequisites"},{title:"How to",field:"how_to"},{title:"Fees",field:"fees",type:"url"},{title:"Do it online",field:"do_it_online_url",type:"url"},{title:"More information",field:"more_information_url",type:"url"},{title:"Form",field:"form_url",type:"url"},{title:"Who do I call?",field:"who_do_i_call"}],sidebarGroups:[{title:"Agency",fields:[{title:"Type",field:"agency_type"},{title:"Name",field:"agency_name"},{title:"Acronym",field:"agency_acronym"},{title:"Website",field:"agency_website_url",type:"url"}]},{title:"Service",fields:[{title:"Business",field:"business_unit_name"},{title:"Owner",field:"service_owner_name"},{title:"Email",field:"service_owner_email",type:"email"}]}]}},computed:{displayFields:function(){var e=this,t=[];return this.fields.forEach((function(r){var i=e.parseField(r);i&&t.push({title:r.title,html:i})})),t},displaySidebarGroups:function(){var e=this,t=[];return this.sidebarGroups.forEach((function(r){var i=[];r.fields.forEach((function(t){var r=e.parseField(t);r&&i.push({title:t.title,html:r})})),i.length>0&&t.push({title:r.title,fields:i})})),t}},methods:{back:function(){this.$router.go(-1)},parseField:function(e){if(this.selected[e.field]){var t=e.type?e.type:"text",r=this.selected[e.field];switch(t){case"text":r.indexOf("<p>")<0&&(r=r.replace(/\n/g,"<br/>"));break;case"url":0===r.indexOf("http")&&(r='<a href="'.concat(r,'">').concat(r,"</a>"));break;case"email":r='<a href="mailto:'.concat(r,'">').concat(r,"</a>");break}return r}return!1},load:function(){var e=this;return Object(p["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,v.a.loadFullService(e.$route.params.id);case 3:r=t.sent,r&&(e.selected=r),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()}},created:function(){this.load()}}),Q=z,U=(r("b761"),Object(l["a"])(Q,J,W,!1,null,null,null)),V=U.exports;i["a"].config.productionTip=!1,i["a"].use(a["a"]);var Y=new a["a"]({mode:"hash",routes:[{path:"/",component:b},{path:"/results",name:"results",component:H},{path:"/service/:id",name:"service",component:V}]});new i["a"]({router:Y,render:function(e){return e(u)}}).$mount("#app")},"5b83":function(e,t,r){},"7ab1":function(e,t,r){"use strict";var i=r("ee0b"),a=r.n(i);a.a},af34:function(e,t,r){},b50d:function(e,t,r){},b761:function(e,t,r){"use strict";var i=r("185f"),a=r.n(i);a.a},dd3c:function(e,t,r){"use strict";var i=r("5b83"),a=r.n(i);a.a},e1d0:function(e,t,r){},eb29:function(e,t,r){"use strict";var i=r("b50d"),a=r.n(i);a.a},ebf2:function(e,t,r){"use strict";var i=r("af34"),a=r.n(i);a.a},ee0b:function(e,t,r){}});