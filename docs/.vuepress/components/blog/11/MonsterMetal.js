import Monster from './Monster'

export default class MonsterMetal extends Monster {
  
  constructor(options = {}) {
    super(options);
  }

  attacked(damage) {
  	damage = damage < 500 ? 1 : damage;
    console.log(`${damage}のダメージ！`);
  }

}
