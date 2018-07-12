---
title: Lodashが便利と言われているが、何がいいのかわからなかったので調べてみた
description: Lodashの日本語記事が少なく、標準関数との違いが分かりづらかったのでデモと合わせて紹介します。
eyecatch: /img/blog/09.png
category: [JavaScript,Lodash]
---

# Lodashが便利と言われているが、何がいいのかわからなかったので調べてみたら腰抜けた

## Lodashとは

配列を操作したり、抽出したり、オブジェクトに変換したり、が簡単にできるライブラリ。  

[細かすぎるけど伝わって欲しいlodash\.jsの話 \- KAYAC engineers' blog](https://techblog.kayac.com/2017-12-2_lodash)  
→ JavaScriptの標準関数でもできる。

[JavaScript \- lodashを使うとjqueryより便利なとき\(118806\)｜teratail](https://teratail.com/questions/118806)  
→ teratailでピンポイントな質問発見 & 回答が分かりやすい！！

[Lodash/Underscoreは必要ない（かも） \- Qiita](https://qiita.com/ossan-engineer/items/ad5313d84da82c6ac421)

## カリー、DI

なるほど・・。Lodashが使ってみようかなってレベルの人は現時点ではあまり気にしなくていいと思います。

[食べられないほうのカリー化入門 \- Qiita](https://qiita.com/KDKTN/items/6a27c0e8efa66b1f7799)

> 後はcurryですね。
> その時にDIのように1個だけ引数を束縛しておくという使い方が出来るので非常にはかどります

```
var add = _.curry((a, b) => a + b);
var add5 = add(5);
result = add5(10); // 15
```

## toPairs()

初めて聞く関数名でした。似た感じだとtoArray()がphpやjQueryにありましたね。


Object.entries(result)と同じ挙動

```
let obj = { a: 1, b: 2, c: 3 }

console.log( Object.keys( obj )    )  // [ "a", "b", "c" ]
console.log( Object.values( obj )  )  // [ 1, 2, 3 ]
console.log( Object.entries( obj ) )  // [ ["a", 1], ["b", 2], ["c", 3] ]
```

## formPairs()

toPairs()とは逆で二次元配列をオブジェクトに変換します。

```
[
	[key1, value1],
	[key2, value2],
	[key3, value3]
]

の配列を

{
	key1: value1,
	key2: value2,
	key3: value3
}
```

## orderBy

`_.sortBy(collection, [iteratees=[_.identity]])`
似た関数にsortByがあります。sortByは並び替えの指定がascで固定です。
並び替えを切り替えたい場合などはorderByを使用します。

```
  // js
  this.filteredDrinks = this.drinks.slice().sort((a,b) =>  b.price - a.price)
  // Lodash
  this.filteredDrinks = _.orderBy(this.drinks, 'price', 'desc')
 ```
 
 jsでの記述と比べ、Lodashは一目で何をしているか分かりますね。

## throttle, debounce

今まで紹介してきた、配列、Collectionに対しての関数とは違い、汎用的な関数です。

.debounceは特にコストの高い処理の実行を制御するためのlodashの関数です。  
 Vue.jsの公式ドキュメントでも使用されていますね。

 [算出プロパティとウォッチャ — Vue\.js](https://jp.vuejs.org/v2/guide/computed.html#%E3%82%A6%E3%82%A9%E3%83%83%E3%83%81%E3%83%A3)

 [lodashの\_\.throttleと\_\.debounceの使用例 \- Qiita](https://qiita.com/akifo/items/4d715929934a458fb189)