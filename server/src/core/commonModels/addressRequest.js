const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  address1: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(2).max(30).required(),
  state: Joi.string().min(2).max(30).required(),
  address2: Joi.string().min(3).max(30).optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const temp = { ...data };

  result.value = temp;
  return result;
};

module.exports = { validate, schema };
