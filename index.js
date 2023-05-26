const Koa = require('koa');
// 解析request的body,把解析后的参数，绑定到ctx.request.body中
const bodyParser = require('koa-bodyparser');
const proxy = require("koa-proxies");
const routing = require('./routes')
// 静态资源中间件
const koaStatic = require('koa-static')
// 跨域
const cors = require('@koa/cors')
// 处理错误
const error = require('koa-json-error')
// 校验 body(请求体)中的数据
const parameter = require('koa-parameter')

const app = new Koa();

// 错误处理
app.use(error({
  format: err => {
    return { code: err.status, message: err.message, result: err.stack }
  },
  postFormat: (err, { result, ...rest }) => {
    return process.env.NODE_ENV === 'production' ? rest : { result, ...rest }
  }
}))
// 使用 ctx.throw(404,'错误')
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.throw(error) //此方式可输出状态码。传入error可使错误信息更详细
  }
})

// 配置代理
app.use(
  proxy("/api/baidu", {
    target: "https://www.baidu.com",
    changeOrigin: true,
  })
);

// 访问静态资源 http://localhost:3000/a.png
app.use(koaStatic(__dirname + '/public')) 

app.use(cors())
app.use(bodyParser());
// 最好是放在 bodyparser 之后，因为只有解析完请求体，parameter 才好进行校验
// ctx.verifyParams({
//   name: {type: 'string', require: true},
// });
app.use(parameter(app))
routing(app)
app.listen(3000, () => {
  console.log('3000端口已启动');
});