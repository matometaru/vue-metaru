---
title: JavaScriptの配列をおさらい
description: JavaScriptの配列の生成から複雑な変換処理、最後に様々な配列操作関数を使ったトランプゲームを用意しています。
eyecatch: /img/blog/07.jpg
category: [JavaScript]
---


# JavaScriptの配列操作まとめ

## JavaScriptの配列とは

JavaScriptにおける配列の定義は

* 配列の各要素には0から始まる数字がキーとなる
* lengthというプロパティで、配列の要素数がわかる

初心者の頃に間違いがちなのが、オブジェクト（連想配列）に対してfilter()などの関数を使用して、使えないよって言われるパターン。
連想配列って名前が勘違いの原因かと思います。

オブジェクトもキーを数字にして生成することは可能ですが、配列ではありません。
```
var drinks = {
	"0": "コーヒー",
	"1": "カフェオレ",
	"2": "メロンソーダ",
}
drinks[0]
>> "コーヒー"
drinks.length
>> undefined
```

## 配列の作成

```
var drinks = ["コーヒー", "カフェオレ"];
```

配列 + オブジェクト

```
var drinks = [
	{name: "コーヒー", price: 100},
	{name: "カフェオレ", price: 150},
	{name: "メロンソーダ", price: 200}
]
```

念のため、本当に配列なのか確認します。
```
Object.prototype.toString.call(drinks) 
>> [object Array]
Object.prototype.toString.call(drinks[0])
>> [object Object]
```

### push()

配列を追加する

<DemoBlock demo="blog-07-demo01" option="push"/>

### sort()

配列を並び替えたい（価格が高い順に並び替える）

<DemoBlock demo="blog-07-demo01" option="sort"/>

```
drinks.sort((a,b) => {
	return b.price - a.price
})
```

::: tip
関数bodyが１つのreturn文の時はブロックと「return」を省略できます。
:::

```
drinks.slice().sort((a,b) =>  b.price - a.price)
```

::: tip
Array.slice()メソッドは配列を複製するので、もとのレコードを並び替えたくない場合に使用します。
:::

### some()

一致する値があるかチェック

<DemoBlock demo="blog-07-demo01" option="some"/>

```
drinks.some((row)=> row.price == 150)
```

::: tip
引数が一つだけの時は「()」を省略できます。
:::

```
drinks.some(row => row.price == 150)
```

### filter()

指定したカラムの値が一致した配列を抽出

<DemoBlock demo="blog-07-demo01" option="filter"/>

```
drinks.filter(row => row.price == 150)
```

### filter() + some() + indexOf()

カラムの値が一致した配列を抽出

```
let search = (query) => {
	return drinks.filter((row) => 
		Object.keys(row).some((key) =>
			String(row[key]).indexOf(query) > -1
		)
	)
}
search(150)
search("コーヒー")
```
::: tip
Object.keys()は与えられたオブジェクトのすべての列挙可能なプロパティを表す文字列の配列。
:::
Object.keys(row)で["name", "price"]の形の配列が返り、それに対してsome()で値が該当するかチェックしています。

### forEach()

配列のループ。
途中でループから抜けることが難しく、オブジェクトには使用できないので、
jQueryの$.eachやLodashの_.forEachの使用をおすすめします。

> あと、$.eachはreturn falseでbreakできるのは解りやすいかもしれませんが、Arrayとlodashにはsomeがあるので困りませんし、なんならsomeのほうが「このループ、途中で抜ける可能性あるのね」とメソッドをみただけで判断できる利点があります。

### map()

配列内の要素を変換します。
以下のコードで配列の価格を消費税込みの価格に変更しています。

<DemoBlock demo="blog-07-demo01" option="map"/>

```
drinsk_tax = drinks.slice().map(row => {name: row.name, price:row.price * 1.08})
```

以下のリンクはmapをかなり有効的に使っている例です。
[JavaScriptで実践！なんちゃって関数型プログラミングで九九表を作ってみよう！ ｜ SiTest \(サイテスト\) ブログ](https://sitest.jp/blog/?p=3685)

スプレッド演算子を使って価格の最大値を取得

```
Math.max(...drinks.map(m => m.price));
>> 200
```

### reduce()

今までの便利な関数を全てreduce()でカバーできるくらいの便利な関数です。
コールバック関数の引数がアキュムレーター(以下，aと宣言する)となります。
また第2引数の初期値の設定を忘れるとはまってしまう可能性があるので以下を参考にしてください。

<DemoBlock demo="blog-07-demo01" option="reduce"/>

全て同じ型の配列であれば問題ない
```
let cards = [1,2,3];
let sum = cards.reduce((a,x) => return a += x)
sum >> 6
```

初期値を指定しなかった場合
```
let cards = [
	{num: 10, mark: "jorker"},
	{num: 20, mark: "jorker"},
	{num: 40, mark: "jorker"}
]
let num = cards.reduce((a,x) => a += x.num)
num >> [object Object]2040"
```

初期値を正しく指定した場合
```
let cards = [
	{num: 10, mark: "jorker"},
	{num: 20, mark: "jorker"},
	{num: 40, mark: "jorker"}
]
let num = cards.reduce((a,x) => a += x.num, 0)
num >> 70
```

## 配列といえばトランプ

<DemoBlock demo="blog-07-demo02"/>


## まとめ

JavaScriptの配列の標準関数はかなり