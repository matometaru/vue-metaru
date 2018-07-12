<template>
  <div class="ddj">
    <h2 class="ddj-tit">DDJorker👻</h2>
    <p class="ddj-sub">RULES</p>
    <ul class="ddj-rules">
      <li>できるだけ多くのカードを引いてください。JORKEを引くとゲームオーバーです。</li>
      <!-- <li>次に引くカードからJORKERまで枚数がEXIT時に乗算されます。</li>
      <li>引いた回数により、ポイントが除算されます。</li>
      <li>JORKERを2枚同時に引いてしまうと全コインが没収されます。</li> -->
    </ul>
    <p class="ddj-sub">ADVICES</p>
    <ul class="ddj-advices">
      <li>シャッフルを使い多くのカードを引いてください</li>
      <li>ヒントを使えばJORKERが情報を教えてくれます（最大10回）</li>
    </ul>
    <div class="ddj-btns">
      <button @click="init" class="btn btn-dark">初期化</button>
      <!-- <button @click="open">Open</button>
      <button @click="hide">Hide</button> -->
      <button @click="hint">Hint({{10-hintCount}})</button>
      <button @click="shuffle">Shuffle</button>
    </div>
    <div class="ddj-info">
      <div class="ddj-info-draw">
        <input type="text" v-model="num">
        <button @click="draw">枚引く</button>
      </div>
    </div>
    <div class="ddj-header">
      <p class="ddj-sub">LIST</p>
      <p class="ddj-last">{{cards.length}}</p>
    </div>
    <transition-group name="card" tag="div" class="container" v-bind:class="{ hide: isHide }">
      <div v-for="(card,index) in selectedCards" :key="card.id" class="card" v-bind:class="{ red: card.mark === 'diamonds' || card.mark === 'hearts' }">
        {{ card.mark | emoji }}{{ card.num }}
      </div>
    </transition-group>
    <p class="ddj-sub">DRAW</p>
    <transition-group name="hand" tag="div" class="container">
      <div v-for="hand in hands" :key="hand.id" class="card" v-bind:class="{ red: hand.mark === 'diamonds' || hand.mark === 'hearts' }">
        {{ hand.mark | emoji }}{{ hand.num }}
      </div>
    </transition-group>
  </div>
</template>

<script>
import shuffle from 'lodash/shuffle'
const marks = ['hearts', 'spades', 'diamonds', 'spades'];
const markIcons = ['♥️', '♠️', '♦️', '♣️'];
const markHints = ['ハート', ' スペード', 'ダイヤ', 'クローバー'];
const numHints = ['小さい', '少し小さい', '少し大きい', '大きい'];
const posHints = ['手を伸ばせば届きそうな距離だね', 'もうすぐ会えるね', '早く会いたいな〜', '大迫半端ないって'];
const hintMessage = (cards) => {
  let positionHint,aroundHint;
  const jorkerIndex = cards.findIndex( card => card.mark === 'jorker' )
  if( jorkerIndex === 0 ) {
    return `👻 < 次出ます！！`
  }
  const beforeMarkHint = markHints[marks.indexOf(cards[jorkerIndex-1].mark)]
  const beforeNumIndex = Math.floor( cards[jorkerIndex-1].num / 4 )
  const beforeNumHint = numHints[beforeNumIndex]
  const positionIndex = Math.floor( jorkerIndex / 13 )
  aroundHint = `👻 < ${beforeNumHint}${beforeMarkHint}が左にあるよ\n`
  positionHint = `👻 < ${posHints[positionIndex]}`
  let message = aroundHint + positionHint
  return message
}

