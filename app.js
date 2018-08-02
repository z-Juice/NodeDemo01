'use strice';

const express = require('express');
const xtpl = require('xtpl');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const hostname = '127.0.0.1';
const port = 8081;

let app = express();

//设置模板引擎
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', xtpl.renderFile);

//配置session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

//处理静态文件
app.use('/statics', express.static('statics'));

//创建 application/x-www-form-urlencoded 编码解析
//let urlencodedParser = bodyParser.urlencoded({ extended:false });
app.use(bodyParser.urlencoded({ extended:false }));
//parse application/json
app.use(bodyParser.json());

app.use(multer({ dest: './upload' }).array('image'));

//引入路由
const homeRouter = require('./routers/home');
app.use('/', homeRouter);
app.use('/blog', homeRouter);

const adminRouter = require('./routers/admin');
app.use('/admin', adminRouter);

const demoRouter = require('./routers/demo');
app.use('/demo', demoRouter);


//处理错误页面
app.use((req, res) => {
  //设置状态码
  res.status(404);
  res.redirect('/statics/error/404.html');
})

app.use((err, req, res, next) => {
  res.status(500);
  res.redirect('/statics/error/500.html');
})


//监听窗口
const server = app.listen(port, hostname, () => {
    
    console.log('Server running at http://' + hostname + ':' + port);
})
