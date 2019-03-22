// lesson3 使用superagent和cheerio完成简单的爬虫

const express = require('express')
// 一个http库
const superagent = require('superagent')
// node版的jquery库
const cheerio = require('cheerio')
const app = express()

app.get('/', (req, res) => {
  superagent.get('https://cnodejs.org/')
    .end((err, sres) => {
      if(err) {
        return next(err)
      }

      // sres.text 里面存储着网页的 html 内容
      const $ = cheerio.load(sres.text)
      let items = []
      $('#topic_list .cell').each((idx, element) => {
        const $element = $(element)
        items.push({
          title: $element.find('.topic_title').attr('title'),
          href: $element.find('.topic_title').attr('href'),
          author: $element.find('.user_avatar img').attr('title')
        })
      })

      res.send(items)
    })
})

app.listen(3000, () => {
  console.log('app is running at 3000')
})
