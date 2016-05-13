var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/**
 * JSON Routes
 */
router.get('/api/conversion', function(req, res, next) {

  var originAmount = req.query.originAmount;
  var originCurrency = req.query.originCurrency;
  var destAmount = req.query.destAmount;
  var destCurrency = req.query.destCurrency;
  var calcOriginAmount  = req.query.calcOriginAmount === 'true';
  var xRate = getXRate(originCurrency, destCurrency);


  // decide whether to convert TO or FROM originAmount
  if (calcOriginAmount) {
    originAmount = (parseFloat(destAmount, 10) / xRate).toFixed(2);
  } else {
    destAmount = (parseFloat(originAmount, 10) * xRate).toFixed(2);
  }

  // random timeout to simulate api response times
  setTimeout(function(){
    res.json({originAmount: originAmount, destAmount: destAmount, destCurrency: destCurrency, xRate: xRate  })
  }, getRandomResponseTime())
});

router.get('/api/fees', function(req, res, next) {
  var originAmount = req.query.originAmount;
  var originCurrency = req.query.originCurrency;
  var destCurrency = req.query.destCurrency;

  var feeAmount = getFee(originAmount, originCurrency, destCurrency);

  // random timeout to simulate api response times
  setTimeout(function(){
    res.json({originAmount: originAmount, originCurrency: originCurrency, destCurrency: destCurrency, feeAmount: feeAmount  })
  }, getRandomResponseTime())

});

/**
 * Helper functions
 */

function getXRate(originCurrency, destCurrency) {
  var rate = 1;

  // if both currencies are the same, exchange rate will be 1.
  if (originCurrency === destCurrency) {
    return rate;
  }

  rate = xRates[originCurrency + '_' + destCurrency];
  if (!rate) {
    console.log('ERROR: Exchange rate missing for ' + originCurrency + ' -> ' + destCurrency)
  }

  return rate;
}

// Returns fee amount (feePercentage of originAmount for transaction)
function getFee(originAmount, originCurrency, destCurrency) {
  var feePerc = 2;

  feePerc = fees[originCurrency + '_' + destCurrency];

  if (!feePerc) {
    return console.log('ERROR: Fee % missing for ' + originCurrency + ' -> ' + destCurrency)
  }

  return originAmount * feePerc / 100;

}

function getRandomResponseTime() {
  var max = 1200; // ms
  var min = 150;
  return Math.floor(Math.random() * (max - min)) + min;
}

// TODO: get some real values here
// bogus values...
var xRates = {
  USD_EUR: 1.5,
  EUR_USD: 1 / 1.5,

  USD_JPY: 108.81,
  JPY_USD: 1 / 108.81,


  EUR_JPY: 123.79,
  JPY_EUR: 1 / 123.79
}

// in percentages
var fees = {
  USD_USD: 2,
  USD_EUR: 15,
  USD_JPY: 105,
  EUR_USD: 2,
  EUR_JPY: 70,
  EUR_EUR: 5,
  JPY_JPY: 2,
  JPY_USD: 26,
  JPY_EUR: 14
}

module.exports = router;
