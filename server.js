const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')
 var db
const url = 'mongodb+srv://tommyfan:cnurobot@garderdb-ityx5.mongodb.net'
MongoClient.connect(url, (err, client) => {
  // ... start the server
  if (err) return console.log(err)
  db = client.db('gardenDB') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/index.html')
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    db.collection('temperature').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})
app.post('/quotes', (req, res) => {
    db.collection('temperature').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
