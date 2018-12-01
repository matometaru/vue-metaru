<template>
  <div>
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <button v-on:click="filter">Filter</button>
    <transition-group
      name="list"
      tag="p"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <span v-for="item in items" v-bind:key="item" class="list-item">
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
export default {
  data() {
    return{
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    }
  },
  methods: {
    beforeEnter: function(el) {
      el.style.backgroundColor = "#000";
    },
    enter: function (el, done) {
      console.log(this)
      el.style.backgroundColor = "#BBCCDD";
      done();
    },
    leave: function (el, done) {
      window.alert("leave");
      done();
    },
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    filter: function () {
      this.items = this.items.filter(v => v > 6);
    },
  }
}
</script>

<style lang="stylus">
</style>