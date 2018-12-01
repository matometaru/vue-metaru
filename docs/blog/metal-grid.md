---
title: グリッドレイアウトのVueコンポーネントを作りました
description: プロラムの際のルールをメモ
eyecatch: /img/blog/15.jpg
category: [Vue.js]
---

## 追加機能

css will-chanegプロパティでより快適に。

## 参考にしたやつ

[Pinterest風グリッドレイアウトを作ってみよう \(1/4\)：jQuery×HTML5×CSS3を真面目に勉強（3） \- ＠IT](http://www.atmarkit.co.jp/ait/articles/1306/10/news009.html)
> 2行以降の配置は左端から順番に配置するとは限らず、Topからの距離が一番短い位置に配置される

> 以降のグリッドもTopからの距離が一番短い位置から順に配置される（※必ずしも2行目が全て埋まってから3行目に配置されるとは限らない）。

宣言がめんどくさい、resize、ドラッグいる？？
[jbaysolutions/vue\-grid\-layout: A draggable and resizable grid layout, for Vue\.js\.](https://github.com/jbaysolutions/vue-grid-layout)

ラッパーの高さ取得はどのタイミング？

iにコンテンツをいれるが、画像とかテキストのタグをたくさんいれたい場合大変そう。（そもそもできるのか？）
```
var testLayout = [
    {"x":0,"y":0,"w":2,"h":2,"i":"0"},
    {"x":2,"y":0,"w":2,"h":4,"i":"1"},
    {"x":4,"y":0,"w":2,"h":5,"i":"2"},
]
```

これをReact->Vueにおきかているだけ。
[tsuyoshiwada/react\-stack\-grid: Pinterest like layout components for React\.js](https://github.com/tsuyoshiwada/react-stack-grid)

## 悩んだ箇所

### .babelc 追加
[webpackでjsx記法（HTMLっぽいの）がsyntax errorになる問題 \- DRYな備忘録](http://otiai10.hatenablog.com/entry/2016/04/17/190802)

### JSX記法
JSX記法とは

当然公式にあるw
[描画関数とJSX — Vue\.js](https://jp.vuejs.org/v2/guide/render-function.html)

[【Vue\.js】コンポーネントのtemplateの書き方まとめ \- Qiita](https://qiita.com/seya/items/93a0055c8fdab62d584f)
> また、Babelプラグインを使えば以下のようにJSXで記述することもできるみたいです。

###

index.jsからMetalGridのslotとして渡したものが、子コンポーネントで配列として認識してくれて、ありがたい。
```
  <MetalGrid
    columnWidth={150}
    ref={"test"}
  >
  {images.map(obj => 
    (
      <div
        key={obj.src}
        onClick={() => this.changeItemSize(1)}>
        <img src={obj.src} alt={obj.label} />
      </div>
    )
  )}
  </MetalGrid>
```

## ReacとVueの違う箇所

[Transitioning from React to Vue – Front\-End Society](https://frontendsociety.com/transitioning-from-react-to-vue-c9aa943bd0da)

[Vueを昔触った後Reactをどっぷり触ってもう一回Vueを触ってReactに戻って得た感想 – 📜inuscript🐶 – Medium](https://medium.com/inuscript/vue-and-react-comparision-6c7cb44f18ba)

* Vueはpropsやmethodの記述場所が用意されている。
* JSXでrenderすればほぼ違いはない。

## Install

```
$ npm install react-stack-grid
```

## Quick Example

```
import Vue from 'vue'
import StackGrid from "vue-metal-grid";

const MyComponent = Vue.extend({
  render: h => h(
      <MetalGrid
        :columnWidth=150
      >
        <div key="key1">Item 1</div>
        <div key="key2">Item 2</div>
        <div key="key3">Item 3</div>
      </MetalGrid>
    );
  }
})
```

```
class MyComponent extends Component {
  render() {
    return (
      <MetalGrid
        :columnWidth=150
      >
		{images.map(obj => (
		  <figure
		    :key={obj.src}
		    className="image"
		  >
		    <img :src=obj.src :alt=obj.label />
		    <figcaption>{obj.label}</figcaption>
		  </figure>
		))}

```

[Vue\.jsに書いてある「アロー関数は、this が期待する Vue インスタンスではなく・・・」とは？ \- Qiita](https://qiita.com/_Keitaro_/items/d48733a19c10889e2365)