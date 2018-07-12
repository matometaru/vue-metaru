module.exports = {
	title: 'Vue Metaru',
	description: '分かりにくい情報、お得な情報を分かりやすくまとめたる。',
	ga: 'TEST_ID_20180514',
	serviceWorker: true,
	head: [
		['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
		['link', { rel: 'manifest', href: '/manifest.json' }],
		// ['link', { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'}],
	],
	locales: {
		'/': {
			lang: 'ja'
		}
	},
	sidebar: 'auto',
	themeConfig: {
		sidebar: 'auto',
		nav: [
			{ text: 'Home', link: '/' },
			{
				text: 'Category',
				items: [
					{ text: 'VuePress', link: '/category/vuepress' },
					{ text: 'Google', link: '/category/google' },
					{ text: 'JavaScript', link: '/category/javascript' }
				]
			 },
			{ text: 'Twitter', link: 'https://twitter.com/matometaru1' },
		],
		footer: 'Copyright © 2018-present @matometaru',
	}
}