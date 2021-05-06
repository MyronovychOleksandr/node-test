const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  features: Joi.array().optional(),
  owner: Joi.object().optional(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  features: Joi.array().optional(),
  owner: Joi.object().optional(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCatStatus = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field ${message.replace(/"/g, "")} `,
      data: "Bad request",
    });
  }
  next();
};

module.exports.validateCreateCat = (req, res, next) => {
  return validate(schemaCreateCat, req.body, next);
};

module.exports.validateUpdateCat = (req, res, next) => {
  return validate(schemaUpdateCat, req.body, next);
};

module.exports.validateUpdateStatusCat = (req, res, next) => {
  return validate(schemaUpdateCatStatus, req.body, next);
};
