<template>
  <div>
    <div class="center">
      <button @click="jsQuestion()">YES or NO ?</button>
    </div>
    <div class="answer" :style="'background-image:url(' + image + ')'">{{answer}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      answer: '',
      image: '',
    }
  },
  methods: {
    jsQuestion: function() {
      function question() {
        return new Promise((resolve, reject) => {
          let req = new XMLHttpRequest()
          req.onreadystatechange = function() {
            if (req.readyState == 4) { // 通信の完了時
              if (req.status == 200) { // 通信の成功時
                let data = eval('(' + req.responseText + ')');
                resolve(data);
              }
            } else{
              console.log("通信中...")
            }
          }
          req.open('GET', 'https://yesno.wtf/api', true);
          req.send(null);
        })
      }
      question().then(
        (val) => {
          this.answer = val.answer
          this.image = val.image
        },
        (err) => {
          console.log(err)
        }
      )
    },
  }
}
</script>

<style lang="stylus">
  .answer
    max-width: 100%
    width: 500px
    height: 300px
    line-height: 300px
    margin: 10px auto 0
    text-align: center
    color: #fff
    font-size: 50px
    font-weight: bold
    background-size: contain
    background-repeat: no-repeat
    background-position: center
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
</style>