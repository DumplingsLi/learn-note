const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); // 设置允许跨域的origin，允许3000端口访问本端口（3001）
  res.send("Hello world from CROS.😡");   // 空格部分为表情，可能在编辑器不会显示
});


app.listen(3001, function() {
  console.log('server is listening on port 3001')
})
