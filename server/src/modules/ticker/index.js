const routes = require("./controller");
const {init: initTickerType} = require("./tickerType");
const { name: ModelName } = require("./model");

const processRequest = async (req, res, next) => {
  req.modelName = ModelName;
  return next();
};

const init = async (app) => {
  app.use(
    "/api/ticker",
    processRequest,
    routes
  );
  initTickerType(app);
  return app;
};

module.exports = { init };
