---
title: なぜVuePressでブログを書くのか？
description: WordPressではなく、なぜVuePressを選択したのか。
eyecatch: /img/blog/04.jpg
category: [VuePress]
---

# なぜVuePressでブログを書くのか？

VuePressの概要を把握するには以下の記事がおすすめです。  
[VuePress をお試ししてみた \- Qiita](https://qiita.com/dojineko/items/aae7e6d13479e08d49fd#%E8%89%B2%E5%A4%89%E6%9B%B4-%E3%83%86%E3%83%BC%E3%83%9E%E3%83%AA%E3%83%B3%E3%82%B0)


## VuePressのメリット

* SPA
* 標準でMarkdown
* 静的ファイルを出力してくれるので、サーバー無料（Netlify, GitHub Pagesなど）
* バージョン管理、バックアップ
* Vueコンポーネントの埋め込みが簡単

WordPressで上記のことをやろうと思うと結構大変ですよね。

### 便利なMarkdown

便利なコードスニペットの出力  
`<<< @/.vuepress/components/Articles.vue`

<<< @/.vuepress/components/Articles.vue

シンプルな装飾
```
::: tip
This is a tip
:::
```

::: tip
This is a tip
:::

以上です。
