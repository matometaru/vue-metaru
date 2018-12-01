<template>
  <MetalGrid
    style="style"
    component="ul"
    itemComponent="li"
    :columnWidth="200"
    :gutterWidth="15"
    :gutterHeight="15"
    :appearDelay="500"
  >
    <template v-for="item in items">
      <a :href="item.link" target="_blank" :key="item.id">
        <p class="date">{{item.date|format}}</p>
        <p class="tit">{{item.title.rendered}}</p>
      </a>
    </template>
  </MetalGrid>
</template>

<script>
import MetalGrid from 'vue-metal-grid'
import axios from 'axios'

export default {
  components: {
    MetalGrid: MetalGrid
  },
  filters: {
    format: function (str) {
      return str.replace(/(\d{4}-\d{1,2}-\d{1,2})T.+/, '$1')
    }
  },
  data() {
    return {
      style: {
        background: "#ddd",
      },
      items: [],
    }
  },
  mounted() {
    axios.get('https://matometaru.com/wp-json/wp/v2/posts/')
      .then((res) => {
        this.items = res.data
      })
  }
}
</script>

<style lang="stylus">
#metal-grid
  a
    display: block;
    border: 1px solid #bababa;
    border-radius: 5px;
    padding: 1em;
  .date
    margin: 0 0 .5em;
  .tit
    margin: 0;
    font-weight: bold;
 </style>