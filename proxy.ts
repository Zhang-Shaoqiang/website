/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production
 * For details, please see
 * proxy: https://webpack.docschina.org/configuration/dev-server/#devserverproxy
 */
module.exports = {
    dev: {
        "/api/": {
            target: "http://localhost:8080",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        },
    },
    test: {
        "/api/": {
            target: "you url",
            changeOrigin: true,
            pathRewrite: { "^/api": "" },
        },
    },
    pre: {
        "/api/": {
            target: "you url",
            changeOrigin: true,
            athRewrite: { "^/api": "" },
        },
    },
};