export default {
  data() {
    return{
      num: 1,
      hintCount: 0,
      drawCount: 0,
      isHide: false,
      cards: [],
      hands: [],
    }
  },
  filters: {
    emoji: function(str) {
      return str === 'jorker' ? '👻' : markIcons[marks.indexOf(str)]
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    selectedCards: function() {
      return this.cards
    }
  },
  methods: {
    init: function() {
      this.cards = []
      this.hands = []
      this.hintCount = 0
      let id = 1
      for(let mark of marks) {
        for(let num=1; num<=13; num++) {
          this.cards.push({ id, mark, num})
          id++
        }
      }
      for(let num=1; num<=2; num++) {
        this.cards.push({ id, mark:'jorker', num:null})
        id++
      }
      this.shuffle()
      this.hide()
    },
    hint: function() {
      // jorkerの周りにあるカードのヒントを発言
      // ヒントは10回まで
      if(this.hintCount > 10) {
        return;
      }
      let message = hintMessage(this.cards);
      window.alert(message)
      this.hintCount++
    },
    open: function() {
      this.isHide = false
    },
    hide: function() {
      // カードを裏向ける（カードの数字を見えなくする）
      this.isHide = true
    },
    shuffle: function() {
      this.cards = shuffle(this.cards)
    },
    draw: function() {
      let num = Number(this.num)
      let drawCards = this.cards.slice(0,num)
      this.drawCount++
      this.hands = this.hands.concat(drawCards)
      this.cards = this.cards.slice(num,this.cards.length)
      if( drawCards.some( card => card.mark === 'jorker' ) ) {
      // findIndexでも検索可能
      // if( drawCards.findIndex((card,i) => card.mark === 'jorker') > -1 ) {
      // filterでも検索可能
      // if( drawCards.filter(card => card.mark === 'jorker').length > 0 ) {

        // 引いたカードで新しい配列を生成
        let _drawCards = drawCards.map((card,i) => ({num:i+1,mark:card.mark}))
        // markがjorkerのものをフィルタリング
        let _drawJorkers = _drawCards.filter((card) => card.mark === 'jorker')
        this.gameOver(_drawJorkers)
      }
    },
    /**
     * jorkersは[5,8]の数値だけの配列でよい
     */
    gameOver: function(jorkers) {
      this.isHide = false
      let message = jorkers.reduce((a,x) => {
        let sep = a === '' ? '':',';
        return a + sep + x.num
      }, '')
      let advice = 'もう少し慎重に引いてみては？'
      window.alert(
        'GAME OVER!!\n' +
        `${message}枚目がJORKERでした\n` +
        `${advice}`)
      this.init()
    }
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Anton');
@import url('https://fonts.googleapis.com/css?family=Bubbler+One');
@import url('https://fonts.googleapis.com/earlyaccess/mplus1p.css');
.ddj
  &-tit
    font-family: 'Anton', sans-serif;
    font-family: 'Bubbler One', sans-serif;
    letter-spacing: .2em
  &-sub
    font-family: 'Bubbler One', sans-serif;
    letter-spacing: .2em
    font-weight: bold
    margin-bottom: .1em
  &-rules
  &-advices
    font-family: "Mplus 1p";
    font-size: 14px
    margin: 0
  button
    cursor: pointer
    display: inline-block
    font-weight: 400
    text-align: center
    white-space: nowrap
    vertical-align: middle
    border: 1px solid transparent
    padding: .375rem .75rem
    font-size: 14px
    line-height: 1.5
    border-radius: .25rem
    color: #fff
    background-color: #333
    border-color: #333
    transition: opacity .5s
    & + button
      margin-left 10px
    &:hover
      opacity: .7
  &-btns
    margin-top: 1em
  &-info
    overflow: hidden
    margin-top: 1em
    &-draw
      input
        padding: 8px .5em
        width: 52px
        margin-right: 10px
    &-last
      float: right
  &-header
    overflow: hidden
    .ddj-sub
      float: left
    .ddj-last
      float: right
      margin-bottom: 0
.container
  display: flex
  flex-wrap: wrap
  width: 100%
  margin-top: 10px
.card
  display: flex
  justify-content: space-around
  align-items: center
  width: 7.53%
  height: 35px
  border: 1px solid #aaa
  margin-right: -1px
  margin-bottom: -1px
.card-move
  transition: transform 1s;
.red 
  color: #c2293b
.hide
  .card
    background: #333
    text-indent: -9999px
</style>