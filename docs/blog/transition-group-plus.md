---
title: transition-group-plusの検証
description: transition-group-plusを使ってみる
eyecatch: /img/blog/22.jpg
category: [Vue.js]
---

## transition-group-plusとは

Vue 2.0+遷移は異なる遷移コンポーネントを持つコンポーネントで遷移モードを使用する能力が不足しているためです。このプラグインは、Vue 1.0のようにその機能をVueに戻そうとします。

[FooStudio/vue\-transition\-group\-plus: A Vue plugin and components that allows interruptible transitions and specifying transition order\.](https://github.com/FooStudio/vue-transition-group-plus#readme)

## 使ってみた

GitHubにあるUsage通り使うと、以下のエラーがでた。

```
<transition-group-plus transition-mode="in-out" tag="div">
    <transition-plus @enter="onEnter" @leave="onLeave">
        <h4>component</h4>
    </transition-plus>
</TransitionGroupPlus>
```

```
[Vue warn]: Injection "namespace" not found
```

エラー結果をぐぐってもあまり有力な情報はなかったのですが、
`<transition-plus>`を子コンポーネントにすることで、エラーが消え、使えるようになりました。

## DEMO

`<transition-group>`として使いたい場合は`transition-mode="out-in"`をout-inにしないとleaveイベントが実行されないので注意。

<DemoBlock demo="blog-22-demo01"/>

デモも正常に動いています。

## まとめ

普通のサイトを作成するときはスタイルでアニメーションを設定をする方法が使いやすいのですが、
アニメーションを動的に変更したい、かつ、子コンポーネントで計算した値をアニメーションに使いたいときなどはtransition-group-plusを使って見てください。