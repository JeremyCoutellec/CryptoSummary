const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const temp = { ...data };

  result.value = temp;
  return result;
};

module.exports = { validate };
