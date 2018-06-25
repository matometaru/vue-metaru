---
title: まとめたる
description: ここに説明が入ります。
category: google
---

## Category

<Articles :category="this.$site.category" :pages="this.$site.pages"/>

{{category}}

<script>
export default {
  mounted: function () {
    console.log(this)
  },
  data: function () {
    return {
      category: this.$description,
    }
  },
}
</script>