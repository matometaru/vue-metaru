<template>
<div class="article-container-wrap">
  <div v-for="page in filteredPages" class="article-container" v-if="!page.frontmatter.exclude">
    <router-link :to="page.path">
      <div class="article-eyecatch" :style="'background-image: url(' + page.frontmatter.eyecatch + ');'"></div>
    </router-link>
    <div class="article-content">
      <h3 class="article-title">
        <router-link :to="page.path">{{page.title || 'No Title'}}</router-link>
      </h3>
      <div v-if="page.frontmatter.description" class="article-description">{{page.frontmatter.description}}</div>
      <div class="tags">
        <div v-for="c in page.frontmatter.category" class="tag">{{c}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Articles',
  props: ['pages', 'prefix', 'category'],
  computed: {
    filteredPages () {
      // console.log("metaru")
      // console.log(this.category)
      // console.log(this.pages[2])
      if(this.category) {
        let blogs = this.pages.filter(page => page.path.includes('/blog/'))
        return blogs.filter(page => page.frontmatter.category.includes(this.category))
      }else {
        return this.pages.filter(page => page.path.includes(this.prefix || ''))
      }
    }
  }
}
</script>

<style lang="stylus">
@require '../theme/styles/config'

.article-container-wrap
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px 29px;
.article
  &-container
    overflow: hidden;
    position: relative
    z-index: 1
    & + .article-container
      margin-top: 30px
  &-eyecatch
    float: left;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
  &-content
    margin-left: 110px;
  &-title
    margin: 0;
    line-height: 1.5;
    a
      color: #333;
      font-size: 24px;
      text-decoration: none;
      font-weight: bold;
      &:hover
        color: $accentColor;
.tags
  display: flex
  .tag-icon
    margin-left: 1em;
    margin-right: .4em;
    font-size: .4em
  .tag
    margin-right: .6em;
    padding: 0 .4em;
    font-size: .6em;
    background-color: #f2fff3

@media (max-width: $MQMobileNarrow)
  .article-container-wrap
    padding: 10px 15px
  .article
    &-container
      & + .article-container
        margin-top: 15px
    &-eyecatch
      width: 80px;
      height: 80px;
    &-content
      margin-left: 90px;
    &-title
      margin: -2px 0 2px;
      line-height: 1.2;
      a
        color: #333;
        font-size: 16px;
        text-decoration: none;
        font-weight: bold;
        &:hover
          color: $accentColor;
    &-description
      font-size: 13px
  .tags
    margin-top: 5px
</style>