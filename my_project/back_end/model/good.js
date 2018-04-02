var mongoose = require("mongoose");

var GoodSchema = require('../schema/good.js');

//生成model，model才具有数据库操作能力
//集合名必须是复数

var Good = mongoose.model('goods',GoodSchema);


module.exports = Good;