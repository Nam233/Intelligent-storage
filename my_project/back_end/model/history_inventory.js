var mongoose = require("mongoose");

var History_inventorySchema = require('../schema/history_inventory.js');

//生成model，model才具有数据库操作能力
//集合名必须是复数

var History_inventory = mongoose.model('history_inventorys',History_inventorySchema);


module.exports = History_inventory;