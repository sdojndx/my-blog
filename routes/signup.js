const fs = require('fs')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin
console.log(checkNotLogin);
console.log(typeof checkNotLogin);
// GET /signup 注册页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signup')
})

// POST /signup 用户注册
router.post('/', checkNotLogin, function (req, res, next) {
  //res.send('注册')
  const {name,gender,bio,repassword} = req.fields;
  let password = req.fields.password;
  try{
    if(!(name.length>=1&&name.length<=10)){
      shrow new Error('名字请限制在1-10个字符')
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x')
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符')
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像')
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符')
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致')
    }
  }catch(e){
    fs.unlink(req.files.avatar.path)
    req.falsh('error',e.message)
    return res.redirect('/signup')
  }
  password=sha1(password)
  let user = {
    name:name,
    password:password,
    gender:gender,
    bio:bio,
    avatar:avatar
  }
})

module.exports = router
