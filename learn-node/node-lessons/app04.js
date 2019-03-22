// lesson4 使用 eventproxy 控制并发

const eventproxy = require('eventproxy')
const superagent = require('superagent')
const cheerio = require('cheerio')
const url = require('url')

const cnodeUrl = 'https://cnodejs.org/'

/* 注意，cnodejs.org 网站有并发连接数的限制，
所以当请求发送太快的时候会导致返回值为空或报错。
建议一次抓取3个主题即可。 */

superagent.get(cnodeUrl)
  .end((err, res) => {
    if(err) {
      return console.error(err)
    }
    let topicUrls = [] //cnode首页所有的帖子href
    const $ = cheerio.load(res.text)

    $('#topic_list .topic_title').each((idx, element) => {
      const $element = $(element)
      // url是node的标准库，这里像浏览器一样解析href为完整地址
      const href = url.resolve(cnodeUrl, $element.attr('href'))
      topicUrls.push(href)
    })
    // eventproxy类似计数器的功能来判断所有的异步操作都完成了
    const ep = new eventproxy()
    ep.after('topic_html', topicUrls.length, (topics) => {
      topics = topics.map((topicPair) => {
        let topicUrl = topicPair[0]
        let topicHtml = topicPair[1]
        const $ = cheerio.load(topicHtml)

        const title = $('.topic_full_title').text().trim()
        const href = topicUrl
        const comment1 = $('.reply_content').eq(0).text().trim()
        const author1 = $('.reply_author').eq(0).text().trim()
        // const userHref = url.resolve(cnodeUrl, $('.reply_author').eq(0).attr('href'))
        const userHref = $('.reply_author').eq(0).attr('href')
        let score1 = ''
        if(userHref) {
          const userUrl = url.resolve(cnodeUrl, userHref)

          superagent.get(userUrl)
            .end((err, res) => {
              const $ = cheerio.load(res.text)
              score1 = $('.user_profile .big').text().trim()
              console.log(score1)
            })
        }

        return ({
          title,
          href,
          author1,
          comment1,
          score1
        })
      })

      console.log('final:')
      console.log(topics)
    })

    topicUrls.forEach((topicUrl) => {
      superagent.get(topicUrl)
        .end((err, res) => {
          // console.log('fetch ' + topicUrl + ' successful')
          ep.emit('topic_html', [topicUrl, res.text])
        })
    })
})
