module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        content: 'components/content',
        common: 'components/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views',
      },
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            overrideBrowserslist: ["last 15 versions"] 
          }),
          require("postcss-pxtorem")({
            rootValue: 37.5,
            propList: ["*"],
            minPixelValue: 5,
            exclude: /node_modules/i
          })
        ]
      }
    }
  }
}
