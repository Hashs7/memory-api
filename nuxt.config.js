export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Jamies',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vue-wysiwyg/dist/vueWysiwyg.css', '@/assets/styles/style.scss'],

  styleResources: {
    scss: [
      '@/assets/styles/0-settings/_settings-mixins.scss',
      '@/assets/styles/0-settings/_settings-variable.scss',
      '@/assets/styles/0-settings/_settings-typography.scss',
      '@/assets/styles/0-settings/_settings-media.scss',
      '@/assets/styles/0-settings/_settings-index.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ApiService.js' },
    { src: '~/plugins/hammer.js', mode: 'client' },
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
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-buefy', '@nuxtjs/axios', '@nuxtjs/pwa', '@nuxtjs/auth-next'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.VUE_APP_API_URL,
  },

  env: {
    apiUrl: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  },

  auth: {
    redirect: {
      login: '/connexion',
      logout: '/',
      callback: false,
      home: false,
    },
    strategies: {
      local: {
        token: {
          property: 'accessToken',
        },
        user: {
          property: 'user',
          autoFetch: false,
        },
        endpoints: {
          login: { url: '/auth/signin', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          refresh: { url: '/auth/refresh', method: 'post' },
          user: { url: '/user/me', method: 'get' },
        },
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fr',
    },
    meta: {
      mobileAppIOS: 'dark-content',
    },
  },

  server: {
    host: '0.0.0.0',
    port: 8080,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    exclude: [
      /^\/admin/, // path starts with /admin
    ],
    fallback: true,
  },
};
