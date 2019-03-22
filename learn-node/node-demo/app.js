const express = require('express');
const app = express();
const port = 3000;

// this module parse the data in the body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-demo');

// define schema
const nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});
let User = mongoose.model('User', nameSchema);

// post
app.post('/addname', (req, res) => {
  const myData = new User(req.body);
  myData.save()
  .then(item => {
    res.send('item saved to database');
  })
  .catch(err => {
    res.status(400).send('unable to save to database');
  })
});

app.use('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, ()=> {
  console.log('Server listening on port: ' + port);
});
