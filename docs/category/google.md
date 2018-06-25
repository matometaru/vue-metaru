---
title: カテゴリ｜Googole｜まとめたる
description: Googleサービスに関連する記事一覧ページです。
category: google
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