---
title: カテゴリ｜VuePress｜まとめたる
description: VuePressに関連する記事一覧ページです。
category: VuePress
---

## Category : {{category}}

<Articles :category="category" :pages="this.$site.pages"/>

<script>
export default {
  mounted: function () {
    this.category = this.$page.frontmatter.category
  },
  data: function () {
    return {
      category: ''
    }
  },
}
</script>