import merge from 'lodash/merge'

export default class Monster {

  static defaults = {
    name: '',
    race: '',
    gold: 1000,
    exp: 15000,
    status: {
      Lv: 1,
      HP: 100,
      MP: 100,
      攻撃力: 999,
      守備力: 999,
      すばやさ: 999,
      かしこさ: 100
    }
  }

  constructor(options = {}) {
    this.options = merge({}, Monster.defaults, options);
    console.log(`${this.options.name}があらわれた！`)
  }

  attack(target) {
    console.log(`${target}を攻撃した！`)
  }

  escape() {
    console.log(`${this.options.name}は逃げ出した！`)
  }

}
