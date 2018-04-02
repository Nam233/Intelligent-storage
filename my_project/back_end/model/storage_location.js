var mongoose = require("mongoose");

var Storage_locationSchema = require('../schema/storage_location.js');

//生成model，model才具有数据库操作能力
//集合名必须是复数

var Storage_location = mongoose.model('storage_locations',Storage_locationSchema);


module.exports = Storage_location;