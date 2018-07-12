---
title: ディープコピーとシャローコピーについて
description: JavaScriptでオブジェクトや配列をコピーするには代入だけではできません。それに対応する方法がいろいろあるので簡単にまとめます。
eyecatch: /img/blog/08.png
category: [JavaScript]
---

# ディープコピー、シャローコピーとは

## 様々なディープコピー

[\[JavaScript\]色々なディープコピー \- Qiita](https://qiita.com/knhr__/items/d7de463bf9013d5d3dc0)

### 標準関数

```
JSON.parse(JSON.stringify(obj))
```

```
assign()
```

### jQueryを利用

```
options = $.extend(true, { op: 0 }, custom);
```

### lodashを利用

## 今後使っていきたいマージとディープコピーの方法

jQueryは下げトレンドなので、$.extendの見る機会は減っていくと思います。

非破壊のマージ
```
this.options = _.merge({}, Monster.defaults, options);
```