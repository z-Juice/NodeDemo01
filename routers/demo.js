'use strict';

const express = require('express');

let app = express();

let demoRouter = module.exports = express.Router();

//获取控制器模块
const demoController = require('../controllers/demo');

//获取\demo\form
demoRouter.get('/form', demoController.getdemo);

//get请求
demoRouter.get('/process_get', demoController.process_get);

//post请求
demoRouter.post('/process_post', demoController.process_post);

//文件上传请求
demoRouter.post('/file_upload', demoController.file_upload);

