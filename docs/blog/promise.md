---
title: コールバック、Promise、async/awaitについて
description: Lodashの日本語記事が少なく、標準関数との違いが分かりづらかったのでデモと合わせて紹介します。
eyecatch: /img/blog/10.jpg
category: [JavaScript]
---

# 非同期プログラミング

<Adsense
	data-ad-client="ca-pub-9870466105427266">
</Adsense>

制作会社のコーダーとして働いていた頃は、非同期プログラミングを使う機会が少なく、
簡単なアニメーションであれば、setTimeout、ユーザーからのイベントでなんとかなってました。

簡単な$.ajaxか、サイト内検索にMTのAPIを使用した時に、jQueryのDeferredオブジェクトを使ったくらいですね。  
[おじさんが若い時はね$\.ajax\(\)のオプションでsuccessとかerrorとか指定していたんだよ（追憶） \- Qiita](https://qiita.com/tonkotsuboy_com/items/0722ad92f370ab0c411b)

Vue使ってプログラミングをしていると、APIからデータを持ってきたいことが多く、
このタイミングでJavaScriptの非同期をしっかり学びたいと思います。

## 非同期の定番

* コールバック
* Promise
* async/await

async/awaitもPromiseを利用しているため、Promise自体の理解は必須です。
Promiseもコールバックを使って非同期の処理を実現しており、イベントなどの処理ではコールバック単独でも利用されているので、全て理解しておく必要があります。

## Promise

Promiseを作るには非同期処理の内容を記述した関数を引数に指定して、Promiseのインスタンスを生成します。

```
new Promise((resolve, reject) => {
	// 非同期処理
});
```

今回の非同期処理はVue.js公式ドキュメントにも利用されているyes/noを返すAPIを利用します。
[Yes Or No? yesno\.wtf — foolproof™ decision\-making \(api available\)](https://yesno.wtf/#api)

axiosを使えばPromiseをサポートしているので以下のように簡潔に書けすが、まずは生のJavaScriptで行ってみます。

```
axios.get('https://yesno.wtf/api')
.then(function (response) {
		vm.answer = _.capitalize(response.data.answer)
	})
	.catch(function (error) {
		vm.answer = 'Error! Could not reach the API. ' + error
	})
```

### JavaScirptでapi取得

json取得 → コンソール出力の非同期処理です。

```
function question() {
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest();
		req.onreadystatechange = function() {
			if (req.readyState == 4) { // 通信の完了時
				if (req.status == 200) { // 通信の成功時
					let data = eval('(' + req.responseText + ')');
					resolve(data.answer);
				}
			} else{
				console.log("通信中...");
			}
		}
		req.open('GET', 'https://yesno.wtf/api', true);
		req.send(null);
	});
}
question().then(
	function(val) {
		console.log('answer:' + val)
	},
	function(err) {
		console.log(err)
	}
);
```

上記のコードを少し変更し、Vueコンポーネント化したのが以下のデモです。

<DemoBlock demo="blog-10-demo01"/>

通信完了のタイミングでYES/NO、gif画像の表示を行なっているので、
突然読み込みが完了していない画像が現れ、あまり見た目がよろしくありません。

<InArticleAdsense
    data-ad-client="ca-pub-9870466105427266">
</InArticleAdsense>

### プロミスの連鎖

プロミスの連鎖とは、ひとつのプロミスが成功したら、次のプロミス、次のプロミス...を順に行ってくれるものです。
先ほどの処理に加え、json取得 → 画像読み込み完了 → 表示の非同期処理を実行します。

```
function question() {
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest()
		req.onreadystatechange = function() {
			if (req.readyState == 4) { // 通信の完了時
				if (req.status == 200) { // 通信の成功時
					let data = eval('(' + req.responseText + ')')
					resolve(data)
				}else {
					reject(req.status)
				}
			} else{
				console.log("通信中...")
			}
		}
		req.open('GET', 'https://yesno.wtf/api', true)
		req.send(null)
	})
}
function imageLoaded(src) {
	return new Promise((resolve, reject) => {
		let img  = new Image()
		img.src = src
		img.addEventListener("load", () => { 
			resolve(src) 
		})
	})
}
question().then(
	(data) => {
		this.answer = data.answer
		this.status = 1
		return imageLoaded(data.image)
	},
	(err) => {
		console.log(err)
	}
).then(
	(src) => {
		this.image = src
		this.status = 2
	}
)
```

<DemoBlock demo="blog-10-demo02"/>

読み込み完了まではローディング画像をセットし、完了後に読み込んだ画像を表示しています。

## async/awaitで書き換えてみる

関数の前にasyncを付けると、async関数になります。演算子awaitはasync関数の中でのみ使えるもので、対象のPromiseが成功するまで待ってくれます。
さきほどのコードのプロミスの連鎖箇所をasync,awaitで書き換えています。

```
let display = async () => {
	try {
		await question()
		await imageLoaded()
	} catch(err) {
		console.log("エラーが起こりました:" + err)
	}
}
display()
```

<DemoBlock demo="blog-10-demo03"/>

<InFeedAdsense
	data-ad-layout-key="-fg+5n+6t-e7+r"
    data-ad-client="ca-pub-9870466105427266">
</InFeedAdsense>

## 最後にaxiosを使って簡潔に

axiosはPromiseベースのHTTP通信を簡単に行うことができるJavascriptライブラリです。

`npm install axios` or `yarn add axios`

or

[axios \- cdnjs\.com \- The best FOSS CDN for web related libraries to speed up your websites\!](https://cdnjs.com/libraries/axios)

axiosがプロミスベースなのでもう少し簡潔に記述できそうなのですが、
axios.get()したものをさらにPromiseを返す形になってしまいました。

<DemoBlock demo="blog-10-demo04"/>

今後は要件に合わせてPromise、async/await、axiosを積極的に使っていこうと思います。