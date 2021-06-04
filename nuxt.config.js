export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Memory Motel',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vue-wysiwyg/dist/vueWysiwyg.css', '@/assets/styles/style.scss'],

  styleResources: {
    scss: [
      '@/assets/styles/0-settings/_settings-mixins.scss',
      '@/assets/styles/0-settings/_settings-fonts.scss',
      '@/assets/styles/0-settings/_settings-variable.scss',
      '@/assets/styles/0-settings/_settings-typography.scss',
      '@/assets/styles/0-settings/_settings-media.scss',
      '@/assets/styles/0-settings/_settings-index.scss',
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ApiService.js' },
    { src: '~/plugins/vue-scroll.js' },
    { src: '~/plugins/carousel.js' /* mode: 'client' */ },
    { src: '~/plugins/vue-lazyload.js', mode: 'client' },
    { src: '~/plugins/colors.js', mode: 'client' },
    { src: '~/plugins/hammer.js', mode: 'client' },
    { src: '~/plugins/audio-recorder.js', mode: 'client' },
    { src: '~/plugins/wysiwyg.js', mode: 'client' },
    { src: '~/plugins/nuxt-client-init.js', mode: 'client' },
    { src: '~/plugins/vue-select.js' },
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

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      });
    },
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
    icon: {
      fileName: 'favicon.png',
    },
    manifest: {
      lang: 'fr',
    },
    meta: {
      name: 'Memory Motel',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
      mobileAppIOS: 'dark-content',
      appleStatusBarStyle: 'black-translucent',
    },
    themeColor: '#FFF9E2',
    msTileColor: '#373737',
    appleMobileWebAppStatusBarStyle: 'default',
    /* workboxOptions: {
      exclude: ['.htaccess'],
      importScripts: ['/serviceWorkerSkipWaiting.js'],
      skipWaiting: false,
      navigateFallback: 'index.html',
      runtimeCaching: [
        // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },

        // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 31536000, // 1 year
            },
          },
        },

        // Cache the Carto CDN map tiles
        {
          urlPattern: /^https:\/\/.+\.basemaps\.cartocdn\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'cartocdn-basemaps',
            cacheableResponse: {
              statuses: [0, 200],
            },
            expiration: {
              maxAgeSeconds: 5184000, // 60 days
              maxEntries: 100, // Max 100 request (prevent taking to much space)
            },
          },
        },
      ],
    }, */
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
