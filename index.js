const path = require('path')
const express = require('express')
const session = require('express-session')
const formidable = require('express-formidable')
const MongoStore = require('connect-mongo')(session)

const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes =  require('./routes')
const pkg = require('./package')

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')))

app.use(session({
  name:config.session.key,
  secret:config.session.secret,
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:config.session.maxAge
  },
  store: new MongoStore({
    url:config.mongodb
  })
}))
app.use(flash())
// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
app.use(formidable({
  uploadDir:path.join(__dirname,'public/img'),
  keepExtensions:true
}))

routes(app)

app.listen(config.port,function(){
  console.log(`${pkg.name} listening on port ${config.port}`)
})
