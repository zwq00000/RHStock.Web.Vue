const pkg = require('./package')

module.exports = {
	mode: 'spa',

	dev: process.env.NODE_ENV !== 'production',

	/*env: {
		BASE_URL: dev? '':process.env.BASE_URL || 'http://localhost:51185'
	},*/

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
	plugins: ['@/plugins/vuetify', '@/plugins/axios','@plugins/filters',{
		src:'@/plugins/notifications',ssr:false}],

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
		baseURL: this.dev? '':process.env.BASE_URL || 'http://localhost:51185',
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
		}
	}
}
