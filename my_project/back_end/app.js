var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var showapiSdk = require('showapi-sdk');
var sd = require('silly-datetime');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/songyufeng")//寝室用
        .then(function(db){
            console.log("数据库链接成功！")
        })
//数据库modal引入
var User = require('./model/user');
var Good = require('./model/good');
var History_inventory = require('./model/history_inventory');
var Inventory = require('./model/inventory');
var Storage_location = require('./model/storage_location');
var Warehouse = require('./model/warehouse');
//使用插件
app.use(bodyParser.json())//处理post请求的参数为json格式
app.use(bodyParser.urlencoded({ //处理post请求为form表单格式
   extended: true
}));
//测试前后端端口
app.get("/api/test",function(req,res){
    
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log("test已调用 调用时间："+time);
	res.json({
		code:0,
		msg:"已经连接上"
	})
});
//测试前后端端口 post
app.post("/api/test_post",function(req,res){
    let {name} = req.body;
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+"   二维码信息为： "+name);
    Warehouse.find({},function(err,doc){
           if (err) {
                console.log(err);
                return
             };
             res.json({
                 code:0,
                 list:doc
             })
        })
});
//查询仓库列表
app.post("/api/select_warehouse",function(req,res){
     var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" select_warehouse");
    let {_id} = req.body;
    if(_id){
        Warehouse.find({_id},function(err,doc){
           if (err) {
                
             };
             res.json({
                 code:0,
                 list:doc
             })
        })
    }else{
        Warehouse.find({},function(err,doc){
           if (err) {
                console.log(err);
                return
             };
             res.json({
                 code:0,
                 list:doc
             })
        })
    }
});
//添加新的仓库
app.post("/api/insert_warehouse",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" insert_warehouse");
    let{name,location} = req.body;
    var w = new Warehouse({
        name,
        location
    });
    w.save(function(err,doc){
         if (err) {
            console.log(err);
            return
         };
         res.json({
             code:0,
             msg:doc
         })
    });
})
//仓库添加库位
app.post("/api/insert_location",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" insert_location");
    let{name,is_empty,warehouse_id} = req.body;
    var l = new Storage_location({
        name,
        is_empty,
        warehouse_id
    });
    l.save(function(err,doc){
         if (err) {
            console.log(err);
            return
         };
         res.json({
             code:0,
             msg:doc
         })
    });
});
//仓库删除
app.post("/api/del_storage",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" del_storage");
    var _id = req.body;
    Warehouse.findOneAndRemove({_id},function(err,doc){
        if (err) {
            return
        };
        res.json({
            code:0,
            msg:"删除成功"
        })
    })
});
//仓库库位查询
app.post("/api/select_location",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" select_location");
    let {warehouse_id,_id} = req.body;
    if(warehouse_id){
            Storage_location.find({warehouse_id},function(err,doc){
            if(doc.length){
                res.json({
                    code:0,
                    msg:doc
                })
            }else{
                res.json({
                    code:1,
                    msg:"查询失败"
                })
            }
        })
    }
    if(_id){
         Storage_location.find({_id},function(err,doc){
            if(doc.length){
                res.json({
                    code:0,
                    msg:doc
                })
            }else{
                res.json({
                    code:1,
                    msg:"查询失败"
                })
            }
        })
    }
    

})
//处理库位删除
app.post("/api/del_location",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" del_location");
    var _id = req.body;
    Storage_location.findOneAndRemove({_id},function(err,doc){
        if (err) {
            return
        };
        res.json({
            code:0,
            msg:"删除成功"
        })
    })
});
//货品录入
app.post("/api/insert_good",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" insert_good");
    let {name, batch,number} = req.body;
    var  g =  new Good({
            name, 
            batch,
            number
        });
     g.save(function(err,doc){
         if (err) {
            console.log(err);
            return
         };
         res.json({
             code:0,
             msg:"录入货品成功"
         })
     });
});
//查询全部货品
app.get("/api/select_allgoods",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" select_allgoods");
    Good.find({},function(err,doc){
        if(doc.length){
            res.json({
                code:0,
                msg:doc
            })
        }else{
            res.json({
                code:1,
                msg:"查询失败"
            })
        }
    })
});
//根据商品ID 查询 商品信息
app.post("/api/select_goodByid",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" select_goodByid");
    let {_id} = req.body;
    Good.find({_id},function(err,doc){
        if(doc.length){
            res.json({
                code:0,
                msg:doc
            })
        }else{
            res.json({
                code:1,
                msg:"查询失败"
            })
        }
    })
})
//查询当前存放记录
app.post("/api/select_inventory",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" select_inventory");
    let {storage_location_id,goods_id} = req.body;
    if(storage_location_id){
        Inventory.find({storage_location_id},function(err,doc){
            if(err){
                return
            }
            res.json({
                code:0,
                msg:doc
            })
        })
    }
    if(goods_id){
        Inventory.find({goods_id},function(err,doc){
            if(err){
                return
            }
            res.json({
                code:0,
                msg:doc
            })
        })
    }
});
//查询历史存放记录
app.post("/api/select_history_inventory",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" select_history_inventory");
    let {storage_location_id,goods_id} = req.body;
    if(storage_location_id){
        History_inventory.find({storage_location_id},function(err,doc){
            if(err){
                return
            }
            res.json({
                code:0,
                msg:doc
            })
        })
    }
    if(goods_id){
        History_inventory.find({goods_id},function(err,doc){
            if(err){
                return
            }
            res.json({
                code:0,
                msg:doc
            })
        })
    }
});
//根据_id删除货品
app.post("/api/del_good",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" del_good");
    var _id = req.body;
    Good.findOneAndRemove({_id},function(err,doc){
        if (err) {
            return
        };
        res.json({
            code:0,
            msg:"删除成功"
        })
    })
});
//入库操作
app.post("/api/push_indoor",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var careat_at = time;
    console.log(" 调用时间："+time+" push_indoor");
    let {storage_location_id,goods_id} = req.body;
    Inventory.find({goods_id},function(err,doc){
        if(doc.length){
            res.json({
             code:1,
             msg:"商品已在库中"
         })
        }else{
             var i = new Inventory({
                    storage_location_id, 
                    goods_id,
                    careat_at
                });
            i.save(function(err,doc){
                  Storage_location.findOneAndUpdate({_id:storage_location_id},{is_empty:0},{new:true},function(err,doc){
                    if (err) {
                        return
                    };
                })
                 if (err) {
                    console.log(err);
                    return
                 };
                 res.json({
                     code:0,
                     msg:"写入成功"
                 })
             })
        }
    });
});
//出库操作
app.post("/api/pull_indoor",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var delete_at = time;
    console.log(" 调用时间："+time+" pull_indoor");
    let {goods_id} = req.body;
    Inventory.find({goods_id},function(err,doc){
        if(doc.length){            
            Inventory.findOneAndRemove({goods_id},function(err,doc){
                if (err) {
                    return
                };
                let {storage_location_id,goods_id,careat_at} = doc;
                var h = new History_inventory({
                    storage_location_id,
                    goods_id,
                    careat_at,
                    delete_at
                });
                h.save(function(err,doc){
                    if (err) {
                        return
                    };
                    Storage_location.findOneAndUpdate({_id:storage_location_id},{is_empty:1},{new:true},function(err,doc){
                        if (err) {
                            return
                        };
                        res.json({
                            code:0,
                            msg:"出库成功"
                        })
                    })
                })
                
            })
        }else{
            res.json({
                code:1,
                msg:"商品并不在库中"
            })
        }
    });

})
//处理前端路径为/api/login的post请求
app.post("/api/login",function(req,res){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" login");
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
     var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    console.log(" 调用时间："+time+" regist");
    //获取到了数据，要存到数据库了
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
//处理二维码生成
app.post("/api/QRcode",function(req,res){
    //设置你测试用的appId和secret,img
    let {cont} = req.body; 
    var appId='59788';
    var secret='321763b6c8474d9898a9d180941c8937';
    //全局默认设置
    showapiSdk.setting({
      url:"http://route.showapi.com/887-1",//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
      appId:appId,//你的应用id
      secret:secret,//你的密钥
      timeout:5000,//http超时设置
      options:{//默认请求参数,极少用到
        testParam:'test'
      }
    })
    var request=showapiSdk.request();
    request.appendText('content',cont);
    request.appendText('size','5');
    request.appendText('imgExtName','jpg');
    request.post(function(data){
      res.json({
             code:0,
             msg:data.showapi_res_body.imgUrl
         })
    })
});
app.listen(8848,function(){
	console.log("启动成功！")
});