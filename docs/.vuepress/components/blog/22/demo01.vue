<template>
  <transition-group-plus transition-mode="out-in" tag="div">
      <button @click="add">追加</button>
      <button @click="remove">削除</button>
      <template v-for="item in drinks">
        <child :key="'element'+item.id"
          :id="'element'+item.id"
          :enterDuration="enterDuration"
          :leaveDuration="leaveDuration">
        </child>
      </template>
  </transition-group-plus>
</template>

<script>
import Child from "./Child.vue";
export default {
  data() {
    return{
      count: 0,
      transitionMode: "out-in",
      enterDuration: 0.8,
      leaveDuration: 0.3,
      drinks: [
        {id: 1, name: "コーヒー", price: 100},
        {id: 2, name: "カフェオレ", price: 150},
        {id: 3, name: "メロンソーダ", price: 200}
      ],
    }
  },
  components: {
    Child
  },
  methods: {
    add: function() {
      this.drinks = [
        {id: 1, name: "コーヒー", price: 100},
        {id: 2, name: "カフェオレ", price: 150},
        {id: 3, name: "メロンソーダ", price: 200},
        {id: 4, name: "ビール", price: 300},
      ];
      console.log(this.drinks)
    },
    remove: function() {
      this.drinks = [
        {id: 1, name: "コーヒー", price: 100},
        {id: 2, name: "カフェオレ", price: 150},
      ];
      console.log(this.drinks)
    }
  }
}
</script>