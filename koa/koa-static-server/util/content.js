const path = require('path')
const fs = require('fs')

// 读取目录和内容的方法
const dir = require('./dir')
const file = require('./file')

/**
* 获取静态资源内容
* @param  {object} ctx koa上下文
* @param  {string} 静态资源目录在本地的绝对路径
* @return  {string} 请求获取到的本地内容
*/
async function content(ctx, fullStaticPath) {
  let reqPath = path.join(fullStaticPath, ctx.url)

  // 判断路径是否存在目录或文件
  let exist = fs.existsSync(reqPath)

  let content = ''

  if(!exist) {
    content = '404 NOT Found'
  }else {
    // 判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath)

    if(stat.isDirectory()) {
      content = dir(ctx.url, reqPath)
    }else {
      content = await file(reqPath) // 只有file使用了await？？？
    }
  }

  return content
}

module.exports = content
