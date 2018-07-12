<template>
  <div v-bind:class="current">
    <div class="center">
      <button @click="jsQuestion()">YES or NO ?</button>
    </div>
    <div class="answer" :style="'background-image:url(' + image + ')'">
      <span class="answer-txt">{{ answer | toUpper }}</span>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    toUpper: function(str) {
      return str.toUpperCase()
    }
  },
  data() {
    return{
      status: 0,
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
      this.image = '/img/common/loading01.svg'
      let question = () => {
        return new Promise((resolve, reject) => {
          let req = new XMLHttpRequest()
          req.onreadystatechange = () => {
            if (req.readyState == 4) { // 通信の完了時
              if (req.status == 200) { // 通信の成功時
                let data = eval('(' + req.responseText + ')')
                this.answer = data.answer
                this.status = 1
                this.image = data.image
                console.log("通信完了")
                resolve(data)
              }else {
                reject(req.status)
              }
            } else{
              console.log("通信中...")
            }
          }
          req.open('GET', 'https://yesno.wtf/api', true)
          req.send(null)
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