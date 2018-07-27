'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let adminController = module.exports;

let url = "mongodb://localhost:27017/itcast";

//后台页面
adminController.gethome = (req, res) => {
    res.render('../views/admin/index.html', {});
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
        
        users.update({_id:ObjectID(req.body.id)}, {$set: {
            username: req.body.username,
            nickname: req.body.nickname,
            password: req.body.password,
            email: req.body.email
        }}, (err, data) => {
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