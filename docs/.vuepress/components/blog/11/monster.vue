<template>
  <div>
    <div class="image"><slot name="image"></slot></div>
    <button @click="attackUp()">攻撃力UP</button>
    <div class="status">
      {{monster.options.name}}
      <table class="status-table">
        <tr v-for="(status, key) in monster.options.status">
          <th>{{key}}</th>
          <td>{{status}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Monster from './Monster'
import MonsterMetal from './MonsterMetal'

export default {
  filters: {
    padStart: function(str, length=0, chars=' ') {
      return str.padStart(length, chars);
    }
  },
  props: {
    tp: {
      type: String,
      default: "Monster"
    },
    op: {
      type: Object,
      default: {
        name: "",
        status: {}
      }
    },
  },
  data() {
    return{
      monster: {
        type: this.tp,
        options: {
          name: '',
          race: '',
          gold: 0,
          exp: 0,
          status: {
            Lv: 1,
            HP: 1,
            MP: 1,
            攻撃力: 1,
            守備力: 1,
            すばやさ: 1,
            かしこさ: 1
          }
        },
      }
    }
  },
  mounted() {
    let monster;
    if(this.tp === 'Monster') {
      monster = new Monster(this.op);
      monster.attack('勇者');
    }else {
      monster = new MonsterMetal(this.op);
      monster.attacked(100);
    }
    monster.escape();
    this.monster.options = JSON.parse(JSON.stringify(monster.options));
  },
  methods: {
    plus: function() {
      this.monster.rand += 2;
    },
    attackUp: function() {
      console.log(this.monster.options.name)
      this.monster.options.status.攻撃力 += 10;
    },
    levelUp: function() {
      this.monster.options.status.攻撃力 += 10;
    }
  }
}
</script>

<style lang="stylus">
  .image
    text-align: center
    img
      width: 262px
      height: auto
  .st0
    fill:#4391F4
  .st1
    fill:#FFFFFF
  .st2
    fill:#080F38
  .st3
    fill:#E93F37
  .status
    box-sizing: border-box
    width: 100%;
    margin: 0 auto;
    padding: 1em
    font-size: 1.2rem;
    color: #fff;
    border: 2px solid #000;
    border-radius: 5px;
    box-shadow: 0 0 0 4px #fff inset;
    background-color: rgba(0,0,0,0.9);
    &-table
      tr
        border: none
      tr:nth-child(2n)
        background: none
      th,td
        border: none
        padding: .3em 1em
      th
        text-align: left
      td
        text-align: right
</style>