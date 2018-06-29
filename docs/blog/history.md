---
title: フロントエンジニアが3年間チャットワークにメモしてたことを振り返る
description: マークアップエンジニア、フロントエンジニア、バックエンドエンジニアとして3年間働いた会社で業務中に気になったことのメモを振り返ります。
eyecatch: /img/blog/05.jpg
category: [VuePress]
---

# フロントエンジニアが3年間チャットワークにメモしてたことを振り返る

<Adsense
	data-ad-client="ca-pub-9870466105427266">
</Adsense>

<InArticleAdsense
    data-ad-client="ca-pub-9870466105427266">
</InArticleAdsense>

<InFeedAdsense
	data-ad-layout-key="-fg+5n+6t-e7+r"
    data-ad-client="ca-pub-9870466105427266">
</InFeedAdsense>

## チャットワークのエクスポート

チャットワークには標準でエクスポートする機能がないので、以下のサービスを利用しました。
[ChatWorkからファイルも含めてログをエクスポートしたいならgoodbye\_chatworkだ！KDDI ChatWork対応 \- Qiita](https://qiita.com/hirokishirai/items/29bfdfc6d61b911aacc1)

原因不明ですが、かなりの投稿が重複していたのと、Deleteも含まれていたので以下の作業を行いました。
1. Excelで重複削除
2. `201\d-(.*?)\[deleted]\n`を置換
3. jsonにコンバート


<Adsense
    data-ad-client="ca-pub-9870466105427266">
</Adsense>

## チャットワークにメモを残した経緯

最初の方はブックマークなどを利用していたのですが、あまり見ることがなく、
気になったことは業務で一番利用するチャットワークに保存するようになりました。

なので入社して数ヶ月の履歴はあまり多くありません。

まとまったコードに関しては[Cacher](https://www.cacher.io/)に保存していました。

## 経歴
* 2015-05-08 入社
* 2018-06-29 退職

その間にフロントエンドエンジニア→バックエンドエンジニアとなっていますが、  
ほとんどがフロントエンドの作業でした。  
入った当時のスキルは

* マークアップの経験は0
* レスポンシブコーディングを理解している
* jQueryのプラグインをカスタマイズして独自の機能を追加できる
* WordPressの既存テーマが修正できる

という感じでした。

## 3年間のチャットワーク一覧

<ChatList/>

~~同じ日付は表示1回でおk~~  
~~axiosでchatwork.jsonを取得~~  
~~chatworkのデータに公開してはいけないデータがないかチェック~~  
~~[info]...[/info][info]...[/info]の正規表現修正~~  
~~検索機能追加~~  
日付での記事並び替え  
[code]...[/code]の正規表現
検索からアンカーリンクおすとずれる。最初からいれておくとずれない。

sweetscrollがうごなかった原因はidの形式が間違ってたから。
`#date-2018-06-26T14:09:22+09:00`

2016年6月あたりからcssのクラス設計に興味をもってる模様
大規模サイトのコーディングで苦しんでいたのでしょうか。

2017年5月もまだまだコーディングをやってますね。

`いみわからん http://codepen.io/zadvorsky/pen/VaXqRW`

`:beforeや<i>たぐはtransition効かない`
あるある

2017年12月でやっと
Laravelがでてきました

2018年1月で
Vue.jsがでてきました。
gitもでてきました。（個人では使ってたんですが、会社でやっと浸透し始めた感じです）

## この記事での技術メモ


正規表現 最短マッチ + gフラグ
```
[info]reg01[/info][info]reg02[/info]
↓
<div>reg01</div><div>reg02</div>
```
上記のように変換をしたい場合、最短マッチ + gフラグを付与する必要があります。

```
replace(/\[info](.*?)\[\/info]/g, '<div class="chat-body-info">$1</div>')
```

アロー関数でのthis
```
axios.get('/chatwork.json')
	.then(response => {
	    this.items = response.data;
	})
```

v-forの引数はvalue, key, indexが使える  
[リストレンダリング — Vue\.js](https://jp.vuejs.org/v2/guide/list.html#%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE-v-for)
```
<div class="chat-container" v-for="(item,key,index) in items">
```

[v\-htmlでfilterを使いたい \- Qiita](https://qiita.com/pokkur/items/e6c7b20852471a9eca29)
```
<div class="chat-body" v-html="$options.filters.parse(item.content)"></div>
```

SweetScrollのoverflow:scrollボックスの場合 
```
const sweetScroll = new SweetScroll({/*...*/}, "#container");
```
のように設定する必要がある。
またアンカーは#container内部に設置する必要がある。
