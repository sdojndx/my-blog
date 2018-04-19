const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

router.get('/',function(req,res,next){
  res.send('主页')
})

router.post('/create',checkLogin,function(req,res,next){
  res.send('发表文章')
})

router.get('/create',checkLogin,function(req,res,next){
  res.send('发表文章页')
})
router.get('/:postId',function(req,res,next){
  res.send('文章详情页')
})


router.get('/:postId/edit',checkLogin,function(req,res,next){
  res.send('更新文章页')
})
router.post('/:postId/edit',checkLogin,function(req,res,next){
  res.send('更新文章')
})

router.get('/:postId/remove',checkLogin,function(req,res,next){
  res.send('更新文章')
})
// router.post('/:postId/remove',checkLogin,function(req,res,next){
//   res.send('更新文章')
// })
module.exports = router
