var mongoose = require("mongoose");

//创建schema :文档集合的映射
var WarehouseSchema = mongoose.Schema({
	name:String,
	location:String
});

module.exports = WarehouseSchema;