<template>
  <div v-bind:class="current">
    <div class="center">
      <button @click="jsQuestion()">YES or NO ?</button>
    </div>
    <div class="answer" :style="'background-image:url(' + image + ')'">
      <span class="answer-txt">{{ answer }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  filters: {
    toUpper: function(str) {
      return str.toUpperCase()
    }
  },
  data() {
    return{
      status: 0,
      statusImage: {
        loading: '/img/common/loading01.svg',
        error: '/img/common/error01.png',
      },
      answer: '',
      image: '',
    }
  },
  computed: {
    current: function() {
      let status = 'is-init'
      if( this.status === 0 ) return status;
      if( this.status === 1 ) {
        status = 'is-answered'
      }else {
        status = 'is-completed'
      }
      return status
    }
  },
  methods: {
    jsQuestion: function() {
      this.status = 0
      this.image = this.statusImage.loading
      let question = () => {
        return new Promise((resolve, reject) => {
          axios.get('https://yesno.wtf/api')
            .then((res) => {
              if (res.status !== 200) {
                reject()
              }
              this.answer = res.data.answer
              this.image = res.data.image
              this.status = 1
              resolve()
            })
        })
      }
      let imageLoaded = (src) => {
        return new Promise((resolve, reject) => {
          let img  = new Image()
          img.src = this.image
          this.status = 2
          img.addEventListener("load", () => { 
            console.log("ロード完了")
            resolve(src) 
          })
        })
      }
      let display = async () => {
        try {
          await question()
          await imageLoaded()
        } catch(err) {
          this.image = this.statusImage.error
          console.log("エラーが起こりました:" + err)
        }
      }
      display()
    },
  }
}
</script>

<style lang="stylus">
  .answer
    background-size: contain
    background-repeat: no-repeat
    background-position: center
    &-txt
      opacity: 0
  .center
    text-align: center
  button
    cursor: pointer
    display: inline-block
    padding: 0.5em 1em
    text-decoration: none
    background: #668ad8
    color: #fff
    border-bottom: solid 4px #627295
    border-radius: 3px
  .is-completed
    .answer-txt
      opacity: 1
      transition: opacity 1s
</style>