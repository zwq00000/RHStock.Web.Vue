const pkg = require('./package')

module.exports = {
	mode: 'spa',

	env: {
		baseUrl: process.env.NODE_ENV === 'production'? process.env.BASE_URL: 'http://localhost:51185'
	  },

	router: {
		middleware: 'authenticated'
	},
	generate: {
		fallback: true
	},
	/*
    ** Headers of the page
    */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'description',
				name: 'description',
				content: pkg.description
			}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
			}
		]
	},

	/*
    ** Customize the progress-bar color
    */
	loading: { color: '#fff' },

	/*
    ** Global CSS
    */
	css: ['~/assets/style/app.styl'],

	/*
    ** Plugins to load before mounting the App
    */
	plugins: [
		'@/plugins/vuetify',
		'@/plugins/axios',
		'@plugins/filters',
		{
			src: '@/plugins/notifications',
			ssr: false
		}
	],

	/*
    ** Nuxt.js modules
    */
	modules: [
		// Doc: https://github.com/nuxt-community/axios-module#usage
		'@nuxtjs/axios'
	],
	/*
    ** Axios module configuration
    */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
		baseURL: process.env.baseUrl,
		credentials: false
	},

	/*
    ** Build configuration
    */
	build: {
		/*
        ** You can extend webpack config here
        */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		},
		//- 这里可以自定义打包后的文件名
		//- `hash` 项目中任何一个文件改动后就会被重新创建
		//- `chunkhash` 是根据模块内容计算出的hash值，对应的文件发生内容变动就会重新计算
		//- 'chunkhash'
		// manifest: 'js/manifest.js?v=[hash:7]',
      	//vendor: 'js/vendor.js?v=[hash:7]',
      	//app: 'js/app.js?v=[chunkhash:7]',
      	//- `chunk` 这里这样使用编译会报错，最后面会讲解相关解决方案
      	// chunk: 'js/[name].js?v=[chunkhash:7]'
		//- 生成如下：
		//- <head>
		//-   ...
		//-   <link href="//cdn.xxx.com/manifest.js?v=8d09730" rel="preload" as="script">
		//-   <link href="//cdn.xxx.com/vendor.js?v=8d09730" rel="preload" as="script">
		//-   <link href="//cdn.xxx.com/app.js?v=fea3ec0" rel="preload" as="script">
		//-   <link href="//cdn.xxx.com/pages_index.js?v=6f7b904" rel="preload" as="script">
		//-   ...
		//- </head>
		filenames: {
			app: '[name].js?v=[hash:7]',
			chunk: '[name].js?v=[hash:7]',
			css: '[name].css?v=[hash:7]',
			img: '[path][name].[ext]?v=[hash:7]',
			font: '[path][name].[ext]?v=[hash:7]',
			video: '[path][name].[ext]?v=[hash:7]'
		}
	}
}
