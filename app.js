'use strice';

const express = require('express');
const xtpl = require('xtpl');
const multer = require('multer');

let app = express();

//处理静态文件
app.use('/statics', express.static('statics'));

//设置模板引擎
app.set('views', './views');
app.set('view engine', 'html');
app.engine('html', xtpl.renderFile);

app.use(multer({ dest: './upload' }).array('image'));

//引入路由
const homeRouter = require('./routers/home');
const demoRouter = require('./routers/demo');

app.use('/', homeRouter);
app.use('/blog', homeRouter);
app.use('/demo', demoRouter);

//监听窗口
const server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})
