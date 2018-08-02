'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let adminController = module.exports;

let url = "mongodb://localhost:27017/itcast";

//后台页面
adminController.gethome = (req, res) => {
    res.render('../views/admin/index.html', {'current': 'home'});
}

//后台登录页
adminController.login = (req, res) => {
  res.render('../views/admin/login.html', {});
}

//后台列表页
adminController.gettables = (req, res) => {
    res.render('../views/admin/tables.html', {'current': 'tables'});
}

//后台grid
adminController.getgrid = (req, res) => {
    res.render('../views/admin/grid.html', {'current': 'grid'});
}

//后台forms
adminController.getforms = (req, res) => {
    res.render('../views/admin/forms.html', {'current': 'forms'});
}

//后台elements
adminController.getblankpage = (req, res) => {
    res.render('../views/admin/elements.html', {'current': 'blankpage'});
}

//后台blankpage
adminController.getelements = (req, res) => {
    res.render('../views/admin/blankpage.html', {'current': 'elements'});
}

//查询所有用户
adminController.getusers = (req, res) => {
    
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        let users = db.collection('users');
        
        users.find().toArray((err, data) => {
            res.json(data);
        })
        
        client.close();
    })
    
}

//根据id删除用户
adminController.deleteuserbyid = (req, res) => {
    
    let id = req.params.id;
    
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        let users = db.collection('users');
        
        users.remove({_id:ObjectID(id)}, (err, data) => {
            if(err){
                res.json({code: 20010,msg: '删除失败'});
            }else{
                res.json({code: 10000,msg: '删除成功'});
            }
        })
        
        client.close();
    })
    
}

//添加用户
adminController.adduser = (req, res) => {
    
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        let users = db.collection('users');
        
        users.insertOne({
            username: req.body.username,
            nickname: req.body.nickname,
            password: req.body.password,
            email: req.body.email,
            created: new Date()
        }, (err, data) => {
            if(err){
                res.json({code: 20010,msg: '添加失败'});
            }else{
                res.json({code: 10000,msg: '添加成功'});
            }
        })
        
        client.close();
    })
    
}

//根据id修改用户
adminController.edituser = (req, res) => {
    
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        let users = db.collection('users');
        let pwd = req.body.password;
        let user = new Object();
        
        if(pwd){
            user = {
                username: req.body.username,
                nickname: req.body.nickname,
                password: req.body.password,
                email: req.body.email
            };
        }else{
            //如果password为空，不修改密码
            user = {
                username: req.body.username,
                nickname: req.body.nickname,
                email: req.body.email
            };
        }
        
        users.update({_id:ObjectID(req.body.id)}, {$set: user}, (err, data) => {
            if(err){
                res.json({code: 20010,msg: '修改失败'});
            }else{
                res.json({code: 10000,msg: '修改成功'});
            }
        })
        
        client.close();
    })
    
}

//根据id查询一个用户信息
adminController.getuserbyid = (req, res) => {
    
    let id = req.params.id;
    
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        let users = db.collection('users');
        
        users.findOne({_id:ObjectID(id)}, (err, data) => {
            if(err){
                res.json({code: 20010,msg: '查无此人'});
            }else{
                res.json(data);
            }
        })
        
        client.close();
    })
    
}

//登录接口
adminController.handlelogin  = (req, res) => {
  //获取用户输入的账号和密码
  let username = req.body.username;
  let password = req.body.password;

  MongoClient.connect(url, (err, client) => {
    let db = client.db('itcast');
    let users = db.collection('users');
    
    users.findOne({username: username}, (err, data) => {
      if (err) throw err;
      
      if(data && data.password === password) {
        //记录登录成功的状态
        req.session.user = data;
        
        res.json({code: 10000, msg: '登录成功'});
      }else{
        res.json({code: 20008, msg: '用户名或密码错误'});
      }
      
      client.close();
    })
  })
  
}