module.exports = {
	title: 'Vue Metaru',
	description: '分かりにくい情報、お得な情報を分かりやすくまとめたる。',
	ga: 'TEST_ID_20180514',
	transition: 'page',
	transition: {
		name: 'page',
		mode: 'out-in',
		beforeEnter (el) {
			console.log('Before enter...');
		}
	},
	head: [
		['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
		// ['link', { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'}],
	],
	locales: {
		'/': {
			lang: 'ja'
		}
	},
	themeConfig: {
		sidebar: 'auto',
		nav: [
			{ text: 'Home', link: '/' },
			{
				text: 'Category',
				items: [
					{ text: 'VuePress', link: '/category/vuepress' },
					{ text: 'Google', link: '/category/google' }
				]
			 },
			{ text: 'Twitter', link: 'https://twitter.com/matometaru1' },
		],
	}
}