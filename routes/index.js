const fs = require('fs')
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') {
      return
    }
    const route = require(`./${file}`)
    /**
     * 注：allowedMethods 的作用
        响应 option 方法，告诉它所支持的请求方法
        相应地返回 405 （不允许）和 501 （没实现）
     */
    app.use(route.routes()).use(route.allowedMethods())
  })
}