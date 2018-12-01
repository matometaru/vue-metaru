---
title: Vueのtransition-groupとReacのTransitionGroup
description: 
eyecatch: /img/blog/17.png
category: [Vue.js, React.js]
---

## Vue.jsのtransitionについて

Vue は、DOM から<mark>アイテムが追加、更新、削除</mark>されたときにトランジション効果を適用するための方法を複数提供しています。

`<transition>`、`<transition-group>`を使って受けられる恩恵は以下が大きいです。

* 自動的に CSS トランジションやアニメーションのためのクラスを適用します。
* トランジションフックが実行されている間、JavaScript を使って直接 DOM 操作を行います。

逆にこれ以上のことを無理にやろうと思うと、複雑になると思います。


## Reactのtransition-groupについて

まずReactのTransitionGroupはアドオンを使うそうです。  
[Reactのアニメーションアドオン'react\-transition\-group'を試してみた \- Qiita](https://qiita.com/yaaah93/items/2a79eb5b4bce35d2549c)
```
react-transition-group/TransitionGroup
```

[Animation Add\-Ons \- React](https://reactjs.org/docs/animation.html#componentwillappear)

> ReactTransitionGroupは子が宣言的に追加または削除されると、特別なライフサイクルフックが呼び出されます。


## Vueのtransition-groupについて

Vueはデフォルトで`<transition-group>`があります。
JavaScriptでアニメーションを行いたい場合は、`<transition-group>`にフックを設定する必要があります。
基本的には問題ないのですが、子コンポーネントでフックを使いたい場合は外部プラグインを使用する必要があります。

## transitionの要素のdestroyed

Vueはdestoyedされた段階で、破壊されたコンポーネントが更新されるのを防ぎます。
トランジションが終了したときに何かしたいことがあれば、トランジションのafterLeaveフックで実行する必要があります。

[トランジションが終了したときに何かしたいことがあれば、トランジションのafterLeaveフックで実行する必要があります。](https://github.com/vuejs/vue/issues/2733)

destroyedしたあとでもaferLeaveなどのtransitionイベントであれば変更が可能。

