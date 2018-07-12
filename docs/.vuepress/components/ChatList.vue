<template>
  <div class="chat" ref="chat">
    <div id="chatIn" class="chat-in" ref="chatIn">
      <div class="chat-header" data-scroll-header>
        <div class="chat-search">
          <a href="#chid-15">chid-15</a>
          <input type="text" class="chat-search-input" v-model="word" @focusout="focusOut">
          <div class="chat-search-result" v-show="isResult" ref="chatSearchResult">
            <div class="chat-search-result-item" v-for="(match,key) in matched"><a :href="'#chid-' + match.id" data-scroll>{{ match.content | trimTag | trimChar }}</a></div>
          </div>
        </div>
        <div class="chat-sort">
          <span class="chat-sort-date" @click="sort">日付順</span>
        </div>
      </div>
      <div class="chat-container" v-for="(item,key) in items" :id="'chid-' + item.id">
        <time class="chat-date" v-show="isSameDate(key)">{{ item.date | format }}</time>
        <div class="chat-body" v-html="$options.filters.parse(item.content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SweetScroll from 'sweet-scroll';
export default {
  name: 'ChatList',
  filters: {
    format: function (str) {
      str = 
        str
          .replace(/(\d{4}-\d{1,2}-\d{1,2})T.+/, '$1')
      return str
    },
    parse: function(str) {
      str = 
        str
          .replace(/^>(.*?)\n\n/g, '<div class="chat-body-brockquote">$1</div>')
          .replace(/\n/g, '<br>')
          .replace(/\[info](.*?)\[\/info]/g, '<div class="chat-body-info">$1</div>')
          .replace(/\[title](.*?)\[\/title]/g, '<div class="chat-body-title">$1</div>')
          .replace(/\[code](.*?)\[\/code]/g, '<div class="language- extra-class"><pre class="language-text"><code>$1</code></pre></div>')
          .replace(/((https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+))/, '<a href="$1" target="_blank">$1</a>')
      return str
    },
    trimTag: function(str) {
      str = 
        str
          .replace(/\[info](.*?)\[\/info]/g, '$1')
          .replace(/\[title](.*?)\[\/title]/g, '$1')
      return str
    },
    trimChar: function(str) {
      return str.slice(0,20) + '...'
    }
  },
  created() {
    this.fetch();
  },
  mounted() {
  },
  data() {
    return {
      items: [
        {
          id: 1,
          date: '2018-06-26T15:49:37+09:00',
          content: '[info][title]【短いコードで色々出来る】\nGoogle Apps Scriptでスプレッドシートと連携した無料Ajaxフォームの作り方※サンプル付き【自動返信メールもあるよ】[/title]https://qiita.com/snowsunny/items/56a85c63598dcfb1b06e[/info][info][title]【短いコードで色々出来る】Google Apps Scriptでスプレッドシートと連携した無料Ajaxフォームの作り方※サンプル付き【自動返信メールもあるよ】[/title]https://qiita.com/snowsunny/items/56a85c63598dcfb1b06e[/info]'
        },
        {
          id: 2,
          date: '2018-06-25T22:09:43+09:00',
          content: 'https://thirsty-bose-613113.netlify.com/'
        },
        {
          id: 3,
          date: '2018-06-25T18:32:10+08:00',
          content: '* VuePressのNetlifyアップ\n* analyticsアカウント作成\n* vue-adsenseの動作確認'
        },
        {
          id: 4,
          date: '2018-06-25T18:32:10+07:00',
          content: '> VuePress>のNetlifyアップ\n\n'
        },
        {
          id: 5,
          date: '2018-06-25T18:32:10+05:00',
          content: '[code]RewriteBase /\n    RewriteCond %{REQUEST_FILENAME} !^(.*)\\.(gif|jpg|jpeg|png|css|js|pdf|log)$ [NC]\n    RewriteRule ^column.* /blog/column/($1) [L]\n[/code]'
        }
      ],
      word: "",
      sortKey: "",
      ss: "",
    }
  },
  computed: {
    matched: function() {
      // return this.items.filter((row)=>{
      //   return row.content.indexOf(this.word) != -1
      // })
      const filterKey = this.word
      const sortKey = this.sortKey
      let data = this.items
      if (filterKey) {
        data = data.filter((row)=> {
          return Object.keys(row).some(function (key) {
            console.log(row[key])
            return String(row[key]).indexOf(filterKey) > -1
          })
        }, this)
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    },
    isResult: function() {
      return ( this.matched.length == 0 || this.word == "" ) ? false : true
    }
  },
  methods: {
    focusOut: function(event) {
      this.word = ""
    },
    isSameDate: function (index) {
      if(this.items[index-1]) {
        // 1つ前の投稿と現在の投稿が同じ日付の場合
        if( this.items[index-1].date.slice(0,10) === this.items[index].date.slice(0,10) )
          return false
      }
      return true
    },
    fetch: function() {
      axios.get('/chatwork.json')
        .then(response => {
            this.items = response.data;
            this.resize()
        })
    },
    resize: function() {
      this.$nextTick(()=> {
        if(this.$refs.chatIn.offsetHeight < 500)
          this.$refs.chat.style.height = 'auto'

        console.log(this.$refs.chatSearchResult.offsetHeight)
        this.ss = new SweetScroll({
          offset: 202, // .chat-search-resultの高さ分設定 
          trigger: "a[href^='#']"
        }, this.$refs.chatIn);
      })
    },
    sort: function() {
      console.log("sorted");
    }
  }
}
</script>

<style lang="stylus">
@require '../theme/styles/config'

.chat
  position: relative
  &-header
    box-sizing: border-box
    background: #333
    position: absolute
    z-index: 1
    top: 0
    left: 0
    width: 100%
    padding: 10px
  &-search
    float: left
    background: #666
    &-input 
      box-sizing: border-box
      height: 34px
      padding: 0 10px
      background: #4d4d4d
      border: 1px solid transparent
      border-radius: 2px
      color: #fff
      font-size: 16px
    &-result
      position: absolute
      z-index: 1
      height: 200px
      overflow-y: scroll
      background: #fff
      border: 1px solid #b3b3b3
      width: 323px
      background: #fff
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3)
      &-item
        & + &
          border-top 1px solid #b3b3b3
      a
        display: block
        padding: .5em
  &-sort
    float: right
    display: inline-block
    padding: 5px 1em
    background: #ddd
  &-in
    height: 500px
    overflow-y: scroll
    margin: 30px 0
    padding: 60px 30px 30px
    border: 1px solid #ddd
  &-container
    overflow: hidden;
    position: relative
    & + .chat-container
      margin-top: 20px
  &-date
    display: block
    margin-bottom: 5px
  &-body
    &-info
      border: 1px solid #ddd
      padding: 15px
      & + & {
        margin-top: 10px
      }
    &-title
      font-weight: bold
      margin: 0 -10px 10px
      padding: 0 10px 10px
      border-bottom: 1px solid #ddd
    &-brockquote
      border-left: 4px solid #ddd
      padding-left: 1em
      margin-left: 1em
</style>