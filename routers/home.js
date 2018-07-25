'use strice';

const express = require('express');
const bodyParser = require('body-parser');

let app = express();

// 创建 application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({ extended:false });
//app.use(bodyParser.urlencoded({ extended:false }));
//parse application/json
app.use(bodyParser.json());

let homeRouter = module.exports = express.Router();

//获取控制器模块
const homeController = require('../controllers/home');

//首页
homeRouter.get('/', homeController.gethome);

//详情页面
//http://127.0.0.1:8081/blog/detail?id=xxxxx
homeRouter.get('/detail', homeController.getdetail);


//获取某个文章的所有评论
//http://127.0.0.1:8081/getcomments/xxxx
homeRouter.get('/getcomments/:id', homeController.getcommentsbyid);

//发表评论
homeRouter.post('/addblog', urlencodedParser, homeController.addblog);
