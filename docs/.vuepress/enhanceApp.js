import Vue from 'vue'
import Ads from 'vue-google-adsense'
import VueTransitionGroupPlus from "vue-transition-group-plus"
Vue.use(VueTransitionGroupPlus)

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

export default ({
  Vue, 
  options,
  router,
  siteData
}) => {
  // Vue.mixin(headerMixin)
}