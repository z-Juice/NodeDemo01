'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let homeController = module.exports;

//连接数据库
let url = 'mongodb://localhost:27017/itcast';

//首页
homeController.gethome = (req, res) => {
    //连接数据库
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        //获取要操作的集合
        let posts = db.collection('posts');
        //查询所有的数据--查询所有的博客数据
        posts.find().toArray((err, postsData) => {
            if (err) throw err;
            
            //查询所有的用户信息
            let users = db.collection('users');
            users.find().toArray((err, usersData) => {
                
                //遍历data数据，重新给日期赋值
                postsData.forEach((item) => {
                    item.created = item.created.toDateString();
                    
                    //根据用户的id 查询用户的信息  -> users
                    item.username = usersData.find((n) => {
                        if(n._id.toString() == item.user_id.toString()) {
                            return true;
                        }
                    }).username;
                })
                
                //渲染模板和数据，输出给浏览器
                res.render('../views/blog/index.html', {title: '这是博客首页', data: postsData})
            })
            
            client.close();
        })
    })
}

//详情页
homeController.getdetail = (req, res) => {
    //获取url上的id, query获取的是查询字符串  ?id=xxx
    let id = req.query.id;
    
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;
        
        let db = client.db('itcast');
        //获取要操作的集合
        let posts = db.collection('posts');
        
        posts.findOne({_id: ObjectID(id)}, (err, data) => {
            res.render('../views/blog/detail.html', {data: data})
        })
        
        client.close();
    })
}

//联系我们
homeController.getcontact = (req, res) => {
    res.render('../views/blog/contact.html', {});
}

//关于我们
homeController.getabout = (req, res) => {
    res.render('../views/blog/about.html', {});
}

//根据id返回评论数据
homeController.getcommentsbyid = (req, res) => {
    //获取文章id
    let id = req.params.id;
    
    MongoClient.connect(url, (err, client) => {
        
        let db = client.db('itcast');
        
        let comments = db.collection('comments');
        
        comments.find({post_id: ObjectID(id)}).toArray((err, data) => {
            res.json(data);
        })
        
        client.close();
    })
}

//发表评论
homeController.addblog = (req, res) => {
    
    MongoClient.connect(url, (err, client) => {
        
        if (err) throw err;
        
        let db = client.db('itcast');
        
        let comments = db.collection('comments');
        
        comments.insert({
            author: req.body.name,
            author_email: req.body.email,
            author_ip: req.socket.remoteAddress,     //服务端获取的
            content: req.body.comment,
            support: 0,      //默认  0
            oppose: 0,        //默认 0
            created: new Date(),      //发表事件  服务端获取
            post_id: ObjectID(req.body.postid)
        }, (err, result) => {
            if(err){
                res.json({code: 20010, msg:'评论失败'});
            }else{
                res.json({code: 10000, msg:'评论成功'});
            }
        })
        
        client.close();
    })
    
}