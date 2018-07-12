<template>
  <div>
    <component :is="monster.template" :tp="monster.type" :op="monster.options">
      <template slot="image">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="レイヤー_1" x="0px" y="0px" viewBox="0 0 841.9 595.3" style="enable-background:new 0 0 841.9 595.3;" xml:space="preserve">
          <path class="st0" d="M440.5,216.9c-13-13.4-20.7-27.9-21.3-47.1S404,152.9,404,152.9s-10.6-2.3-11.2,16.9s-8.3,33.7-21.3,47.1  c-11.4,11.7-57.9,18.5-69.3,63.3c-1.6,6.4-5.2,26.7,5.3,42.8c15.2,23.3,58.3,38.2,99.6,38.2c40.2,0,73.9-14.8,93.4-33.7  c14.5-14,11.2-38.2,10.1-43.6C500.9,235.7,452.2,228.8,440.5,216.9z"/>
          <circle class="st1" cx="381.6" cy="276.8" r="18"/>
          <circle class="st2" cx="381.6" cy="276.8" r="8.1"/>
          <circle class="st1" cx="429.2" cy="276.8" r="18"/>
          <circle class="st2" cx="429.2" cy="276.8" r="8.1"/>
          <path class="st3" d="M403.7,325.9c-35.2,0-47.8-19.8-48.3-20.7c-1.6-2.6-0.8-6,1.8-7.6c2.6-1.6,6-0.8,7.6,1.8  c0.5,0.7,10.3,15.4,38.9,15.4c29.7,0,43.4-14.9,43.5-15c2-2.3,5.5-2.5,7.8-0.4c2.3,2,2.5,5.5,0.4,7.8  C454.8,308,438.3,325.9,403.7,325.9z"/>
        </svg>
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
          name: "スライム",
          status: {
            Lv: 3,
            HP: 50,
            MP: 1,
            攻撃力: 5,
            守備力: 3,
            すばやさ: 4,
          }
        }
      }
    }
  },
}
</script>

<style lang="stylus">
</style>