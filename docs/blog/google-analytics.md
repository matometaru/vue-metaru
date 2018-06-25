---
title: VuePressとGoogleアナリティクスを連携する方法
description: VuePressとGoogleアナリティクスを連携して、アクセスの解析の確認まで行います。
eyecatch: /img/blog/01.png
category: [VuePress,google]
sidebar: true
---

## Googleアナリティクスとは

Googleが提供するアクセス解析ツールです。
Googleアナリティクスでは、登録したサイトのユーザーの行動に関するデータがわかります。


## VuePressとの連携  

公式サイトにも以下のような記述があり、config.jsにIDを設定するだけでOKです。
「統合を可能にするGoogleアナリティクスIDを提供する」

```js:config.js{4}
module.exports = {
    title: 'まとめたる',
    description: '分かりにくい情報、お得な情報を分かりやすくまとめたる。',
    ga: 'TEST_ID_20180514'
}
```