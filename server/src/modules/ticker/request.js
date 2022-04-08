const Joi = require("joi");
const {schema: schemaAddress} = require('../../core/commonModels/addressRequest')

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  active: Joi.boolean().required(),
  name: Joi.string().min(3).max(30).required(),
  symbol: Joi.string().min(3).max(30).required(),
  address: Joi.alternatives(schemaAddress, Joi.string().optional()),
  type: Joi.string().required(),
  brandingIcon: Joi.string().min(3).max(250).optional(),
  brandingLogo: Joi.string().min(3).max(250).optional(),
  cik: Joi.string().min(3).max(250).optional(),
  compositeFigi: Joi.string().min(3).max(250).optional(),
  currencyName: Joi.string().min(2).max(30).optional(),
  description: Joi.string().min(3).max(1000).optional(),
  listDate: Joi.string().min(3).max(250).optional(),
  homepageUrl: Joi.string().min(3).max(250).optional(),
  locale: Joi.string().optional(),
  market: Joi.string().min(2).max(250).optional(),
  marketCap: Joi.number().optional(),
  phoneNumber: Joi.string().min(2).max(250).optional(),
  primaryExchange: Joi.string().min(2).max(250).optional(),
  shareClassFigi: Joi.string().optional(),
  shareClassSharesOutstanding: Joi.number().optional(),
  sicCode: Joi.string().optional(),
  sicDescription: Joi.string().optional(),
  totalEmployees: Joi.number().optional(),
  weightedSharesOutstanding: Joi.number().optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const temp = { ...data };

  result.value = temp;
  return result;
};

module.exports = { validate };
