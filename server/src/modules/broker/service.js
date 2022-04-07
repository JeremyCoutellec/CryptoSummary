// load repository.js
const { name: ModelName } = require("./model");

const getQuery = (payload) => {
  const queries = [];

  if (payload.name) {
    queries.push({ name: { $regex: payload.name, $options: "i" } });
  }

  let query = {};
  if (queries.length === 1) {
    query = { ...queries[0] };
  }
  if (queries.length > 1) {
    query = { $and: queries };
  }
  return query;
};

const setupEventListeners = () => {
  eventEmitter.on(`${modelName}Created`, (model) => {
    console.log(`${modelName} created`, model);
  });
  eventEmitter.on(`${modelName}Updated`, (model) => {
    console.log(`${modelName} updated`, model);
  });
  eventEmitter.on(`${modelName}Deleted`, (model) => {
    console.log(`${modelName} deleted`, model);
  });
};

// setupEventListeners();

module.exports = {
  getQuery,
  modelName: ModelName,
};
