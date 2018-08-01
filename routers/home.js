'use strice';

const express = require('express');

let homeRouter = module.exports = express.Router();

//获取控制器模块
const homeController = require('../controllers/home');

//首页
homeRouter.get('/', homeController.gethome);

//分页的接口 pageindex 页码
homeRouter.get('/getpagedatas/:pageindex', homeController.getpagedatas);

//获取总页数
homeRouter.get('/getpagecount', homeController.getpagecount);

//详情页面
//http://127.0.0.1:8081/blog/detail?id=xxxxx
homeRouter.get('/detail', homeController.getdetail);

//联系我们
homeRouter.get('/contact', homeController.getcontact);

//关于我们
homeRouter.get('/about', homeController.getabout);

//获取某个文章的所有评论
//http://127.0.0.1:8081/getcomments/xxxx
homeRouter.get('/getcomments/:id', homeController.getcommentsbyid);

//发表评论
homeRouter.post('/addblog', homeController.addblog);
