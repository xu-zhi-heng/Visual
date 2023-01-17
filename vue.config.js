// module.exports = {
//     devServer: {
//         proxy: {
//             // detail: https://cli.vuejs.org/config/#devserver-proxy
//             "^/api": {
//                 target: 'http://192.168.254.16:8000/',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     ['^' + "/api"]: ''
//                 },
//                 timeout:3000000  //设置超时时间
//             },
//         },
//         disableHostCheck: true
//     },
// }

module.exports = {
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
            config.mode = 'production';
            config["performance"] = {//打包文件大小配置
                "maxEntrypointSize": 10000000,
                "maxAssetSize": 30000000
            }
        }
    }
}
