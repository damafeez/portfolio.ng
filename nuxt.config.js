import fs from 'fs'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  styleResources: {
    scss: [
      '@/assets/css/abstracts/_functions.scss',
      '@/assets/css/abstracts/_mixins.scss',
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/globals'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/base', '~/plugins/globals', '~/plugins/polyfills'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa', '@nuxtjs/device'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  generate: {
    routes() {
      const schemaDirectory = './schema'
      return fs
        .readdirSync(schemaDirectory)
        .filter(name => name.endsWith('.json') && name !== 'index.json')
        .map(name => {
          try {
            return {
              route: `/templates/${name.split('.json')[0]}`,
              payload: {
                schema: JSON.parse(
                  fs.readFileSync(`${schemaDirectory}/${name}`, {
                    encoding: 'utf-8',
                  }),
                ),
              },
            }
          } catch (error) {
            console.error(`unable to parse schema: ${name}`, error)
          }
        })
        .filter(Boolean)
    },
  },
}
