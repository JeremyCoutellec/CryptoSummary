const authRoutes = require("./controllerAuth");
const userRoutes = require("./controller");
const {
  authenticateRequest,
  authorizeRequest,
} = require("../../core/middlewares");

const { name: ModelName } = require("./model");

const processRequest = async (req, res, next) => {
  req.modelName = ModelName;
  return next();
};

const init = async (app) => {
  app.use("/api", authRoutes);
  app.use(
    "/api/user",
    authenticateRequest,
    // authorizeRequest,
    processRequest,
    userRoutes
  );
  return app;
};

module.exports = { init };
