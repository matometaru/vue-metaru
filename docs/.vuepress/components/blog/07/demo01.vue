<template>
  <div>
    <div>プロトタイプ:{{prot}} {{option}}</div>
    <ul>
      <li v-for="drink in filteredDrinks"
        v-bind:key="drink.id">
        ID.{{ drink.id }} {{ drink.name }} PRICE.{{ drink.price }}
        <span v-if="drink.price > 150">たかい！</span>
      </li>
    </ul>
    <!-- <p>{{url}}</p> -->
    <button @click="method[option]">{{option}}()</button>
  </div>
</template>

<script>
import * as $ from 'jquery'
import * as _ from "lodash";
export default {
  props: { 
    option: String
  },
  data() {
    return{
      drinks: [
        {id: 1, name: "コーヒー", price: 100},
        {id: 2, name: "カフェオレ", price: 150},
        {id: 3, name: "メロンソーダ", price: 200}
      ],
      filteredDrinks: [],
      filteredArrayDrinks: [],
      filteredMapDrinks: [],
      method: {},
      url: "?word=test&area=kyoto&job_cat=web&salary01=100&salary02=200"
    }
  },
  created() {
    this.method = {
      push: this.push,
      sort: this.sort
    }
  },
  computed: {
    prot: function() {
      return Object.prototype.toString.call(this.filteredDrinks)
    }
  },
  methods: {
    push: function() {
      let id = this.drinks.length + 1
      this.drinks.push({id:id, name:"コーラ", price: 120})
      this.filteredDrinks = this.drinks
    },
    sort: function() {
      this.filteredDrinks = this.drinks.slice().sort((a,b) =>  b.price - a.price)
      // Lodash
      // this.filteredDrinks = _.orderBy(this.drinks, 'price', 'desc')
      // console.log(this.filteredDrinks)
    },
    forEach: function() {
      // jQuery
      // $.each(this.drinks, (index, value) => {
      //   $.each(value, (i,v) => {
      //     console.log(v);
      //   });
      // });
      // Lodash
      _.forEach(this.drinks, value => {
        _.forEach(value, v => {
          console.log(v);
        });
      });
    },
    filter: function() {
      this.drinks.filter((row) =>
        console.log(Object.keys(row))
      )
      this.filteredDrinks = _.filter(this.drinks, {name:'コーヒー'})
    },
    includes: function() {
      this.filteredDrinks = _.includes(this.drinks, 'コーヒー')
    },
    toArray: function() {
      // function Foo() {
      //   this.a = 1;
      //   this.b = 2;
      // }
      // let object = new Foo
      // console.log(object)
      // let array = _.toPairs(new Foo)
      // console.log(array)
      // object = _.fromPairs(array)
      // console.log(object)
      this.filteredArrayDrinks = this.drinks
      console.log(this.filteredArrayDrinks)
      console.log(this.filteredArrayDrinks.length)
      // this.filteredArrayDrinks = _.fromPairs(this.filteredArrayDrinks)
      // console.log(this.filteredArrayDrinks)
      this.filteredArrayDrinks = _.toPairs(this.filteredArrayDrinks)
      console.log(this.filteredArrayDrinks)
      console.log(this.filteredArrayDrinks.length)
    },
    toMap: function() {
      this.filteredMapDrinks = new Map([['key1', 'value1'], ['key2', 'value2']])
      console.log(this.filteredMapDrinks)
    },
    query: function() {
      this.url = _.fromPairs(this.url.slice(1).split('&').map(p => p.split('=').map(p => decodeURIComponent(p))))
    },
    entries: function() {
      var users = [
        {name: "taro", score: 100, type: "a" },
        {name: "jiro", score: 80, type: "b" },
        {name: "saburo", score: 90, type: "c" }
      ];
      var result = _(users)
      .tap(console.log) // 配列 + オブジェクト
      .map(it => [it.name, it]) // 配列の形, length = 2で作成
      .tap(console.log).value(); // 配列 + 配列(name,オブジェクト)

      result = _(result).fromPairs() // key-valueで構成されたオブジェクトを返す
      .tap(console.log) // オブジェクト
      .value();

      console.log(Object.entries(result))
    }
  }
}
</script>

<style lang="stylus">
</style>