<template>
  <div>
    <div class="html">
      <slot name="html"></slot>
    </div>
    <div class="style">
      <slot name="style"></slot>
    </div>
    <div class="js">
      <slot name="js"></slot>
    </div>
    <div><slot></slot></div>
  </div>
</template>

<script>
import * as $ from 'jquery'
import * as _ from "lodash";
export default {
  name: 'CodeBlock',
  mounted() {
    $('#testButton').click(()=> {
      const $elm = $('#testSubject')
      console.log("test");
      // $.ajax({
      //   url: "test.html",
      //   success: function(html) {
      //     assert
      //   }
      // })
    })
  },
}
</script>

<style lang="stylus">
</style>