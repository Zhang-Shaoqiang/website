// https://cli.vuejs.org/zh/config/
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/variables.scss";'
      }
    }
  },
  // devServer: https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  }
}
