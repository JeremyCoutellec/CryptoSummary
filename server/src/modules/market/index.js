const routesHoliday = require("./marketHoliday/controller");
const routesStatus = require("./marketStatus/controller");

const processRequest = async (req, res, next) => {
  req.modelName = ModelName;
  return next();
};

const init = async (app) => {
  app.use(
    "/api/marketHoliday",
    processRequest,
    routesHoliday
  );
  app.use(
    "/api/marketStatus",
    processRequest,
    routesStatus
  );
  return app;
};

module.exports = { init };
