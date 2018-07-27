'use strict';

const express = require('express');

let adminRouter = module.exports = express.Router();

const adminController = require('../controllers/admin');

//后台首页
adminRouter.get('/', adminController.gethome);

//后台列表页
adminRouter.get('/tables', adminController.gettables);

//后台列表页
adminRouter.get('/grid', adminController.getgrid);

//后台列表页
adminRouter.get('/forms', adminController.getforms);

//后台列表页
adminRouter.get('/elements', adminController.getelements);

//后台列表页
adminRouter.get('/blankpage', adminController.getblankpage);

//获取所有用户信息
adminRouter.get('/users', adminController.getusers);

//根据id删除用户
adminRouter.get('/users/delete/:id', adminController.deleteuserbyid);

//添加用户
adminRouter.post('/users/add', adminController.adduser);

//修改用户
adminRouter.post('/users/edit', adminController.edituser);

//根据用户id查询用户信息
adminRouter.get('/users/:id', adminController.getuserbyid);
