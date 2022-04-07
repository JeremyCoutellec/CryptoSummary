const router = require('express').Router();
// const axios = require('axios');
// const StockTicker = require('../models/stockTickerModel');

// router.get('/eod', auth, (req, res) => {
//     try {
//         params = {
//             // access_key: process.env.MARKET_ACCESS_KEY,
//             symbols: AAPL
//         }
//         axios.get('https://api.marketstack.com/v1/tickers/aapl/eod', {params})
//           .then(response => {
//             const apiResponse = response.data;
//             if (Array.isArray(apiResponse['data'])) {
//                 apiResponse['data'].forEach(stockData => {
//                       console.log(`Ticker ${stockData['symbol']}`,
//                           `has a day high of ${stockData['high']}`,
//                           `on ${stockData['date']}`);
//                 });
//             }
//           }).catch(error => {
//             console.log(error);
//           });
//     } catch(err) {
//         console.error(err);
//         res.status(500).send();
//     }
// });


module.exports = router;
