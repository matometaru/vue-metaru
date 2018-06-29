---
title: VuePressの画面遷移時にアニメーションを適用する方法
description: VuePressの画面遷移時にアニメーションを適用する方法を解説します。
eyecatch: /img/blog/03.jpg
category: [VuePress]
---

## transitionが上手くいかない理由

VuePressのコンテンツを構成しているテンプレートはPage.vueとHome.vueになります。
Layout.vueの以下の箇所に`<transition>`を追加してもPage.vue <-> Home.vue間では有効ですが、Page.vue<->Page.vueでは効きません。 

## 遷移前と遷移後に実行する

VuePressもVueRouterを使用しています。
VueRouterであれば、遷移前に`beforeResolve`、遷移後に`afterEach`を`を使用します。

```js:Layout.vue
mounted () {
    this.$router.beforeResolve((to, from, next) => {
		this.entered = true
		next()
    })
    this.$router.afterEach((to, from, next) => {
		setTimeout( () => {
			this.entered = false
		}, 1500);
    })
}
```

dataにentered、watchで変化をチェックし、enter(),leave()を実行してます。
必要コードのみ抽出したものが以下のコードになります。

```js:Layout.vue
data () {
	return {
		entered: false,
	}
},	
watch: {
	entered: function () {
		this.entered ? this.enter() : this.leave()
	}
},
mounted () {
    this.$router.beforeResolve((to, from, next) => {
		this.entered = true
		next()
    })
    this.$router.afterEach((to, from, next) => {
		setTimeout( () => {
			this.entered = false
		}, 1500);
    })
},
methods: {
	enter () {
		// window.alert("遷移前のアニメーション");
	},
	leave () {
		// window.alert("遷移後のアニメーション");
	}
}
```

## あとはお好きなアニメーションを

Canvasを使うもよし、css animationだけで頑張るもよし、TweenMaxで派手にするのもよし。
SPAなのでページ遷移を高速で行ってもアニメーションが連続してるのがいいですね〜。
