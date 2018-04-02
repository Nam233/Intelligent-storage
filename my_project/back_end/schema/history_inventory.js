var mongoose = require("mongoose");

//创建schema :文档集合的映射
var History_inventory = mongoose.Schema({
	storage_location_id:String,
	goods_id:String,
	careat_at:String,
	delete_at:String
});

module.exports = History_inventory;