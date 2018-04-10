var mongoose = require("mongoose");

//创建schema :文档集合的映射
var Storage_location = mongoose.Schema({
	warehouse_id:String,
	name:String,
	is_empty:String
});

module.exports = Storage_location;