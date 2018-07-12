---
title: VuePressにGoogleAdsenseで広告を配置する方法
description: VuePressにGoogleアドセンスを配置し、広告の表示、収益の連携まで行います。
eyecatch: /img/blog/02.jpg
category: [VuePress,Google]
date: 2018-06-23
---

# VuePressにGoogleAdsenseで広告を配置する方法

今回使用したライブラリです。
[Vue Google Adsense \| Irfan Maulana](https://mazipan.github.io/vue-google-adsense/)

vue-cliを使って作ったVue.js + webpackのWEBアプリケーションにGoogleアドセンスを導入したい場合は以下の記事を参考になります。
[【アドセンス】Vue\.jsアプリケーションにアドセンス導入【vue\-cli】 \- The sky is the limit](http://www.sky-limit-future.com/entry/vue_googleadsense)

## VuePressに配置

```
npm install vue-script2 vue-google-adsense
```

```
yarn add vue-script2 vue-google-adsense
```

[Configuration \| VuePress](https://vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements)

> VuePressアプリは標準のVueアプリなので、ファイルを作成することでアプリレベルの拡張機能を適用することができます。ファイル.vuepress/enhanceApp.jsは、アプリケーションにインポートされます。

.vuepress/enhanceApp.jsを作成し以下を追記。

```
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)
```

あとはコンポーネントを設置するだけです。  
ローカル環境だと`<InArticleAdsense>`と`<InFeedAdsense>`が表示されなかったのですが、本番環境にあげると表示されました。

## 表示例

以下は広告の表示例です。

### Adsense（通常広告）

<Adsense
	data-ad-client="ca-pub-9870466105427266">
</Adsense>

### InArticleAdsense（記事内広告）

<InArticleAdsense
    data-ad-client="ca-pub-9870466105427266">
</InArticleAdsense>
 
### InFeedAdsense（インフィード広告）

<InFeedAdsense
	data-ad-layout-key="-fg+5n+6t-e7+r"
    data-ad-client="ca-pub-9870466105427266">
</InFeedAdsense>