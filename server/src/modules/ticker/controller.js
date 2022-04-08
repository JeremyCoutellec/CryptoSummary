/* eslint-disable no-undef */
const express = require("express");
const { getQuery } = require("./request");
const {
    save,
    update,
  } = require("../../core/repository");
const {
  getByIdHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");
const { validate } = require("./request");
const { handleValidation } = require("../../core/middlewares");
const { Model: Ticker, name: modelNameTicker } = require('./model');
const { Model: Address, name: modelNameAddress } = require('../../core/commonModels/addressModel');
const { Model: TickerType, name: modelNameTickerType } = require('./tickerType/model');

const router = express.Router();

const saveTicker = async (req, res, next) => {
    try {
        let ticker = req.body;
        // Save address
        const savedAddress = await save(ticker?.address, modelNameAddress);
        if (!savedAddress) {
            return res.status(400).json({
                status: "error",
                message: "Ticker can't be saved due to an error on address save.",
            }).send();
        }
        req.log.info({ id: savedAddress?._id }, `${modelNameAddress} created`);
        ticker = {...ticker, address: savedAddress?._id};

        // Find Ticker type
        const tickerType = await TickerType.findOne({code: ticker?.type});
        if (!tickerType) {
            return res.status(404).json({
                status: "error",
                message: "Ticker type not found.",
            }).send();
        }
        ticker = {...ticker, type: tickerType?._id};
    
        const tickerFind = await Ticker.findOne({symbol: ticker?.symbol});
        if (tickerFind) {
            return res.status(404).json({
                status: "error",
                message: "Ticker with this symbol already exist.",
            }).send();
        }
        // Save Ticker
        const savedTicker = await save(ticker, modelNameTicker);
        if (!savedTicker) {
            return res.status(400).json({
                status: "error",
                message: "Ticker can't be saved.",
            }).send();
        }
        req.log.info({ id: savedTicker?._id }, `${modelNameTicker} created`);
        
        return res
            .status(201).json({
                ticker: savedTicker
            }).send();
        } catch (error) {
            return next(error);
    }
}

const updateTicker = async (req, res, next) => {
    try {
        let ticker = req.body;
        // Save address
        const savedAddress = await Address.findOne({_id: ticker?.address});
        if (!savedAddress) {
            return res.status(404).json({
                status: "error",
                message: "Address not found.",
            }).send();
        }
        ticker = {...ticker, address: savedAddress?._id};

        // Find Ticker type
        const tickerType = await TickerType.findOne({_id: ticker?.type});
        if (!tickerType) {
            return res.status(404).json({
                status: "error",
                message: "Ticker type not found.",
            }).send();
        }
        ticker = {...ticker, type: tickerType?._id};
    
        // Update Ticker
        const savedTicker = await update(ticker, modelNameTicker);
        if (!savedTicker) {
            return res.status(400).json({
                status: "error",
                message: "Ticker can't be update.",
            }).send();
        }
        req.log.info({ id: savedTicker?._id }, `${modelNameTicker} updated`);
        
        return res
            .status(201).json({
                ticker: savedTicker
            }).send();
        } catch (error) {
            return next(error);
    }
}

const searchHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};

router.get("/:id", getByIdHandler);
router.post("/", handleValidation(validate), saveTicker);
router.put("/:id", handleValidation(validate), updateTicker);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
