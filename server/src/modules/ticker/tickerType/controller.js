/* eslint-disable no-undef */
const express = require("express");
const { getQuery } = require("./request");
const {
  getByIdHandler,
  saveHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../../core/controller");
const { validate } = require("./request");
const { handleValidation } = require("../../../core/middlewares");

const router = express.Router();

const searchHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};

router.get("/:id", getByIdHandler);
router.post("/", handleValidation(validate), saveHandler);
router.put("/:id", handleValidation(validate), updateHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
