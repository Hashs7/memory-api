export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Memory Motel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
	  'vue-wysiwyg/dist/vueWysiwyg.css',
	  '@/assets/styles/style.scss',
  ],

	styleResources: {
		scss: [
      '@/assets/styles/0-settings/_settings-mixins.scss',
      '@/assets/styles/0-settings/_settings-variable.scss',
      '@/assets/styles/0-settings/_settings-typography.scss',
      '@/assets/styles/0-settings/_settings-media.scss',
      '@/assets/styles/0-settings/_settings-index.scss',
    ]
	},

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
	  { src: '~/plugins/ApiService.js' },
	  { src: '~/plugins/AuthService.js', mode: 'client' },
	  { src: '~/plugins/audio-recorder.js', mode: 'client' },
	  { src: '~/plugins/wysiwyg.js', mode: 'client' },
	  { src: '~/plugins/nuxt-client-init.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/router-extras',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
	  baseURL: process.env.VUE_APP_API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fr',
    },
  },

	server: {
		port: 8080 // default: 3000
	},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

	generate: {
		exclude: [
			/^\/admin/ // path starts with /admin
		],
		fallback: true,
	}
}
