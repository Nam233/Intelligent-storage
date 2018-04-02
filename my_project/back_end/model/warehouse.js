var mongoose = require("mongoose");

var WarehouseSchema = require('../schema/warehouse');

//生成model，model才具有数据库操作能力
//集合名必须是复数

var Warehouse = mongoose.model('warehouses',WarehouseSchema);


module.exports = Warehouse;