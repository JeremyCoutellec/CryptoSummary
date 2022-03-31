const router = require('express').Router();
const axios = require('axios');
const StockTicker = require('../models/stockTickerModel');

// Create
router.post('/', auth, (req, res) => {
    const {symbol, name, stockExchange, stockExchangeMIC, country} = req.body;

    const existingStockTicker = await StockTicker.findOne({symbol});
    if(existingStockTicker)
        return res.status(400).json({
            errorMessage: "A stock ticker with this symbol already exists."
        })

    const newStockTicker = new StockTicker({
        symbol, name, stockExchange, stockExchangeMIC, country
    });
    const savedStockTicker = await newStockTicker.save();
    res.json({
        stockTicker: savedStockTicker
    }).send();
});

// Get All
router.get('/', auth, (req, res) => {
    const stockTickers = await StockTicker.find();
    res.json(stockTickers).send();
});

// Get All
router.get('/', auth, (req, res) => {
    const stockTickers = await StockTicker.find();
    res.json(stockTickers).send();
});

router.get('/eod', auth, (req, res) => {
    try {
        params = {
            // access_key: process.env.MARKET_ACCESS_KEY,
            symbols: AAPL
        }
        axios.get('https://api.marketstack.com/v1/tickers/aapl/eod', {params})
          .then(response => {
            const apiResponse = response.data;
            if (Array.isArray(apiResponse['data'])) {
                apiResponse['data'].forEach(stockData => {
                      console.log(`Ticker ${stockData['symbol']}`,
                          `has a day high of ${stockData['high']}`,
                          `on ${stockData['date']}`);
                });
            }
          }).catch(error => {
            console.log(error);
          });
    } catch(err) {
        console.error(err);
        res.status(500).send();
    }
});


modules.exports = router;
