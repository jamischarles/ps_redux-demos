var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/conversion', function(req, res, next) {
  // randomize the exchange rate
  var max = 100; // ms
  var min = 0.1;
  var xRate = Math.floor(Math.random() * (max - min)) + min;

  var originAmount = req.query.originAmount;
  var originCurrency = req.query.originCurrency;
  var destAmount = req.query.destAmount;
  var destCurrency = req.query.destCurrency;

  // if both currencies are the same, exchange rate will be 1.
  if (originCurrency === destCurrency) {
    xRate = 1;
  }

  if (!originAmount) {
    originAmount = (parseInt(destAmount, 10) * xRate).toFixed(2);
  } else {
    destAmount = (parseInt(originAmount, 10) / xRate).toFixed(2);
  }


  // random timeout to simulate api response times
  setTimeout(function(){
    res.json({originAmount: originAmount, destAmount: destAmount, destCurrency: destCurrency, xRate: xRate  })
  }, getRandomResponseTime())
});


function getRandomResponseTime() {
  var max = 1200; // ms
  var min = 150;
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;
