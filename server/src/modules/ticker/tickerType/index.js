const routes = require("./controller");
const { name: ModelName } = require("./model");

const processRequest = async (req, res, next) => {
  req.modelName = ModelName;
  return next();
};

const init = async (app) => {
  app.use(
    "/api/ticker_type",
    processRequest,
    routes
  );
  return app;
};

module.exports = { init };
