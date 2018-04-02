var mongoose = require("mongoose");

//创建schema :文档集合的映射
var Good = mongoose.Schema({
	name:String,
	batch:String,
	number:Number
});

module.exports = Good;