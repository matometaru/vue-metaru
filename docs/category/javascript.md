---
title: カテゴリ｜JavaScript｜Vue Metaru
description: JavaScriptに関連する記事一覧ページです。
category: JavaScript
sidebar: false
---

## Category : {{category}}

{{description}}

<Articles :category="category" :pages="this.$site.pages"/>

<script>
export default {
  mounted: function () {
    this.category = this.$page.frontmatter.category
    this.description = this.$page.frontmatter.description
  },
  data: function () {
    return {
      category: '',
      description: '',
    }
  },
}
</script>