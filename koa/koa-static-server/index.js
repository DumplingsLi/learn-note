// @todo
// 每个模块都要重新引入模块的做法不好

const Koa = require('koa')
const path = require('path')
const content = require('./util/content')
const mimes = require('./util/mimes')

const app = new Koa()

const fullStaticPath = path.join(__dirname, './static')

// 解析资源类型
function parseMime(url) {
  let extName = path.extname(url) // 返回文件后缀名
  extName = extName? extName.slice(1): 'unknown' // ？？？
  return mimes[extName]
}

app.use(async (ctx) => {
  // 获取资源内容， 文件内容/目录/404
  let _content = await content(ctx, fullStaticPath)

  // 解析请求内容的类型
  let _mime = parseMime(ctx.url)

  if(_mime) {
    ctx.type = _mime
  }

  // 输出资源内容
  if(_mime && _mime.indexOf('image') >= 0) {
    ctx.res.writeHead(200) // 服务端回应状态码
    ctx.res.write(_content, 'binary') // 二进制编码
    ctx.res.end()
  }else {
    ctx.body = _content
  }
})

app.listen(3000)

console.log('app is listening at port 3000')
