---
title: 日々の簡易メモ
description: 日々の簡易メモ
eyecatch: /img/blog/16.jpg
category: [Vue.js]
---

## 2018.07.13

Reac -> Vue のコンポーネント作成開始

## 2018.07.14

[tsuyoshiwada/react\-stack\-grid: Pinterest like layout components for React\.js](https://github.com/tsuyoshiwada/react-stack-grid)

sizemeは高速だが、高さは独自のロジックで設定している。

スプレッド演算子を使えば配列の最大値を取得するのが簡単。
```
const array = [3, 8, 7, 2, 5];
Math.max(...array); // 8
```

親要素の高さについては以下のロジックと同じ。  
[Pinterest風グリッドレイアウトを作ってみよう \(2/4\)：jQuery×HTML5×CSS3を真面目に勉強（3） \- ＠IT](http://www.atmarkit.co.jp/ait/articles/1306/10/news009_2.html)

## 2018.07.15

~~休み~~

グリッドレイアウトのロジック部分から。

reactはdefaultPropsに値をいれれば自動でデフォルトのpropsとなるっぽい。

以下のエラーの原因はbabelrcに以下を記述で解決
`Module build failed: SyntaxError: Unexpected token as`   
```
"stage-1"
```

各パッケージのインストール
```
yarn add exenv ...
```

flowを使っていない現時点では、typesフォルダのindex.jsは不要

propsの値にstyleは使えない。
`style is a reserved attribute and cannot be used as component prop.`
on~~で始まるのも使えない。
（調べても情報でてこない。）

<transition-group></transition-group>
は以下のようなデフォルトのpropを持っている。

```
appearActiveClass:undefined
appearClass:undefined
appearToClass:undefined
```

ロジック部分の理解が結構時間かかる + スプレッド展開の配列や、es2015の入れ方など、効率のいい書き方があるが、
その辺はまだ見慣れてないので、理解に少し時間がかかっている。
```
    const [maxColumn, columnWidth] = getColumnLengthAndWidth(
      containerWidth,
      rawColumnWidth,
      gutterWidth
    );
```

## 2018.07.16

doLayayout周りのロジック完成まで目標

handleItemMountedが何やっているのか不明。
なぜGlidLineに記述しているのか。
GridItemがマウントされた段階で、行いたい処理がある。
GridItemがマウントされたらGridInlineで処理を行うようのコールバック関数。

ReactはDOMを取得する場合は一手間加える必要がある。
Reactで実際のDOMを返す場合は、以下の関数を使う模様。
[ReactDOM \- React](https://reactjs.org/docs/react-dom.html)
```
ReactDOM.findDOMNode(component)
```

親、子、孫のライフサイクルの関係の理解。別途メモした。

doLayoutでGridItem.vueに渡す値を生成する必要がある。
GridItemに`const { rects, actualWidth, height } = this.state;`を渡す必要があるので、
初期化時に`state: this.doLayout(this.$props),`は必須。

data内でthis.itemsが使えないとすれば、 this.doLayoutでthis.itemsを使用していてエラーがでている可能性がある。

```
return {
	items: {},
	imgLoad: this.items,
	size: {
		width: 0,
		height: 0
	},
	mounted: false,
	state: this.doLayout(this.$props),
}
```

エラーがでてるからthisを参照できない。

Vueのpropsでfunctionが渡らねえええええええ

onMounted は NG
enMounted は OK

## 2018.07.17

this.items[key]で以下のエラー
`Error in mounted hook: "TypeError: Cannot read property 'items' of undefined"`

配列は空でも用意してないとエラーになる。
Reactはエラーになってないので、
`items: { [key: string]: GridItem; };`この宣言がポイントなのかな。

Reactが最初からkeyに値が入っているのならちゃんと初期化される。

とりあえず解決。
問題のあったコード
コールバックのfunction部分のthisは理解しづらいな。

NG
```
handleItemMounted: (item) => {
			window.alert(this.items);
```

OK
```
handleItemMounted: function(item) {
			const { itemKey: key } = item.$props;
```


MetalGridからGridInlineにprops渡っていない問題。

Babelのプラグイン追加
[vuejs/babel\-plugin\-transform\-vue\-jsx: babel plugin for vue 2\.0 jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)
```
yarn add babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx babel-helper-vue-jsx-merge-props babel-preset-env
```

オブジェクトスプレッド演算子が正しく適用されていません
[Object spread operator isn't applied correctly · Issue \#143 · vuejs/babel\-plugin\-transform\-vue\-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx/issues/143)

スプレッド演算子使わないように変更すればいっか。

opacityが0のままなので、表示されない。
アニメーションの発火はどこでやってるのか？

まずはReactの既存コードのアニメーションの流れを把握する。

Vueで<transition-group>のjsxにアニメーションを付ける場合どうすればいいのか。


記述不明箇所
ここを
```
const InlineProps = Object.assign(Props , {
	refCallback: Function
})
```

こう書き換えた。
```
type InlineProps = Props & {
  refCallback: Function;
  size: {
    width: number;
    height: number;
  }
};
```


[Reactのアニメーションアドオン'react\-transition\-group'を試してみた \- Qiita](https://qiita.com/yaaah93/items/2a79eb5b4bce35d2549c)

> ドキュメントに書かれていますがReactTransitionGroupとReactCSSTransitionGroupはReactv15.5.0以上では非推奨となったようです。


CSSのインラインプロパティでアニメーション行なっているのなら、transition-groupいらないのでは？
Reactのは各タイミングで発火するように使っている。

## 2018.07.18

gridRef = StackGridのインスタンスを参照します。
（refは普通とは異なる使い方をしているっぽい？）

gridRefはMetalGridのupdateLayoutを使うためのものであり、
高さを変更した時にレイアウトを更新するという例しかなく、使用頻度は少ない。

index.js
```
	render (h) {
		return (
			<MetalGrid
				// MetalGridコンポーネントへ渡すコールバック関数
				// 
				gridRef={function(grid){this.grid = grid}}
			>
```

MetalGrid
```
	methods: {
		// GridInlineへ渡すコールバック関数
		handleRef(grid) {
			this.grid = grid;

			// 関数であればコールバック関数を実行
			if (typeof this.$props.gridRef === 'function') {
				this.$props.gridRef(this); // 親にインスタンスを返す
			}
		},
	},
	render (h) {
		return (
			<GridInline
				refCallback={this.handleRef}
```

GridInline
```
	methods: {
		handleRef() {
			this.$props.refCallback(this);
		},
	},
	render (h) {
		return (
			<transition-group
				ref={this.handleRef}
```

==============

Vueのmethodの定義について。
メソッド内での関数定義が3通りあるが、違いが説明できない。
```
	methods: {
		log1() {
			console.log(this.imgLoad) >> test
		},
		log2: function() {
			console.log(this.imgLoad) >> test
		},
		log3: () => {
			console.log(this.imgLoad) >> undefined
		},
	},
```
log3()はVueのmethods内においては使えない。thisがVueを指さない。
~~log2は関数の参照を渡したい時。~~
log1とlog2はほぼ同じ。

log3()はコールバックなどでthisを渡す先に委ねたい場合などに使う。
[Vue\.jsに書いてある「アロー関数は、this が期待する Vue インスタンスではなく・・・」とは？ \- Qiita](https://qiita.com/_Keitaro_/items/d48733a19c10889e2365)
>> アロー関数は呼び出された場所をthisとするという動きをするからです。

log3
methodsオブジェクトにimgLoadがないので undefinedとなる。

==============

ReactはSlotがpropsに入っているのでslotの更新を受け取れるが、
VueでSlotの更新を感知するのは可能か？

[Is it possible to emit event from component inside slot · Issue \#4332 · vuejs/vue](https://github.com/vuejs/vue/issues/4332)
なさげ。


## 2018.07.19

Vueでslotを更新したときのイベントをキャッチできるか。

[javascript \- Vue\.jsで、コンポーネントがスロットの内容が変更されたときに検出することができます \- Stack Overflow](https://stackoverflow.com/questions/38148297/in-vue-js-can-a-component-detect-when-the-slot-content-changes)

React -> Vueは結構情報あるっぽい。
[reactからvueにお引っ越ししてみる\(前篇\) \- Qiita](https://qiita.com/umema4/items/aceb3df940b92313804f)


スロットのアイテムが減る。

GridInlineが再レンダリングされる。

再リンダリングされるまえに、
beforeUpdateで再計算しようとするが、データを更新するので、再レンダリングの無限ループに入ってしまう。


Vue

スロットでレンダリングされるからややこしい。
* スロットの変化でレンダリングを行う。
* beforeUpdatedでデータを更新してさらにレンダリングを行う無限ループ。

React

* スロット=chldrenを更新してもレンダリングされない。
* shouldComponentUpdateでpropsの変化でレンダリングを行う。

==============

Vueはdestoyedされた段階で、破壊されたコンポーネントが更新されるのを防ぎます。
トランジションが終了したときに何かしたいことがあれば、トランジションのafterLeaveフックで実行する必要があります。

[トランジションが終了したときに何かしたいことがあれば、トランジションのafterLeaveフックで実行する必要があります。](https://github.com/vuejs/vue/issues/2733)


GridItem.vueを
 GridInline 内にいれてやればとりあえずはVueのアニメーションの形としてはいけそう。

現状、GridItem.vueで位置を計算しているのでややこしい。

Vueは親でJsのフックなので、親でアニメーションを完結すべき。
Reactは子でフックがあるので、子でもたすべき。
ここはユーザーからも関係ない場所なので、無理やり合わすべきでないかも。

## 2018.07.20

今日の目標
コールバック部分の理解、Transition部分の方針

==============

enter(el,cb,key)のようにkeyが取得できたら、子要素に


onLayoutをpropsに追加すると以下のエラーがでた。原因不明。
```
[Vue warn]: Invalid handler for event "layout": got null
```

propsの名前にon~~はだめだったの忘れてた。
layoutCbに変更

==============

GridItemをクラスにして計算だけ呼び出せばおk

今何に悩んでるのか？
-> GridItemの呼び出し方で

インスタンス化はcreatedの段階で行う。
レンダリングのたびにGridItemを計算すればよい。
削除時、追加時はwatchで監視してる関数内で行う。

==============

位置は問題ない。
leaveの時のアニメーションが設定できない。 

==============

GridItem.jsでクラス化して使うか。
これは毎回newする必要があるかも。

GridItemの計算箇所だけ移行する。
これが一番簡単と思うが、適当に作るとごちゃごちゃになりそう。

==============

アニメーションおわったら、リサイズと各オプションのテストなのでもうすこし！！

[vue\-grid\-layout/GridItem\.vue at master · jbaysolutions/vue\-grid\-layout](https://github.com/jbaysolutions/vue-grid-layout/blob/master/src/GridItem.vue)

vue-grid-layoutを読んでみる。

## 2018.07.21

element-resize-detectorのインストール
とりあえず#appにリサイズイベントを設定。
`transition-groupのref={this.handleRef}`に設定すべきだが、handleRefが不明。

==============

[全力で大きくなるReactのコードをスタイルガイドに沿って見直したら、大変勉強になりました \| Wantedly Engineer Blog](https://www.wantedly.com/companies/wantedly/post_articles/32166)
> refのcallbackで書く方が綺麗で安全なコードになります。このように、callback形式でしか実現できない処理があるが、文字列での指定でしか実現できないことはないため、はじめからcallback形式で書くことが推奨されます。

Reactのコンポーネントを実際に動かして、debugして検証。
検証結果、

React
ref={this.handleRef}に関数の参照を入れても実行しれてくれる。

Vue
ref={this.handleRef()}のように関数を実行する必要がある。

==============

monitorImagesLoadedを指定した場合は、updateLayoutが再度実行される。

==============

leaveはdoneしないと、コンポーネントは消えるが、要素が消えずに残ったままになる。
```
	_leave: function(el,done) {
		// this.items[4].setLeaveStyles();
		// el.style.background = 'red';
		done(); // done()しないと消えずに残ったまま。
	},
```

## 2018.07.23

ひたすらtransition-groupについて調査
docs以下にDEMOの環境作成

## 2018.07.24

GridInline.rendrer // アイテム削除によるレンダリング
↓
transition leaved // transition leavedイベントキャッチ
↓
GridItem.destroyed // leave後破壊される
↓
GridItem.rendrer x 6 //ここで位置が移動するので opacity: 1に更新される。

MetalGrid.vueに統合するのは、
imageLoadの調整
コードの複雑化、
関数の移行などがあり、億劫。

## 2018.07.26

VueMetalGridのアニメーション設定完成。

* webpack環境の快適な設定
* サイトの作成

## 2018.07.27

引き続きwebpack設定
vue-style-loader
css-loader
を追加インストール

`Failed to mount component: template or render function not defined.`
というエラーはrequire()に .deafalutをつけることで解決

単一コンポーネントがうまく認識されておらず、表示されない問題。
webpackの設定が問題か？

この設定かな？
上記のdefaultの設定を消すことでうまく動いた・・。
```
alias: {
  vue$: 'vue/dist/vue.esm.js',
```	

routerで複数置くとnamespaceが被ってしまう。
```
index.js:34 TransitionGroupPlus: namespace 1532694536043 is already in use!
```

namespaceを乱数にしてみたが、変化なし。
providerがmounted時ごとによばれてないからが原因と思う。

transitiongroupのremoveChiefをコメントアウトでいけた！
```
    beforeDestroy(){
        // Vue.removeChief(this._provided.namespace);
    },
```

## 2018.08.01

なぜReact Stack Gridを選んだか。
今後githubにどんどんリポジトリを登録してくにあたってちょうどいいボリュームで、良質なものを真似したかった。
わだつよしさんは日本語の記事もあり、Readmeやデモページもしっかり作っておられるので模倣するには最高。

パラメーター動作確認

className		アイテムのラッパーのクラス名
style 			styleは予約語で、使用頻度も少ないと判断し削除
component		アイテムのラッパーのタグ
itemComponent	グリイドアイテムのタグ 
gridRef			render関数でAPI関数を参照したいときに使用。templateを使う場合はrefを使用。
columnWidth		グリッドアイテムの幅
gutterWidth		グリッドアイテム間の横マージン
gutterHeight	グリッドアイテム間の縦マージン
duration		transition-duration
easing			
appearDelay		グリッドアイテムの出現間隔
appear 			初回非表示アニメーション
appeared
enter			
entered
leaved
units			
monitorImagesLoaded
vendorPrefix
userAgent
onLayout
rtl				

style
enableSSR
horizontal

## 2018.08.02

webpack.config.production.jsで以下の記述があるとエラーになる。

ERROR in bundle.js from UglifyJs
TypeError: Cannot read property 'sections' of null
```

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
```

ルートじゃないので、routerと一致しない、画像パスも異なる。
https://matometaru.github.io/vue-metal-grid/


## 2018.08.03

typescriptのインストール

## 2018.08.04

ESLintのインストール

> オブジェクトリテラルが拡張されてメソッドを短く定義できるようになった。
オブジェクトのリテラル
[メソッド定義記法が実装された \- JS\.next](http://js-next.hatenablog.com/entry/2014/09/12/150322)

components宣言なくても使える。
別名で使いたい場合などは宣言する？
```
components: {
	GridItem: GridItem,
},
```

以下消してみる。
```
    "eslint-plugin-jsx-a11y": "^6.1.1",
    "eslint-plugin-react": "^7.10.0",
```

## 2018.08.05

MAMPインストール
新規テーマ調査 CocoonとSnowMonkeyどっちがいいか？
WordPressのプラグイン整理

以下でリッチスニペットの簡単な例が作成可能
[構造化データ マークアップ支援ツール](https://www.google.com/webmasters/markup-helper/u/0/?hl=ja)

以下でデータが正しいか確認
[構造化データ テストツール](https://search.google.com/structured-data/testing-tool/u/0/)

リッチスニペット完了。

WordPressのテーマ試し。
Cocooいい感じ。アドセンス追加しやすいので、クリック率増えそう。
* Table of Contensが標準なのでプラグインを削除
* スキンスタイルの設定
* snsの設定、line,google削除、色変更
* ナビのカスタマイズ

## 2018.08.08

https://blog.mach3.jp/2010/12/21/use-curl-for-filegetcontents.html
モバイル回線のノートでYahoo!のトップページを取得してざっくり計測したところ、

file_get_contents : 4秒前後
cURL : 2秒前後


DOMDocument::loadHTML
でhtmlを整形できる
http://blog.katty.in/1400

array_uniqueで削除可能
[PHP の array\_unique で多次元配列の重複を削除できるか : 犬ターネット](https://mgng.mugbum.info/50)

## 2018.08.10

```
$file_iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator(
```

だとシンプルに再起処理がかけるが、ある程度のロジックをもたせたい場合はうまくできない。
使い慣れた（？）再起で行う。

## 2018.08.11
【B-3】ソート途中
・バブルソートの実装
・マージソートの実装
・クイックソートの実装
・どのソートが最速か判定するアルゴリズム実装
【B-3】ソート完成

【html】完成

バブルソートの計算時間 O(n2)
マージソートの計算時間 2(N log N) => O(n log n))
クイックソートの計算時間 O(n log n)

マージソートとクイックソートの時間差はどうやって求めるのか。

単純多角形面積最小問題
ピックの定理、
Simple polygon area dot、
三角形分割→単純多角形アルゴリズムの
Delaunay ドロネー三角形分割
最適三角形分割

全パターンの三角形は 100(C)3 = 161700
約16万通り
最小面積をソートする。

【結論】
三角形分割は必須。
三角形分割のフリップも含め全て列挙。
最小三角形の一辺に列挙した三角形を追加 = 四角形 以後ループ。（凹の場合2辺につくと4->3になる場合があるので一辺のチェックは必須。）

## 2018.08.12
【B-2】座標途中

## 2018.08.13
【B-2】座標完成

## 2018.08.14
全体見直し

## 2018.08.15

getMinimumPairs(4)

searchMinimumAdjacent(4, $min_triangle_keys);

getMinimumPairs(3)

終了。

## 2018.08.19

## 2018.08.20

`import * as d3 from 'd3';`がVueコンポーネント内でしか適用されてない。

```
<template id='zoom'>
  <g>
    <rect ref='zoom' style='fill: whitesmoke;' :width='dimensions.width' :height='dimensions.height'></rect>
  </g>
</template>
```
だけが反映されているので、同じVueファイルにtemplateは1つのみ？

## 2018.08.21

d3.jsのniceが便利
```
var x = d3.scale.linear()
 .domain([53.34, 4234.6])
 .nice() // .domain() → [0, 5000]
```

```
data = [
    {name: 'a', age: 10},
    {name: 'b', age: 2},
    {name: 'c', age: 9},
    {name: 'd', age: 1},
    {name: 'e', age: 5}
];
console.log(d3.extent(data,function(e){
    return e.age;
}));
// => [1, 10]
```

Zoomは今機能していない。
Axisが座標の縮小を担当している。

$vuetifyのbreakpoint.nameでメモリのサイズを変更している
```
tick() {
  switch (this.$vuetify.breakpoint.name) {
     case 'xs': return 5;
     case 'sm': return 10;
     case 'md': return 15;
     case 'lg': return 20;
     case 'xl': return 25;
   };
},
```

Vueのwatchにのdeepがある。
```
  watch: {
    data: {
      deep: true,
```

yの値がrandam関数を参照していたらから。

欲しいjsonデータ
四半期ごとのROE、PER、時価総額のデータ。
（ROE、PERは分解して取得しやすいデータから算出する）
そのまま取れるならよし。
```
stock {
	number: 3798,
	name: 'ULSグループ',
	date: {
		1990/03: {
			roe: 15,
			per: 15,
			value: 100,
		},
		1990/06: {
			roe: 15,
			per: 15,
			value: 100,
		},
		1990/09: {
			roe: 15,
			per: 15,
			value: 100,
		},
		1990/12: {
			roe: 15,
			per: 15,
			value: 100,
		},
	}
}
```


## 2018.08.25


```
INSERT INTO `stocks` (`code`, `name`, `color`, `url`, `market`, `category`, `listing_date`, `delisting_date`) VALUES ('1301', '極洋', 'F90000', 'https://www.kyokuyo.co.jp/', '1', '1', NULL, NULL);
```

[5分で絶対に分かるAPI設計の考え方とポイント \(5/6\) \- ＠IT](http://www.atmarkit.co.jp/ait/articles/1511/19/news022_5.html)
> ただ、PATCHに関しては対応していないフレームワークもあり得るので、採用は慎重になった方がいいかもしれません。

HTTP/1.1の標準メソッドは8つあり、その中でもよく使われるのは以下の4つ。
GET,POST,PUT,DELETE

## 2018.08.28

performances/{stock-code}

{}かっこの記述方法はオプション？


1773	ＹＴＬ	東証外国
csvに四季報に乗っていない銘柄あり。

## 2018.08.30
東証外国の3銘柄jsonから削除

さくらサーバーで実行するクローン
以下を火曜〜土曜の毎日2時に実行する。
`cd /home/metaru/www/xjpx/scraping-stock ; /usr/local/bin/php crawling.php`

3711でタイムオーバー。
Fatal error: Maximum execution time of 30 seconds exceeded in /Users/ryosuke/works/scraping-stock/crawler/Crawler.php on line 102

毎回
$ch = curl_init($url);
init 処理しているのが重いのでは？

## 2018.08.31

さくらサーバーにアップロード、

CURLOPT_TIMEOUTの設定

## 2018.09.01

Laravel インスコ

[Laravel5\.4でAdminLTEを使う \- tohokuaikiのチラシの裏](https://tohokuaiki.hateblo.jp/entry/2017/07/07/Laravel5.4%E3%81%A7AdminLTE%E3%82%92%E4%BD%BF%E3%81%86)

マイグレーション作成
php artisan make:migration create_users_table

Adminlteのインストール
composer require "acacha/adminlte-laravel-installer"
vendor/acacha/adminlte-laravel-installer/adminlte-laravel install

## 2018.09.02

php artisan adminlte:admin

(admin@example.com) with password 123456

Admin laravelに変更
[z\-song/laravel\-admin: Build a full\-featured administrative interface in ten minutes](https://github.com/z-song/laravel-admin)

理由：Adminlteの後から作られてスターも多い、更新も最近。

admin/admin
meta/admin
のログイン情報はデータベースのどこ？

CSVインポートもありそうな記述。
[laravel\-admin\.org/excel\.php at master · z\-song/laravel\-admin\.org](https://github.com/z-song/laravel-admin.org/blob/master/config/excel.php)

## 2018.09.03

/app/Admin/Extensions/Tools/ImportButton.php
を作成

アップロードするボタンの作成

アップロード処理の作成

アップロードのAPI URLを確認。

https://readouble.com/laravel/5.3/ja/filesystem.html

## 2018.09.09

テーブルの中身を削除して、インクリメントをリセット
TRUNCATE TABLE `stocks`