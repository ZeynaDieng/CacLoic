export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "CAC | Vente d'appareils électroniques et électroménagers ",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "12utDqNxPQQxx2NyZgMz37btRqiUF8SEEaiPtIdFFc",
      },
      {
        hid: "description",
        name: "description",
        content: "Vente d'appareils électroniques et électroménagers",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;600;800;900&display=swap",
      },
    ],
    script: [
      {
        hid: "jquery",
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        type: "text/javascript",
        defer: true,
      },
    {
        hid: "tawk.to",
        src: "https://embed.tawk.to/645e6f7474285f0ec46b22ff/1h08e6oc5",
        defer: true,
      }, 
    ],
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
    BROWSER_BASE_URL: process.env.BROWSER_BASE_URL,
    API_SEARCH_URL: process.env.API_SEARCH_URL,
    API_URL: process.env.API_URL,
    APP_ENV: process.env.APP_ENV,
    MEILISEARCH_API: process.env.MEILISEARCH_API
  },
  server: {
        port: process.env.APP_ENV == 'DEV' ? 3004 : 3004 // default: 3000
      }, 
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/sass/app.scss",
    "node_modules/foundation-sites/scss/foundation",
     "~/assets/sass/bulma.scss",
  ],
  vendor: ["jquery"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
   {
      src: "~/plugins/jquery.min.js",
      mode: "client",
    },
           
    "~/plugins/repositories.js",
    "~/plugins/searchengine.js",
        "~plugins/vue-js-modal.js",
        "~/plugins/url-formatter.js",
        
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
    router: {
        // linkActiveClass: 'activeLink',
      //  linkExactActiveClass: 'activeLink'
    },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ["nuxt-buefy", {css:false}],
    "@nuxtjs/auth-next",
    "@nuxtjs/axios",
    "@forked-prs/nuxt-infinite-scroll-module",
    "vue-social-sharing/nuxt",
      [
      "vue-currency-filter/nuxt",
      {
        symbol: "FCFA",
        thousandsSeparator: ".",
        fractionCount: 0,
        fractionSeparator: ",",
        symbolPosition: "back",
        symbolSpacing: true,
        avoidEmptyDecimals: undefined,
      },
    ],
     [
      "nuxt-lazy-load",
      {
        // These are the default values
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        native: false,
        polyfill: true,
        directiveOnly: true,

        // Default image must be in the static folder
        // defaultImage: "/loader.gif",

        // To remove class set value to false
        loadingClass: "isLoading",
        loadedClass: "isLoaded",
        appendClass: "lazyLoad",

        observerConfig: {
          // See IntersectionObserver documentation
        },
      },
    ],
        "@nuxtjs/sitemap",
  ],
 sitemap: {
    hostname: "https://cacsenegal.com",
    sitemaps: [
      {
        path: "/sitemap.xml",
        gzip: true,
        exclude: ["/compte/**", "/password", "/inscription", "/login", "/panier", "/register/success"],
      },
      {
        path: "/sitemap-products.xml",
        routes: async () => {
          const { data } = await axios.get(
            process.env.BASE_URL + "/product/for_sitemap"
          );

          return data.map((product) => `/produits/${product.slug}`);
        },
        exclude: ["/**"],
      },
      {
        path: "/sitemap-categories.xml",
        routes: async () => {
          const { data } = await axios.get(
            process.env.BASE_URL + "/product_category/for_sitemap"
          );

          return data.map((product) => `/produits/categorie/${product.slug}`);
        },
        exclude: ["/**"],
      },
      {
        path: "/sitemap-brands.xml",
        routes: async () => {
          const { data } = await axios.get(
            process.env.BASE_URL + "/product_brand/"
          );

          return data.map((product) => `/produits/marques/${product.slug}`);
        },
        exclude: ["/**"],
      },
    ],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
    axios: {
    baseURL: process.env.APP_ENV == 'DEV'? process.env.DEV_API_BASE_URL : process.env.API_BASE_URL,
    browserBaseURL: process.env.APP_ENV == 'DEV'? process.env.DEV_API_BASE_URL : process.env.BROWSER_BASE_URL,
    // browserBaseURL: "https://api.cacsenegal.com/api/v1",
    // baseURL: "https://api.cacsenegal.com/api/v1",
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.APP_ENV == 'DEV'? process.env.DEV_BROWSER_BASE_URL : process.env.API_BASE_URL,
      baseURL: process.env.APP_ENV == 'DEV'? process.env.DEV_API_BASE_URL : process.env.BROWSER_BASE_URL,
    },
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.APP_ENV == 'DEV'?  process.env.DEV_API_BASE_URL : process.env.API_BASE_URL,
      browserBaseURL: process.env.APP_ENV  == 'DEV'? process.env.DEV_BROWSER_BASE_URL : process.env.API_BASE_URL
    },
  },
  auth: {
    // plugins: [ { src: '~/plugins/axios', ssr: true }, '~/plugins/auth.js' ],
    strategies: {
   
      local: {
        token: {
          property: "data.access_token",
          global: true,
          required: true,
          type: "Bearer",
        },
        user: {
          property: "data.user",
          // autoFetch: true,
        },
        endpoints: {
          login: { url: "/auth", method: "post", propertyName: "data.access_token" },
          logout: false,
          user: { url: "/auth", method: "get", propertyName: "data.user" },
        },
      },
      // localRefresh: {
      //   scheme: "refresh",
      //   localStorage: {
      //     prefix: "auth",
      //   },
      //   token: {
      //     prefix: "accessToken",
      //     property: "accessToken",
      //     type: "Bearer",
      //     maxAge: 1800,
      //   },
      //   refreshToken: {
      //     prefix: "refreshToken",
      //     property: "refreshToken",
      //     data: "refreshToken",
      //     maxAge: 60 * 60 * 24 * 30,
      //   },
      //   user: {
      //     property: "user",
      //     autoFetch: true,
      //   },
      //   endpoints: {
      //     login: { url: "/auth", method: "post" },
      //     refresh: { url: "/auth/refresh_token", method: "post" },
      //     logout: false,
      //     user: {
      //       url: "/auth",
      //       method: "get",
      //       propertyName: "user",
      //     },
      //   },
      // },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      callback: "/login",
      home: "/",
    },
  },
}
