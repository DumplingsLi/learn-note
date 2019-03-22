// lesson1 hello world

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('你好，世界')
})
.listen(3000, () => {
  console.log('app is listening at port 3000')
})
