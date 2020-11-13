/* eslint-disable @typescript-eslint/no-var-requires */
const proxy = require("./proxy.ts");
// https://cli.vuejs.org/zh/config/
module.exports = {
  pages: {
    app: {
      // page 的入口
      entry: "src/main.ts",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "全面预算系统",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "app"],
    },
    /**
     * 当使用只有入口的字符串格式时，
     * 模板会被推导为 `public/subpage.html`
     * 并且如果找不到的话，就回退到 `public/index.html`。
     * 输出文件名会被推导为 `subpage.html`。
     */
    // subpage: 'src/subpage/main.js'
  },
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
    },
    proxy: proxy[process.env.VUE_APP_ENV || "dev"]
  }
}
