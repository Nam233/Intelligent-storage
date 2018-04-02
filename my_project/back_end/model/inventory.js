var mongoose = require("mongoose");

var InventorySchema = require('../schema/inventory.js');

//生成model，model才具有数据库操作能力
//集合名必须是复数

var Inventory = mongoose.model('inventorys',InventorySchema);


module.exports = Inventory;