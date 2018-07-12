---
title: JavaScriptのオブジェクト指向再入門
description: JavaScriptとオブジェクト思考をVueコンポーネントを使ってわかりやすく解説します。
eyecatch: /img/blog/11.png
category: [JavaScript]
---

# Vueで学ぶJavaScriptのオブジェクト指向

今回やること

* Monsterクラスの作成
* スライムをインスタンス化
* モンスタークラスを継承し、メタルボディをもったMonsterMetalを作成
* はぐれメタルをインスタンス化
* さらなる拡張を行う場合

（はぐれメタルを無理やり題材にしたのできれいなオブジェクト指向ではないです）

がっつりゲームのモンスタークラスを作成する場合は以下の記事が参考になりそうです。
[【Breed】RPGのモンスターなどのキャラクターを作成するときに使うデザインパターン \- Qiita](https://qiita.com/what/items/9dee3d3f033e1b248336)

## Monsterクラスの作成

まず簡単にドラクエのモンスタークラスを作成してみます。

* ステタースを持っている
* 攻撃する
* 逃げる

```
import merge from 'lodash/merge'

export default class Monster {

  constructor(options = {}) {
    this.options = merge({}, Monster.defaults, options);
  }

  attack(target) {
    console.log(`${target}を攻撃した！`)
  }

  escape() {
    console.log(`${this.options.name}は逃げ出した！`)
  }

}

Monster.defaults = {
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
};
```

lodashのmergeを使っています。

### static 静的プロパティ

クラス固有のデフォルト値などは静的プロパティとしてstaticを付け、以下のように書くことができます。

```
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

  // 以下省略

}
```

## インスタンス化（スライムを生成）

Monsterクラスの基本的なインスタンス化は以下のようになります。
コンポーネント化しているのでコード上では少し異なっています。

```
const slime = new Monster ({
	name: 'スライム',
	gold: 1,
	exp: 2,
	status: {
		HP: 5,
		MP: 1,
		攻撃力: 5,
		守備力: 3,
		すばやさ: 4,
		かしこさ: 1
	}
});
```

<DemoBlock demo="blog-11-demo01"/>

## クラス継承

Monsterクラスを継承しメタル系モンスターのクラスを作成します。
constructorに引数がある場合は、superにも引数をもたせる必要があります。

```
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
```

<DemoBlock demo="blog-11-demo02"/>

[【ドラクエ】はぐれメタルのグッズまとめ](http://matometaru.com/haguremetaru/)

はぐれメタルも無事逃げてますので、継承できてますね。（コンソールに表示しています）
念のため、他のモンスターも追加してコンポーネントが正常に動いているか確認します。

<DemoBlock demo="blog-11-demo03"/>

初期ステータス、ステータスの変更等問題ありません。

## ミックスイン

Devilクラス（魔王クラス）を作成したとします。

はぐれメタルが野心をもち、魔王になりたいと思いました。
しかし、モンスタークラスを継承しているはぐれメタルはこれ以上クラスを継承することができません。

JavaScriptは多重継承ができないので、こういう場合はミックスインという方法を使います。

ミックスインについては、とりあえず以下の記事を参考にしてください。
[javascriptのミックスインについてまとめて見た \- Qiita](https://qiita.com/yasuno0327/items/3523f8a49a5179a1bcb0)

また、Vue.jsにもミックスインというのがあるのですが、Reactで廃止された経緯があり、scope-slotで実装できるためあまり、使う場面はないかもしれません。
[ミックスイン — Vue\.js](https://jp.vuejs.org/v2/guide/mixins.html)
[Vue\.jsのmixinをslotで代用する \- Qiita](https://qiita.com/terrierscript/items/f051617522b20d57fd7b)


## この記事での技術メモ

シャローコピーとディープコピー  
シャローコピーでdataにコピーしていたので、最後に生成されたミミックが全てのmonster.vueコンポーエントに示されてしましました。

```
// this.monster.options = monster.options; // シャローコピー
this.monster.options = JSON.parse(JSON.stringify(monster.options)); // ディープコピー
```

lodashのマージ  
以下のように第一引数に空のオブジェクトをもたせることで、非破壊的なマージを行えます。

```
this.options = _.merge({}, Monster.defaults, options);
```