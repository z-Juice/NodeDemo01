'use strict';

const express = require('express');
const bodyParser = require('body-parser');

let app = express();

// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended:false });
//app.use(bodyParser.urlencoded({ extended:false }));
//parse application/json
app.use(bodyParser.json());

let demoRouter = module.exports = express.Router();

//获取控制器模块
const demoController = require('../controllers/demo');

//获取\demo\form
demoRouter.get('/form', demoController.getdemo);

//get请求
demoRouter.get('/process_get', demoController.process_get);

//post请求
demoRouter.post('/process_post', urlencodedParser, demoController.process_post);

//文件上传请求
demoRouter.post('/file_upload', demoController.file_upload);

