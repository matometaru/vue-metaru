<template>
  <div class="demos">
    <header class="demos-header">DEMO</header>
    <slot>
      <component :is="demo" :option="option" class="demos-content"/>
    </slot>
    {{option}}
    <footer class="demos-footer" v-if="demo">{{ demo }}</footer>
  </div>
</template>

<script>
export default {
  props: { 
    demo: String,
    option: String
  }
}
</script>

<style lang="stylus">

.demos
  position: relative
  border: 2px solid #ddd
  background: #fff
  margin: 40px 0 40px 0
  padding: 40px 24px 30px
  &-header,&-footer
    position: absolute;
    display: inline-block;
  &-header
    top: -2px;
    left: -2px;
    padding: 4px 8px 4px;
    background: #bbb;
    color: #fff;
    font-size: 80%;
  &-footer
    bottom: 4px;
    right: 4px;
    font-size: 70%;
    color: #bbb;
 </style>