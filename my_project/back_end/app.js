var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/songyufeng")//寝室用
        .then(function(db){
            console.log("数据库链接成功！")
        })
var User = require('./model/user');
//使用插件
app.use(bodyParser.json())//处理post请求的参数为json格式
app.use(bodyParser.urlencoded({ //处理post请求为form表单格式
   extended: true
}));
//测试前后端端口
app.post("/api/test",function(req,res){
	res.json({
		code:0,
		msg:"已经连接上"
	})
});
//处理前端路径为/api/login的post请求
app.post("/api/login",function(req,res){
    //查询是否有这个用户
    let {username,pwd} = req.body;
    User.find({username},function(err,doc){
        //console.log(doc)
        if (doc.length) {
            if(doc[0].pwd != pwd){
            	  res.json({
		    	       code:1,
		    	       msg:"密码错误"
		          })
		        return
            }
                 res.json({
		    	       code:0,
		    	       msg:"登陆成功"
		          })
        }else{
          res.json({
    	       code:2,
    	       msg:"用户名不存在"
          }) 

        };
    });
})
//处理用户注册
app.post("/api/regist",function(req,res){
    //获取到了数据，要存到数据库了
   // console.log(req.body)
    let {username,pwd,name} = req.body;
    //创建usermodel实例
	 var  u =  new User({
	    	username, 
	    	pwd,
	    	name
	    });
    //判断是否有重名的情况
    User.find({username},function(err,doc){
    	if(doc.length){
		 	res.json({
    	       code:1,
    	       msg:"用户名已存在"
            })
            return;
    	}
    	 u.save(function(err,doc){
         if (err) {
         	console.log(err);
         	return
         };
         res.json({
             code:0,
             msg:"注册成功"
         })
    });//保存到数据库
    })
});

app.listen(8848,function(){
	console.log("启动成功！")
});