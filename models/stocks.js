'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stocks = new Schema({
  name: {type: String, unique: true},
  symbols:[]


});

module.exports = mongoose.model('Stocks', Stocks);
