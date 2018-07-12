---
title: Closureまとめ
description: 
eyecatch: /img/blog/12.jpg
category: [JavaScript]
---

## 前提知識

* ES2015より前（var宣言のみの時代）において、JavaScriptのブロック・レベルのスコープは存在しない
* ES2015以降のlet,constはブロックスコープを定義する

letやconstが使えるようになってもクロージャは現役。
プライベート変数としての役割が大きい。
クラスでも同様のことが可能だが、シンプルな関数の場合はクロージャで実装したい。

[グローバル変数を使わずに関数に「状態」を持たせる（疑似プライベート変数）](http://analogic.jp/closure/)  
[第3回　変数の宣言とスコープ \(4/4\)：連載：Ajax時代のJavaScriptプログラミング再入門 \- ＠IT](http://www.atmarkit.co.jp/ait/articles/0708/21/news116_4.html)

> クロージャとは、ひと言でいうならば、「ローカル変数を参照している関数内関数」のこと。

## 基本的なクロージャ

```
function counter(num) {
	let cnt = num;

	return function() {
		return cnt += 1;
	}
}
let myCounter = counter(10);
myCounter() >> 11
myCounter() >> 12
```

## 複数のクロージャ

```
function counter(num) {
	let cnt = num;

	return {
		increment: function() {
			return cnt += 1;
		},
		decrement: function() {
			return cnt -= 1;
		} 
	}
}
let myCounter = counter(10);
myCounter.increment() >> 11
myCounter.decrement() >> 12
```

## varを使った問題のコード

```
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

```
var i = 0
for (; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```

## letを使ったコード

letはブロックスコープを定義します。
```
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
console.log(i) >> i is not defined
```
ブロックスコープが実装されていますね。  

forの外でiを参照したい（一致した配列のインデックスを知りたい等の）場合は、forの外側でiを定義します。

```
let i = 0;
for (; i < 3; i++) {
    if(i===2) break;
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
console.log(i) >> 2
```

## まとめ

クロージャを使うことでプライベート変数を簡潔に記述できます。
また、今まではまでクロージャを使わないといけなかった箇所をletを使えば解決する例もあります。