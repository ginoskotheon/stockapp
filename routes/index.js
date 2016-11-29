
var express = require('express');
var router = express.Router();
var Stocks = require('../models/stocks');

/* GET home page. */
router.get('/', function(req, res, next) {
  var symbols = [];
  // for (i in req.body.name){
  //   symbols.push(req.body.name[i]);
  // }

  Stocks.findOne({name: 'Stocks'}).then(function(doc){
    if(doc==null){
      var listOStocks = {
        name: 'Stocks',
        symbols: symbols
        }

      var savedStocks = new Stocks(listOStocks);

      savedStocks.save();
      res.render('index', {stocks: savedStocks});
    }else {
    var savedStocks = doc.symbols;
    // console.log(savedStocks);
    res.render('index', {stocks: savedStocks});
  }

  });

});

router.post('/:stock', function(req, res, next){
  var stock = req.params.stock;
  Stocks.update({name: 'Stocks'},{$push: {symbols: stock, upsert: true}}).then(function(doc){

    console.log(doc);
  });
  // console.log(stock);
  res.redirect('/');

});

router.delete('/:item', function(req,res){
  var toRemove = req.params.item;
  Stocks.update({name: 'Stocks'},{$pull: {symbols: toRemove, upsert: true}}).then(function(data){

    // console.log(JSON.stringify(data));
    res.json(data);
  });
});


module.exports = router;
