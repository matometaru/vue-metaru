<template>
  <div>
    <component :is="monster.template" :tp="monster.type" :op="monster.options">
      <template slot="image">
        <img src="/img/blog/11-03.jpg" alt="">
      </template>
    </component>
  </div>
</template>

<script>
export default {
  data() {
    return{
      monster: {
        template: 'blog-11-monster',
        type: 'Monster',
        options: {
          name: "ミミック",
          status: {
            HP: 100,
            MP: 100,
            攻撃力: 124,
            守備力: 50,
            すばやさ: 4,
            かしこさ: 1
          }
        }
      }
    }
  },
}
</script>

<style lang="stylus">
</style>