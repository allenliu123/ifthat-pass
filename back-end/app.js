// 业务服务器
const express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken')
let fs = require("fs")
let path = require('path')
let publicKey = fs.readFileSync(path.join(__dirname, "./keys/public.pem")).toString()
const config = require('./config')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
	// let writePath = ['/verify']
	// if (writePath.indexOf(req.path) > -1) {
  //   next()
  //   return
	// }
	let token = req.cookies['token']
	jwt.verify(token, publicKey, function(err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.json({
          code: -2,
          message: '登录过期',
          data: err
        })
      } else {
        res.json({
          code: -1,
          message: 'token 校验失败',
          data: err
        })
      }
    } else {
			next()
    }
	})
})

app.use('/', require('./apis/index'))

mongoose.connect(`mongodb://${config.db.user}:${config.db.pass}@ifthat.com:27017/ifthat-user`, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
	if(err){
    console.log(err)
		console.log('fail to connect database');
	} else {
		console.log('success connect database');
		app.listen(8084, function() {
      console.log('server started')
    })
	}
});

