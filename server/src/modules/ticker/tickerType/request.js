const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  assetClass: Joi.string().required(),
  code: Joi.string().min(2).max(30).required(),
  locale: Joi.string().min(2).max(30).required(),
  description: Joi.string().min(3).max(1000).optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const temp = { ...data };

  result.value = temp;
  return result;
};

module.exports = { validate };
