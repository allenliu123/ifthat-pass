let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken')
var Pass = require('../models/pass');
let fs = require("fs")
let path = require('path')
let publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.pem")).toString()

// 根据用户 id 获取密码字符串
router.get('/getStr', (req, res) => {
  // 数据库验证
  let id = req.query.id
  Pass.findOne({id: id}).then(data => {
    console.log(data)
    if (!data) {
      Pass.create({id: id, password: '{}'}).then(res => {
        console.log('create new pass ', {id: id, password: '{}'}.toString())
        res.json({
          code: 200,
          message: 'success',
          data: '{}'
        })
      })
    } else {
      res.json({
        code: 200,
        message: 'success',
        data: data.password
      })
    }
  })
})

// 保存密码字符串
router.post('/saveStr', (req, res) => {
  let data = req.body
  Pass.update({id: data.id}, {$set: {password: data.data}}).then(() => {
    res.json({
      code: 200,
      message: 'success'
    })
  })
})

// 验证 token
router.get('/verify', (req, res) => {
  let token = req.query.token
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
      res.json({
        code: 200,
        message: 'success',
        data: decoded
      })
    }
  })
})

module.exports = router;
