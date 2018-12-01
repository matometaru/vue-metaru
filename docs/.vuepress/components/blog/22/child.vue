<template>
  <transition-plus @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <h4>component</h4>
  </transition-plus>
</template>

<script>
import Velocity from 'velocity-animate'
export default {
  data() {
    return{
    }
  },
  mounted() {
    this.$el.style.opacity = 0.5
  },
  beforeDestroy: function() {
    // alert("beforeDestroy");
  },
  destroyed: function() {
    console.log("destroyed");
  },
  methods: {
    onBeforeEnter(el){
      el.style.opacity = 0
    },
    onEnter(el, done){
      console.log("onEnter")
      Velocity(el, { opacity: 1 }, { complete: done })
    },
    onLeave(el, done){
      console.log("onLeave")
      Velocity(el, { opacity: 0 }, { complete: done })
    },
  }
}
</script>