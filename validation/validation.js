const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  lastName: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  address: Joi.string().min(2).max(255).required(),
  city: Joi.string().min(2).max(255).required(),
  state: Joi.string().max(2).required(),
  zipCode: Joi.string().length(5).required(),
  phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
