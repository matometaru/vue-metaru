---
title: 【個人用】スタイルガイドと開発のルール
description: プロラムの際のルールをメモ
eyecatch: /img/blog/14.jpg
category: [Vue.js]
---

## 開発ルール

### watchを使用しない

watchは便利だが、しょうもないミスまでコンパイラに頼ってしまうのは効率よくないので、ある程度のブロックで
distに出力する形で開発を行う。

## jsスタイルガイド

### ベース

以下をESLint、Airbnbのガイドラインをベースに上書いていきます。  
[eslint\-config\-airbnb \- npm](https://www.npmjs.com/package/eslint-config-airbnb)

### 

余白とか統一
esLintとかがやってくれる？

エラー内容  
`A space is required after ',' `

```
// bad
setStyles(el,styles) {
// good
setStyles(el, styles) {
```

エラー内容
`Expected space(s) after "for"`  

```
// bad
for(let key in styles) {
// good
for (let key in styles) {
```

`Block must not be padded by blank lines `

```
// bad
  render (h) {
    
    const {
// good
  render (h) {
  	const
```

`Do not access Object.prototype method 'hasOwnProperty' from target object(no-prototype-builtins)`

```
// bad
if (item.key && this.items.hasOwnProperty(item.key)) {
// good
if (Object.hasOwnProperty.call(this.items, item.key)) {
```

`shorthand`  
`A space is required before '}'`
```
// bad
default: function () { return { length: 'px', angle: 'deg'}; },
// good
default() { return { length: 'px', angle: 'deg' }; },
```

`'vue' should be listed in the project's dependencies, not devDependencies(import/no-extraneous-dependencies)`

package.jsonを変更
```
  "peerDependencies": {
    "vue": "^2.2.6"
  },
```

```
// bad
this.items.length+1
// good
this.items.length + 1
```

[peerDependencies](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md)

[ちゃんと使い分けてる? dependenciesいろいろ。 \- Qiita](https://qiita.com/cognitom/items/acc3ffcbca4c56cf2b95)


```
if(true) {

}
```

```
(prop) => {

}
```