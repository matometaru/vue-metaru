import Vue from 'vue'
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense, 'InArticleAdsense')
Vue.use(Ads.InFeedAdsense)

export default ({
  Vue, 
  options,
  router,
  siteData
}) => {
  // Vue.mixin(headerMixin)
}