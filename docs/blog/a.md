---
title: Vueコンポーネント作成からnpmに登録するまで
description: Vueの環境作成から、登録までの流れを解説
eyecatch: /img/blog/13.jpg
category: [Vue.js]
---

## みんなどうやってんの

できるだけシンプルにしたい

フォルダは以下だけ
* src    # コンパイル前のソースコード
* dist   # コンパイル後のソースコード
* public # Github Pagesで公開用

必要機能は
* hot reload
* ブラウザシンク
* vueのコンパイルだけ


## vue-cliで環境作成

[vue\-cliでwebアプリケーションを作って、GitHubPagesで無料で爆速でリリースした話 \- Qiita](https://qiita.com/tiwu_official/items/43dc554ec43dd951812a)

version3以上のほうが便利
[Vue CLI UIが想像以上に便利だった話 \- Qiita](https://qiita.com/isihigameKoudai/items/eee3eb6a435675fdfd73)

```
$ vue init webpack vue-test-project
```

```
$ cd my-project
$ npm install
$ npm run dev
```

### ファイル構成の変更

インストール時のフォルダ構成は以下の通り。

vue-ts-project                     # 
├─ build                           # 
│   ├─ build.js                    # 
│   ├─ check-versions.js           # 
│   ├─ logo.png                    # 
│   ├─ utils.js                    # 
│   ├─ vue-loader.conf.js          # 
│   ├─ webpack.base.conf.js        # 
│   ├─ webpack.dev.conf.js         # 
│   └─ webpack.prod.conf.js        # 
│   
├─ config                          # 
│   ├─ dev.env.js                  # 
│   ├─ index.js                    # 
│   ├─ prod.env.js                 # 
│   └─ test.env.js                 # 
│   
├─ src                             # 
│   ├─ assets                      # 
│   │   └─ logo.png                # 
│   │   
│   ├─ components                  # 
│   │   └─ HelloWorld.vue          # 
│   │   
│   ├─ router                      # 
│   │   └─ index.js                # 
│   │   
│   ├─ App.vue                     # 
│   └─ main.js                     # 
│   
├─ static                          # 
│   └─ .gitkeep                    # 
│   
├─ test                            # 
│   ├─ e2e                         # 
│   │   ├─ custom-assertions       # 
│   │   │   └─ elementCount.js     # 
│   │   │   
│   │   ├─ specs                   # 
│   │   │   └─ test.js             # 
│   │   │   
│   │   ├─ nightwatch.conf.js      # 
│   │   └─ runner.js               # 
│   │   
│   └─ unit                        # 
│       ├─ specs                   # 
│       │   └─ HelloWorld.spec.js  # 
│       │   
│       ├─ .eslintrc               # 
│       ├─ jest.conf.js            # 
│       └─ setup.js                # 
│       
├─ .babelrc                        # 
├─ .editorconfig                   # 
├─ .eslintignore                   # 
├─ .eslintrc.js                    # 
├─ .gitignore                      # 
├─ .postcssrc.js                   # 
├─ README.md                       # 
├─ index.html                      # 
├─ package-lock.json               # 
└─ package.json                    # 


npmに登録するのでデモページを`dist/`以下に表示する。

