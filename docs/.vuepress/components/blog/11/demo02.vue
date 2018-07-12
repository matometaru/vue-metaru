<template>
  <div>
    <component :is="monster.template" :tp="monster.type" :op="monster.options">
      <template slot="image">
          <img src="/img/blog/11-02.jpg" alt="">
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
        type: 'MonsterMetal',
        options: {
          name: "はぐれメタル",
          status: {
            Lv: 3,
            HP: 6,
            MP: 255,
            攻撃力: 61,
            守備力: 255,
            すばやさ: 150,
          }
        }
      }
    }
  },
}
</script>

<style lang="stylus">
</style>