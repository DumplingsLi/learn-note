//lesson2 req.query

const express = require('express')
// https://github.com/node-modules/utility
const utility = require('utility')

const app = express()

app.get('/', (req, res) => {
  const q = req.query.q

  const md5Value =utility.md5(q)

  res.send(md5Value)
})
.listen(3000, () => {
  console.log('app is running at port 3000')
})
